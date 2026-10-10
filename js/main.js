/**
 * NXT SMART ENERGY SOLUTIONS - MAIN JAVASCRIPT
 * Interactive functionality: Navigation, IoT Sub-Meter Simulation,
 * Savings Calculator, Form Validation & Presentation Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMeterSimulator();
  initSavingsCalculator();
  initContactForm();
  initRechargeModal();
  initPitchModal();
  initBackToTop();
});

/* ==========================================================================
   1. NAVBAR & NAVIGATION CONTROLS
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  // Sticky header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightCurrentSection();
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('svg');
      if (isOpen) {
        mobileToggle.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>`;
      } else {
        mobileToggle.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>`;
      }
    });

    // Close mobile menu on link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>`;
      });
    });
  }

  // Smooth scroll & active section highlight
  function highlightCurrentSection() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. INTERACTIVE IOT SUB-METER SIMULATOR (DEMONSTRATION ONLY)
   ========================================================================== */
let meterState = {
  isAcOn: true,
  voltage: 231.4,
  current: 6.2,
  powerKw: 1.43,
  energyKwh: 48.65,
  balanceRupees: 284.50,
  tariffPerKwh: 9.00,
  relayConnected: true,
  timerInterval: null
};

function initMeterSimulator() {
  const toggleAcBtn = document.getElementById('btn-toggle-ac');
  const simRechargeBtn = document.getElementById('btn-sim-recharge');

  // TFT Display Elements
  const elBalance = document.getElementById('tft-balance-val');
  const elVoltage = document.getElementById('tft-voltage-val');
  const elCurrent = document.getElementById('tft-current-val');
  const elPower = document.getElementById('tft-power-val');
  const elEnergy = document.getElementById('tft-energy-val');
  const elRelayTag = document.getElementById('tft-relay-status');
  const elAcStateText = document.getElementById('sim-ac-status-text');

  if (!toggleAcBtn || !elBalance) return;

  function updateTftDisplay() {
    if (elBalance) elBalance.textContent = `₹${meterState.balanceRupees.toFixed(2)}`;
    if (elVoltage) elVoltage.textContent = meterState.voltage.toFixed(1);
    if (elCurrent) elCurrent.textContent = meterState.current.toFixed(2);
    if (elPower) elPower.textContent = meterState.powerKw.toFixed(2);
    if (elEnergy) elEnergy.textContent = meterState.energyKwh.toFixed(2);

    if (elRelayTag) {
      if (meterState.relayConnected) {
        elRelayTag.className = 'relay-status-tag';
        elRelayTag.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg> RELAY: ON (CLOSED)`;
      } else {
        elRelayTag.className = 'relay-status-tag cut';
        elRelayTag.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg> RELAY: CUT (OFF)`;
      }
    }

    if (elAcStateText) {
      if (!meterState.relayConnected) {
        elAcStateText.textContent = 'AC Cut (Low Balance)';
        elAcStateText.style.color = 'var(--crimson-red)';
      } else if (meterState.isAcOn) {
        elAcStateText.textContent = 'AC Running';
        elAcStateText.style.color = 'var(--emerald-green)';
      } else {
        elAcStateText.textContent = 'AC Switched Off';
        elAcStateText.style.color = 'var(--text-muted)';
      }
    }
  }

  // Simulation tick (every 1.5 seconds)
  meterState.timerInterval = setInterval(() => {
    if (meterState.relayConnected && meterState.isAcOn) {
      // Fluctuations typical of an inverter / window AC
      const noise = (Math.random() - 0.5) * 0.4;
      meterState.voltage = +(230 + (Math.random() - 0.5) * 4).toFixed(1);
      meterState.current = Math.max(5.4, +(6.1 + noise).toFixed(2));
      meterState.powerKw = +((meterState.voltage * meterState.current * 0.96) / 1000).toFixed(2);

      // Energy consumption in small increments
      const kwhIncrement = (meterState.powerKw * 1.5) / 3600;
      meterState.energyKwh = +(meterState.energyKwh + kwhIncrement);
      meterState.balanceRupees = +(meterState.balanceRupees - (kwhIncrement * meterState.tariffPerKwh));

      // Automatic Relay cut-off if balance exhausts
      if (meterState.balanceRupees <= 0) {
        meterState.balanceRupees = 0;
        meterState.relayConnected = false;
        meterState.isAcOn = false;
        meterState.current = 0.0;
        meterState.powerKw = 0.0;
        showToast('Prepaid balance exhausted! Smart Relay automatically cut power to prevent unpaid usage.');
      }
    } else {
      // Standby or OFF
      meterState.voltage = +(230 + (Math.random() - 0.5) * 2).toFixed(1);
      meterState.current = 0.0;
      meterState.powerKw = 0.0;
    }

    updateTftDisplay();
  }, 1500);

  // Toggle AC Power button
  toggleAcBtn.addEventListener('click', () => {
    if (!meterState.relayConnected) {
      showToast('Relay is cut due to zero balance. Please recharge prepaid units first!');
      openRechargeModal();
      return;
    }
    meterState.isAcOn = !meterState.isAcOn;
    if (meterState.isAcOn) {
      toggleAcBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
        </svg> Turn AC OFF`;
      showToast('AC turned ON. Sub-meter started tracking live consumption.');
    } else {
      toggleAcBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg> Turn AC ON`;
      showToast('AC turned OFF. Sub-meter in standby state.');
    }
    updateTftDisplay();
  });

  // Open Recharge dialog
  if (simRechargeBtn) {
    simRechargeBtn.addEventListener('click', openRechargeModal);
  }

  updateTftDisplay();
}

/* ==========================================================================
   3. PREPAID RECHARGE SIMULATOR MODAL
   ========================================================================== */
function initRechargeModal() {
  const modal = document.getElementById('recharge-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const presetChips = document.querySelectorAll('.preset-chip');
  const rechargeInput = document.getElementById('recharge-amount-input');
  const confirmBtn = document.getElementById('btn-confirm-recharge');

  if (!modal) return;

  window.openRechargeModal = function() {
    modal.classList.add('open');
    if (rechargeInput) rechargeInput.value = '500';
  };

  function closeModal() {
    modal.classList.remove('open');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Preset chips click
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const amount = chip.getAttribute('data-amount');
      if (rechargeInput) rechargeInput.value = amount;
    });
  });

  // Confirm recharge simulation
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const amt = parseFloat(rechargeInput.value);
      if (isNaN(amt) || amt <= 0) {
        showToast('Please enter a valid recharge amount in Rupees.');
        return;
      }

      meterState.balanceRupees += amt;
      meterState.relayConnected = true; // Restore relay
      meterState.isAcOn = true;

      const toggleAcBtn = document.getElementById('btn-toggle-ac');
      if (toggleAcBtn) {
        toggleAcBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
          </svg> Turn AC OFF`;
      }

      closeModal();
      showToast(`Success! Recharged ₹${amt.toFixed(2)} to Unit #AC-104 (Demonstration)`);
    });
  }
}

/* ==========================================================================
   4. INTERACTIVE SAVINGS & TARIFF CALCULATOR
   ========================================================================== */
function initSavingsCalculator() {
  const roomsSlider = document.getElementById('calc-rooms');
  const hoursSlider = document.getElementById('calc-hours');
  const tariffSlider = document.getElementById('calc-tariff');

  const roomsVal = document.getElementById('val-calc-rooms');
  const hoursVal = document.getElementById('val-calc-hours');
  const tariffVal = document.getElementById('val-calc-tariff');

  const resUnits = document.getElementById('res-total-units');
  const resBill = document.getElementById('res-total-bill');
  const resPerRoom = document.getElementById('res-per-room');
  const resSavings = document.getElementById('res-savings');

  if (!roomsSlider || !hoursSlider || !tariffSlider) return;

  function calculate() {
    const rooms = parseInt(roomsSlider.value, 10);
    const hours = parseInt(hoursSlider.value, 10);
    const tariff = parseFloat(tariffSlider.value);

    roomsVal.textContent = `${rooms} Rooms`;
    hoursVal.textContent = `${hours} Hrs/Day`;
    tariffVal.textContent = `₹${tariff.toFixed(1)} / kWh`;

    // Average 1.5-ton AC power draw ~ 1.4 kW
    const avgAcKw = 1.4;
    const daysInMonth = 30;

    // Monthly units (kWh) = rooms * hours * days * avgAcKw
    const totalUnits = Math.round(rooms * hours * daysInMonth * avgAcKw);
    const totalBill = Math.round(totalUnits * tariff);
    const perRoomFairCost = Math.round(totalBill / rooms);

    // Wastage eliminated: Typically 22% of AC runtime in shared hostels is left running in empty rooms
    // With individual prepaid accountability, tenants turn off ACs when not in room.
    const estimatedSavingsRupees = Math.round(totalBill * 0.22);

    resUnits.textContent = `${totalUnits.toLocaleString('en-IN')} kWh`;
    resBill.textContent = `₹${totalBill.toLocaleString('en-IN')}`;
    resPerRoom.textContent = `₹${perRoomFairCost.toLocaleString('en-IN')}`;
    resSavings.textContent = `~ ₹${estimatedSavingsRupees.toLocaleString('en-IN')}/mo`;
  }

  roomsSlider.addEventListener('input', calculate);
  hoursSlider.addEventListener('input', calculate);
  tariffSlider.addEventListener('input', calculate);

  calculate();
}

/* ==========================================================================
   5. CONTACT FORM VALIDATION & HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('startup-contact-form');
  const successBanner = document.getElementById('contact-success-banner');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const roleSelect = document.getElementById('contact-role');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('btn-submit-contact');

    let isValid = true;

    // Name Validation
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('invalid');
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      emailInput.classList.add('invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('invalid');
    }

    // Message Validation
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('invalid');
      isValid = false;
    } else {
      messageInput.classList.remove('invalid');
    }

    if (!isValid) {
      showToast('Please check the form fields and enter valid details.');
      return;
    }

    // Submission UI state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"></circle>
      </svg> Sending Inquiry...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg> Send Message`;

      if (successBanner) {
        successBanner.style.display = 'block';
        successBanner.innerHTML = `
          <strong>Thank you, ${nameInput.value.trim()}!</strong><br>
          Your inquiry regarding <em>NXT Smart Energy Solutions</em> has been received. Our team will contact you shortly.
        `;
      }

      showToast('Message submitted successfully!');
      form.reset();
    }, 1200);
  });
}

/* ==========================================================================
   6. WADHWANI FOUNDATION & INVESTOR PITCH MODAL
   ========================================================================== */
function initPitchModal() {
  const openPitchBtn = document.getElementById('btn-open-pitch-deck');
  const pitchModal = document.getElementById('pitch-modal');
  const closePitchBtn = document.getElementById('pitch-modal-close');

  if (!pitchModal) return;

  function openPitch() {
    pitchModal.classList.add('open');
  }

  function closePitch() {
    pitchModal.classList.remove('open');
  }

  if (openPitchBtn) openPitchBtn.addEventListener('click', openPitch);
  if (closePitchBtn) closePitchBtn.addEventListener('click', closePitch);
  pitchModal.addEventListener('click', (e) => {
    if (e.target === pitchModal) closePitch();
  });
}

/* ==========================================================================
   7. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. TOAST NOTIFICATION UTILITY
   ========================================================================== */
let toastTimeout = null;
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--electric-blue)" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
