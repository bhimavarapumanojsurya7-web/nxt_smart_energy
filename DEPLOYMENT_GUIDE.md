# Deployment Guide: Publishing NXT Smart Energy Solutions Online

> 💡 **Why did a previous link not open on your other device?**  
> If you tried opening `localhost:8080` on your phone, or if a temporary tunnel session closed, other devices cannot reach it.  
> To make your website open on **any phone, tablet, or laptop worldwide 24/7**, follow **Option 1 (Netlify Drop)** below — it takes only 60 seconds with no coding needed!

---

## Pre-Deployment Checklist
- **Official Phone & WhatsApp**: Configured as `+91 63058 89935` (Active).
- **Email Placeholder**: Search for `contact@nxtsmartenergy.com` and customize with your preferred mailbox if needed.

---

## Option 1: Netlify Drop (Recommended — 60 Seconds, No Code Needed)

This is the fastest method to get a live HTTPS public link.

1. Open your browser and go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. If you don't have an account, sign up for free (or log in with Google / GitHub).
3. Drag and drop your `nxt_smart` folder (the folder containing `index.html`, `css/`, `js/`, and `assets/`) into the upload area on Netlify.
4. Netlify will immediately upload and host your site.
5. In 10–20 seconds, Netlify will generate a live public link, like:
   `https://nxt-smart-energy.netlify.app`
6. **(Optional)** Go to **Site Settings > Change Site Name** to give it a custom name like `nxt-smart-energy.netlify.app`.
7. **Copy this public URL** and paste it directly into your Wadhwani Foundation submission portal!

---

## Option 2: GitHub Pages (Permanent & Professional)

If you have a GitHub account:

1. Create a new repository on [GitHub](https://github.com/new) named `nxt-smart-energy` (set it to **Public**).
2. Open your terminal in this project folder (`c:\Users\B MANOJ SURYA\Desktop\nxt_smart`) and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for NXT Smart Energy Solutions website"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/nxt-smart-energy.git
   git push -u origin main
   ```
3. On GitHub, go to your repository's **Settings** tab.
4. Scroll to **Pages** in the left sidebar.
5. Under **Branch**, select `main` and root `/`, then click **Save**.
6. Within 1–2 minutes, your live site will be accessible at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/nxt-smart-energy/`
7. Copy this link and submit it to the Wadhwani platform!

---

## Option 3: Render (Free Static Site with Global CDN)

Render allows you to host static sites for free. Unlike Render backends, **Static Sites on Render never sleep** and remain live 24/7.

### Step 1: Upload Project to GitHub (No Git installation needed)
1. Go to [https://github.com](https://github.com) and log in.
2. Click **+** (top right) > **New repository**.
3. Name it `nxt-smart-energy`, keep it **Public**, and click **Create repository**.
4. Click the link that says **"uploading an existing file"**.
5. Drag and drop your `nxt_smart` files (`index.html`, `css/`, `js/`, `assets/`) and click **Commit changes**.

### Step 2: Connect and Deploy on Render
1. Go to [https://render.com](https://render.com) and click **Sign In with GitHub**.
2. Click **+ New** > **Static Site**.
3. Under *Connect a repository*, pick `nxt-smart-energy`.
4. Configure settings:
   - **Name**: `nxt-smart-energy`
   - **Branch**: `main`
   - **Build Command**: *(Leave empty)*
   - **Publish Directory**: `.`
5. Click **Create Static Site**.
6. In ~30 seconds, your site is live at:
   `https://nxt-smart-energy.onrender.com`

---

## Option 4: Vercel (1-Click CLI Deployment)

1. Open terminal in `nxt_smart` folder.
2. Run `npx vercel` and follow the prompts.
3. Live URL: `https://nxt-smart-energy.vercel.app`

---

## How to Test Locally on Your Computer

If you want to preview the site locally before publishing:
1. Double-click [`index.html`](./index.html) in your file explorer to open it in Chrome, Edge, or Firefox.
2. Or run a local Python server:
   ```bash
   python -m http.server 8080
   ```
   and visit `http://localhost:8080` in your web browser.

---

## Key URLs to Submit to Wadhwani Foundation:
- **Live Website URL**: `https://<your-site-name>.netlify.app` or `https://<username>.github.io/nxt-smart-energy/`
- **Product Name**: NXT Smart Energy Solutions
- **Project Title**: IoT-Based Prepaid Smart AC Energy Sub-Meter
- **Indicative Price**: ₹5,000 / unit (Estimated)
