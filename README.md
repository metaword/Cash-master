# Cash Master - Web Landing Page & Game Portal

This repository contains the complete, fully functioning landing and installation portal for **Cash Master**.

---

## 🚀 Quick Start / How to Run

You have two easy ways to run or view the website:

### Method 1: Instant Local Server (Recommended)
1. Double-click `start_server.bat`.
2. A local server will start and automatically open your browser at **`http://localhost:8080/`**.
3. All static files and API routes (`/down/get_apk`, `/down/get_url`) will be served locally.

### Method 2: Open Directly (Zero Installation)
Simply double-click `index.html` in your browser. All resource paths are relative, and downloads use smart fallback handlers that work seamlessly even via `file://`.

### Method 3: Node.js or Python (Optional)
- **Node.js**: Run `node server.js`
- **Python**: Run `python server.py`

---

## 🛠️ Summary of Fixes & Enhancements

1. **Repaired Missing & Corrupted Assets**:
   - Fixed `static/web/2.png` which was an empty 0-byte file (preventing the banner from loading). Downloaded and restored the complete high-resolution casino hero banner.
   - Downloaded and added missing `static/web/logo.webp` (required by Apple MobileConfig webclip profiles).
   - Downloaded and added missing `static/web/share1.png` (used for Open Graph & Twitter social preview cards).

2. **Fixed Broken Path Typo & Absolute Paths**:
   - Fixed `<link rel="stylesheet" href="/stat~ic/web/style.css">` typo.
   - Changed all `/static/web/...` absolute paths to clean relative paths `static/web/...`, allowing the site to function anywhere (local filesystem, subfolders, GitHub Pages, Vercel, Netlify, Apache, Nginx).

3. **Resilient Download & Device Detection**:
   - The site automatically detects Android, iOS (iPhone/iPad), and Desktop devices.
   - Added automatic direct URL fallback: if backend API endpoints (`/down/get_apk` or `/down/get_url`) are unavailable or return an error, the download **never fails** and seamlessly delivers the verified APK or opens the game portal.
   - **Android**: Triggers direct APK download (`CashMasterV1.apk`).
   - **iOS**: Displays the step-by-step Apple Lite installation guide and generates/downloads the `.mobileconfig` webclip profile.
   - **Desktop / Web**: Launches the instant H5 online game.

4. **Added Interactive Hotspots on Hero Banner**:
   - **"PLAY NOW" Button**: Clicking the large button launches the online H5 game instantly.
   - **Android / iOS / H5 Badges**: Clicking the respective badge on the banner triggers the specific platform download flow.

5. **Enhanced Mobile & In-App Browser Experience**:
   - Added detection for in-app browsers (Facebook, Instagram, TikTok, WeChat, etc.) to show the "Open in Safari / External Browser" prompt.
   - Added a smooth pulsating floating Download button at the bottom of the screen.
   - Added quick-close buttons (top "✕" and bottom action button) on the iOS installation guide.

6. **Affiliate & Ad Tracking Ready**:
   - Automatically parses `agent_id`, `channelId`, `pix_id`, `fbcid`, and `fbpid` from URL query parameters.
   - Dynamically updates tracking parameters and affiliate download channels.

---

## 📁 File Structure

```
Cash master/
├── index.html                   # Main responsive landing page
├── server.js                    # Node.js development server
├── server.py                    # Python development server
├── start_server.bat             # 1-click Windows batch launcher
├── start_server.ps1             # PowerShell zero-dependency HTTP server
├── down/
│   ├── get_apk                  # Static API mock for APK requests
│   └── get_url                  # Static API mock for H5 / iOS requests
└── static/
    └── web/
        ├── 2.png                # Main high-res landing banner
        ├── apple_little2.webp   # iOS Lite version installation guide
        ├── brower.png           # In-app browser prompt ("Open in Safari")
        ├── clipboard.min.js     # Clipboard utility library
        ├── down2.png            # Floating download button
        ├── jquery.js            # jQuery v1.12
        ├── logo.webp            # App icon & WebClip profile logo
        ├── MobileConfigContentJS.js # iOS Configuration Profile generator
        ├── pub_reset.css        # Clean CSS reset
        ├── share1.png           # Social preview share card
        └── style.css            # Casino theme, hotspots & animations
```
