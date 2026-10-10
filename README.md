# NXT Smart Energy Solutions ⚡
 
> **Smart Energy. Fair Billing. Better Control.**  
> IoT-Based Prepaid Smart AC Energy Sub-Meter for Hostels, PGs, Apartments, and Offices.  
> 
> 📱 **How to open on any device / phone**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) to publish on Netlify for free in 60 seconds (works worldwide 24/7).

---

## 🎯 Executive Overview

**NXT Smart Energy Solutions** is an early-stage startup developing an **IoT-Based Prepaid Smart AC Energy Sub-Meter**.

In shared living accommodations like hostels, PGs, and rental apartments, air conditioners account for the overwhelming majority of summer electricity consumption. Because most buildings use only one main utility meter, calculating individual room usage is virtually impossible. This results in unfair flat-rate splitting, bitter disputes between tenants and management, and widespread electricity wastage.

**Our solution** is a room-level sub-meter wired into the dedicated AC circuit. It measures real-time electricity consumption, computes exact costs, deducts units from a prepaid balance, and features an on-device color TFT display and cloud dashboard.

---

## 🚀 Website Highlights & Features

This website is designed for presentation to **customers, investors, and the Wadhwani Foundation Entrepreneurship Program**:

1. **Section 1 — Home (Hero)**:
   - Headline: *"Make AC Electricity Billing Simple and Fair."*
   - Subheading: *"Smart IoT-based AC energy monitoring with prepaid billing and real-time cost tracking."*
   - Direct call-to-actions: *"Explore Our Solution"* and *"Contact Us"*.
   - **Interactive Live Sub-Meter Simulation**: Fully simulated on-device TFT screen demonstrating live voltage, current, active power, units consumed, and prepaid balance deduction. Features an interactive **"Turn AC OFF/ON"** toggle and a **"Recharge Balance"** modal flow.
   - Transparent label: *Demonstration Data: Interactive simulation for demonstration purposes only. Not connected to live hardware.*

2. **Section 2 — The Problem**:
   - Details the shared meter dilemma in hostels & PGs.
   - Explains billing confusion, tenant-warden disputes, and power wastage.
   - Side-by-side comparison matrix: *Conventional Shared Meter vs. NXT Smart Sub-Meter*.

3. **Section 3 — Our Solution**:
   - Comprehensive overview of the IoT Sub-meter system.
   - High-tech SVG architecture diagram showing the connection from AC circuit to sensors, ESP32, TFT display, and cloud.

4. **Section 4 — Key Features**:
   - Real-time AC energy monitoring.
   - Individual AC usage tracking.
   - Automatic electricity cost calculation.
   - Prepaid billing system.
   - TFT display for readings.
   - IoT-based online monitoring.
   - Remote AC control where safely and technically supported.

5. **Section 5 — How It Works**:
   - Step 1: Connect the meter to the AC electrical circuit.
   - Step 2: Measure electricity consumption using the energy sensor.
   - Step 3: Process readings using the ESP32 controller.
   - Step 4: Display energy usage and estimated cost.
   - Step 5: Let the owner monitor usage through the IoT interface and manage prepaid usage.

6. **Section 6 — Technology Used**:
   - **ESP32 Microcontroller**: 240MHz dual-core processing, 2.4 GHz Wi-Fi + BLE.
   - **PZEM-004T Module**: AC energy measurement (80-260V, 0-100A).
   - **Color TFT Display**: On-device room monitoring.
   - **Current Sensor & Relay**: 30A switching relay for safe automatic cut-off.
   - **IoT Cloud Interface**: Web & mobile dashboard for landlords.

7. **Section 7 — Who Can Use It?**:
   - Hostel owners
   - PG accommodation owners
   - Students and tenants
   - Rental apartments
   - Small offices

8. **Section 8 — Key Benefits**:
   - Transparent electricity billing
   - Easier tracking of individual AC consumption
   - Reduces unnecessary electricity usage (estimated 20-25% waste reduction)
   - Fewer billing disputes
   - Affordable and practical energy management

9. **Interactive Savings Calculator**:
   - Allows hostel/PG owners to configure room count, daily AC hours, and utility tariff to calculate estimated monthly bill and wasted power eliminated.

10. **Section 9 — Pricing**:
    - Indicative product price: **₹5,000 per unit**.
    - Explicitly labeled as an *estimated price that may change based on production volume and components*.
    - Zero fake reviews, partnerships, or certification claims.

11. **Section 10 — About Us**:
    - Mission: *“NXT Smart Energy Solutions aims to make electricity monitoring smarter, simpler, and more transparent through affordable IoT technology.”*

12. **Section 11 — Contact Us**:
    - Complete inquiry form with client-side validation.
    - Official contact phone & WhatsApp: **+91 63058 89935**.
    - Official email placeholder: `contact@nxtsmartenergy.com`.

13. **Section 12 — Footer**:
    - Full navigation links, copyright, and tagline: *“Smart Energy. Fair Billing. Better Control.”*

14. **Investor & Mentor Briefing Modal**:
    - Quick-access 60-second summary modal for pitch sessions.

---

## 📁 Project Structure

```
nxt_smart/
├── index.html              # Main single-page application (All 12 sections + modals)
├── css/
│   └── style.css           # Modern dark-navy, electric blue design system
├── js/
│   └── main.js             # Interactivity, simulation, calculator, validation
├── assets/                 # Brand and media assets
├── DEPLOYMENT_GUIDE.md     # Step-by-step instructions to get a public URL
└── README.md               # Project documentation
```

---

## 💻 How to Run Locally

You can preview the website immediately on your computer:

```bash
# Option 1: Using Python
python -m http.server 8080

# Then open in your browser:
http://localhost:8080
```

Alternatively, open [`index.html`](./index.html) directly in any modern browser (Google Chrome, Microsoft Edge, Firefox, Safari).

---

## 🌐 How to Publish Online for Wadhwani Foundation

See [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for 3 fast ways to publish:
- **Netlify Drop** (60 seconds, drag-and-drop, free HTTPS URL).
- **GitHub Pages** (`https://<username>.github.io/nxt-smart-energy/`).
- **Vercel** (1-click deployment).
