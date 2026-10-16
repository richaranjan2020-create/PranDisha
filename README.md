# PranDisha (प्राणदिशा) — v7.0 Clinical Bento Edition

> **The right next step, when every second matters.**  
> **जब हर सेकंड कीमती हो, सही अगला कदम।**

**PranDisha** is an emergency first-aid guidance Progressive Web Application built for the **Viksit Bharat Young Leaders Dialogue (VBYLD) 2027 — Hack for Social Cause**:
- **Primary Theme:** Healthcare & Wellbeing
- **UN Sustainable Development Goals:** Primary **SDG 3** (Good Health and Well-Being — Targets 3.6 & 3.d) · Supporting **SDG 10** (Reduced Inequalities — linguistic, literacy, and rural/semi-urban access)
- **Design Standard:** Top-1% Clinical Daylight Bento System inspired by modern digital healthcare design systems (Apple Health, Ada Health).

---

## ⚠️ Prototype & Clinical Safety Notice

**PranDisha is an early-stage demonstration prototype containing provisional first-aid guidance.**
- It is **not** a certified medical device and has **not** yet undergone clinical trials or formal certification by Indian statutory medical bodies.
- It **never** replaces national emergency services (**ERSS 112**) and **never** dials automatically without user confirmation.
- Users are instructed on every screen to **Call 112 first** and prioritize the emergency call handler's real-time instructions over any prototype guidance.
- **Zero Generative AI at Runtime:** In acute medical emergencies, Large Language Models (LLMs) present unacceptable risks of hallucination, latency, and unpredictable output. PranDisha uses **100% deterministic, rule-based clinical workflows** with verified public first-aid sources.

---

## 1. Problem Statement & Evidence Context

In road trauma and sudden medical emergencies, bystander response in the first 3–10 minutes ("The Platinum Minutes") dictates survival. In India, ordinary citizens often hesitate or freeze due to panic, lack of practical training, fear of legal entanglement, or complex medical jargon.

Public data highlights the gravity of this challenge:
1. **National Road Trauma Burden (Government of India / MoRTH 2024–2026 reports):** India records approximately **5 lakh road crashes** and **~1.8 lakh fatalities annually**, with roughly **66% of victims aged 18–45 years**. Rapid bystander actions—calling 112, scene safety, direct bleeding compression, and spinal immobilization—are decisive before emergency medical technicians arrive.
2. **First-Aid Literacy Deficit (Aligarh District, UP Study — [PMC7380813](https://pmc.ncbi.nlm.nih.gov/articles/PMC7380813/), $n = 400$):** A structured study among secondary school students showed only **20% possessed adequate baseline first-aid knowledge** prior to formal instruction. *(Cited as a local illustrative indicator).*

**PranDisha’s Solution:** A luminous, high-trust, voice-first guidance tool delivering **one calm, imperative action at a time** in English or Hindi—paired with real-time audio pacing, clinical micro-visualizations, and haptic feedback—while keeping **Call 112** persistently accessible.

---

## 2. Core Innovations in v7.0 (Clinical Bento Edition)

### 🏥 1. Luminous Clinical Daylight & Frosted Bento Architecture
- **Aesthetic Direction:** Replaces dark, cyberpunk terminal tropes with a luminous, calming medical interface (`--bg-canvas: #F3F6FA`, frosted glass surfaces with `backdrop-filter: blur(20px)`, crisp slate typography `--ink: #0F172A`, and medical teal `--teal: #0D9488` with emergency coral `--coral: #E11D48`).
- **Human Clinical Protocol Labels:** Clear triage tags on all cards (`Urgent · Bleeding Control`, `Critical · CPR & Airway`, `Thermal · Cool 20 Min`, `Neurological · Time Seizure`, `Trauma · Spine Safety`, etc.).

### 🧊 2. Three.js Clearcoat Porcelain Medical Sculpture
- A dedicated, non-intrusive 3D viewport mounted strictly inside `.hero-3d-stage` (hero section), ensuring it never bleeds behind scrolling cards.
- Rendered using **Three.js `MeshPhysicalMaterial`** with real-time roughness, transmission, clearcoat specular highlights, and soft studio lighting.
- Features a floating porcelain medical cross with orbiting satellite capsules and a smooth torus ring that responds gently to mouse movement and device gyroscope orientation.

### 📊 3. Interactive Clinical Micro-Widgets on All 10 Scenario Cards
Each scenario card in the Bento grid features a live, custom CSS/SVG micro-widget representing clinical dynamics:
1. **Severe Bleeding:** Compression Pressure Gauge with animated pressure bar.
2. **Unresponsive / Cardiac:** 110 BPM Live Pulse Ring with rhythmic cardiac expansion.
3. **Adult Choking:** 5-and-5 Alternating Rhythm Indicator (5 back blows + 5 abdominal thrusts).
4. **Burns & Scalds:** 20-Minute Thermal Cooling Arc.
5. **Seizure Timing:** High-precision real-time stopwatch ring.
6. **Road Accident:** Tri-Zone Safety Perimeter (Hazard, Buffer, Patient).
7. **Possible Stroke:** FAST 4-Grid Diagnostic Matrix (Face, Arms, Speech, Time).
8. **Chest Pain / Heart Attack:** Real-time animated ECG cardiac rhythm trace.
9. **Severe Allergic Reaction:** EpiPen 90° Intramuscular Injection Angle indicator.
10. **Poisoning / Chemical Exposure:** Toxin Risk Meter with chemical neutralization warnings.

### ⚡ 4. Adrenaline & Hinglish Phonetic Fuzzy Matcher
- Robust speech-to-intent engine capable of matching heavily panicked, fragmented speech and colloquial Hinglish (e.g., *"khoon beh raha hai"*, *"saans nahi le raha"*, *"chakkar aa gaya"*, *"aag lag gayi"*, *"gadi takra gayi"*).
- Displays a high-contrast intent confirmation banner on the guidance screen with an instant 1-tap `[Choose another]` override.

### ⏱️ 5. Web Audio API & Haptic Emergency Micro-Tools
- **110 BPM CPR Metronome:** Synthesized in-browser using `AudioContext` and `OscillatorNode` (no external MP3 downloads). Delivers rhythmic acoustic beats paired with device vibration (`navigator.vibrate([40])`) and an ambient cardiac card glow.
- **10-Second Breathing Check:** Countdown timer with dual-frequency completion chime.
- **20-Minute Burn Cooling Countdown:** Interval timer with Start/Pause/Reset.
- **Persistent Seizure Duration Stopwatch:** Continues ticking in the top navigation bar (`#seizure-timer-pill`) across all guidance steps, automatically escalating to emergency coral with an alert chime at the critical 5-minute threshold (`05:00`).

### 🛡️ 6. Offline & Intent Sandbox Inspector
- A dedicated diagnostic panel located in the footer (`[🛡️ Judge Sandbox Mode]`).
- Displays live intent scoring tokens, regex pattern evaluations, PWA service worker status, and a one-click simulated offline disconnect test to prove 100% local execution.

### 📋 7. Interactive Clinical Traceability Matrix
- Located in **About & Safety** (`#screen-about`).
- A sortable, searchable matrix mapping each of the 10 scenarios directly to clinical references: **ERSS 112 India**, **American Red Cross**, **UK NHS**, and **St John Ambulance**.

### 🚀 8. Production Node.js Server & Static Resilience
- Includes `server.js` using Express with HTTP/1.1 fallback, static cache headers, and simulated telemetry endpoints (`/api/health`, `/api/socket/handshake`).
- Also functions as a zero-dependency static site deployable directly to **GitHub Pages** (with `.nojekyll` preconfigured).

---

## 3. Technology Stack & Architecture

| Layer | Technologies Used | Architecture Rationale |
| :--- | :--- | :--- |
| **Frontend UI Shell** | Semantic HTML5, CSS3 Custom Properties, Modern CSS Grid & Flexbox | Zero build pipeline; instant browser execution; 100% responsive across mobile, tablet, and desktop. |
| **3D Graphics Engine** | Three.js (r128), WebGL, MeshPhysicalMaterial | Pure client-side hardware-accelerated 3D sculpture; self-contained inside `.hero-3d-stage`. |
| **Audio & Speech Engine** | Web Speech API (`SpeechRecognition`, `speechSynthesis`), Web Audio API (`AudioContext`, `OscillatorNode`) | Zero external audio dependencies; works completely offline once cached; native accessibility. |
| **State & Navigation** | Pure Vanilla JavaScript ES6+ (`app.js`, `scenarios.js`) | Single-page state machine; zero framework overhead; deterministic execution. |
| **PWA & Offline Storage** | Service Worker (`sw.js`), Web App Manifest (`manifest.json`), `.nojekyll` | Network-first with cache fallback; installable as a standalone mobile application. |
| **Backend & Telemetry** | Node.js, Express (with native `http` fallback) | Clean static file server with cache control, security headers, and health telemetry. |

---

## 4. 2-Minute Judge Walkthrough Script

Open the application at `http://localhost:8080` (or your GitHub Pages URL) and demonstrate these highlights in 120 seconds:

1. **Clinical Daylight Aesthetic & Instant Bilingual Switch (0:00 – 0:25)**
   - Highlight the clean, medical-grade daylight palette, persistent **Call 112** coral button, and the clearcoat 3D medical sculpture in the hero section.
   - Click **हिंदी** in the header. Show how all UI labels, emergency chips, and scenario cards instantly switch languages without reloading.
2. **Adrenaline & Hinglish Intent Matching (0:25 – 0:50)**
   - In the Voice Console, click the 1-tap chip **“Garm paani se jal gaya”** (or speak into the microphone).
   - Point out the **Intent Match Banner** (`Matched “Garm paani se jal gaya” → Burns & Scalds`) with its 1-tap `[Choose another]` override and clinical scope notice.
   - Advance to Step 3 of Burns to showcase the **20-Minute Cooling Timer**.
3. **110 BPM CPR Metronome with Visual & Haptic Feedback (0:50 – 1:15)**
   - Return to the scenario grid and open **Unresponsive / Cardiac Arrest**.
   - Navigate to Step 4 and click **Start 110 BPM Beat**.
   - Point out the Web Audio metronome clicks, synchronized `1 · 2 · 3 · 4` beat dots, and subtle ambient card pulse (and vibration on supported mobile devices).
4. **Persistent Seizure Stopwatch & Hands-Free Navigation (1:15 – 1:40)**
   - Open **Seizure** and start the timer on Step 1.
   - Advance through Steps 2 and 3: show that `#seizure-timer-pill` in the top bar keeps ticking across the scenario and warns if duration exceeds 5 minutes.
   - Toggle **Hands-free commands: ON** and say *"Next"* or *"आगे"* to advance steps hands-free.
5. **Judge Sandbox & Clinical Traceability Matrix (1:40 – 2:00)**
   - Open **Judge Sandbox Mode** from the footer to show live regex matching tokens and offline PWA cache verification.
   - Navigate to **About & Safety** to demonstrate the **Clinical Traceability Matrix** mapping protocols to international and national guidelines.

---

## 5. Local Setup & Execution

PranDisha requires **no compilation, no bundler, and zero API keys**.

### Option A: Using Node.js (Recommended)
```bash
# Start the production Express / Node server on port 8080
node server.js
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

### Option B: Using Python
```bash
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080).

### Option C: Direct Browser Opening
Simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Safari, or Firefox.

---

## 6. Detailed Step-by-Step Guide to Publish on GitHub & GitHub Pages

PranDisha is preconfigured for 1-click deployment on **GitHub Pages**. All asset references are relative (`./`), and a `.nojekyll` file is included in the root directory.

### Method 1: Using the GitHub Web Interface (No Git installation needed)

1. **Sign in to GitHub:** Go to [github.com](https://github.com) and log in to your account.
2. **Create a New Repository:**
   - Click the **`+`** icon in the top-right corner and select **New repository**.
   - **Repository name:** `prandisha` (or `prandisha-prototype`).
   - **Description:** `Bilingual Voice-First Emergency First-Aid Assistant for VBYLD 2027`.
   - Set visibility to **Public**.
   - Leave "Initialize this repository with a README" **unchecked** (we already have a complete README).
   - Click **Create repository**.
3. **Upload the Project Files:**
   - On the new repository page, click the link that says **"uploading an existing file"**.
   - Drag and drop **all files and folders** from your `PranDisha Prototype 1` folder:
     - `index.html`
     - `styles.css`
     - `app.js`
     - `scenarios.js`
     - `server.js`
     - `sw.js`
     - `manifest.json`
     - `package.json`
     - `.nojekyll`
     - `.gitignore`
     - `README.md`
     - `LICENSE`
     - The `assets/` folder
     - The `docs/` folder
     - The `tests/` folder
   - Enter a commit message: `Release PranDisha v7.0 Clinical Bento Edition`.
   - Click **Commit changes**.
4. **Enable GitHub Pages:**
   - In your GitHub repository, click on the **Settings** tab.
   - In the left sidebar, click **Pages** (under the "Code and automation" section).
   - Under **Build and deployment**:
     - **Source:** Select `Deploy from a branch`.
     - **Branch:** Select `main` (or `master`), folder `/ (root)`.
     - Click **Save**.
5. **View Your Live Site:**
   - Within 1–2 minutes, GitHub Pages will deploy your site.
   - Your live URL will be displayed at the top of the Pages settings page:
     `https://<your-username>.github.io/prandisha/`
   - Test speech recognition, audio metronome, and offline caching directly from the live URL on your phone or computer.

---

### Method 2: Using GitHub Desktop (Graphical Tool)

1. Download and install [GitHub Desktop](https://desktop.github.com/).
2. Open GitHub Desktop and log in.
3. Click **File** → **Add Local Repository...** (or press `Ctrl+O`).
4. Select `c:\Users\hkroy\Desktop\PranDisha Prototype 1`.
5. If prompted that the directory is not a Git repository, click **"create a repository"** and choose:
   - Name: `prandisha`
   - Git Ignore: `Node`
   - License: `MIT`
6. Click **Publish repository** to GitHub (ensure "Keep this code private" is unchecked so it can be viewed by judges).
7. Go to the repository on [github.com](https://github.com), navigate to **Settings** → **Pages**, select branch `main` and root `/`, then save.

---

### Method 3: Using Git Command Line (If Git is installed)

```bash
# 1. Initialize git in the workspace
git init

# 2. Add all project files
git add .

# 3. Commit the files
git commit -m "feat: release PranDisha v7.0 Clinical Bento Edition for VBYLD 2027"

# 4. Set the main branch
git branch -M main

# 5. Connect your remote repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/prandisha.git

# 6. Push to GitHub
git push -u origin main
```

After pushing, enable GitHub Pages via **Settings → Pages → Branch: main → Save**.

---

## 7. Project Directory Structure

```text
.
├── index.html                  # Semantic single-page shell (Bento grid, 3D stage, guidance, about)
├── styles.css                  # Clinical Daylight tokens (--bg-canvas, --teal, --coral), bento layout & micro-widgets
├── scenarios.js                # 10 deterministic bilingual scenarios, scope boundaries, and regex matchers
├── app.js                      # Three.js 3D sculpture, speech engine, Web Audio timers, haptic metronome
├── server.js                   # Node.js Express static server with telemetry and HTTP fallback
├── sw.js                       # Service Worker for offline PWA caching
├── manifest.json               # Web App Manifest for mobile PWA installation
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
├── .gitignore                  # Ignores temp files, logs, and node_modules
├── package.json                # Project metadata, scripts (start, check), and Express dependency
├── LICENSE                     # MIT License
├── README.md                   # Complete system overview, architecture, and deployment guide
├── assets/
│   └── hero-bystander.png      # Editorial bystander illustration (with SVG fallback)
├── docs/
│   ├── architecture.md         # Detailed technical architecture, audio pipeline, and state machine
│   └── safety-and-sources.md   # Clinical sources, scope exclusions, and review flags
└── tests/
    ├── qa_check.js             # Automated 18-point syntax & structural QA test suite
    ├── smoke.html              # In-browser automated regression test suite
    ├── shot.html               # Visual regression verification page
    └── manual-test-cases.md    # Structured test scenarios for competition judges
```

---

## 8. Automated QA & Verification

To verify syntax and code integrity across all JavaScript files:

```bash
npm run check
```

Or run the QA suite:
```bash
node tests/qa_check.js
```

Expected output:
```text
✓ All 18 QA checks passed! Ready for VBYLD 2027 Judge Demo.
```

---

## 9. License & Clinical Attribution

- **Code License:** MIT License — see [`LICENSE`](LICENSE).
- **Clinical Content:** Derived from public conservative first-aid guidance published by **ERSS 112 India**, the **American Red Cross**, the **UK NHS**, and **St John Ambulance**. None of these organizations endorse or sponsor this prototype.
