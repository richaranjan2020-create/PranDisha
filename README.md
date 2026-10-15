# PranDisha — Emergency First-Aid Assistant
### *The right next step, when every second matters.*

---

> **⚠️ Safety Disclaimer:** PranDisha is a **demonstration prototype**, not a clinically validated medical product. It does not replace emergency services or professional medical care. **Always call 112 first.** Follow the emergency call handler's directions.

---

## What is PranDisha?

PranDisha is a proposed multilingual, voice-first emergency first-aid assistant designed to help ordinary people understand appropriate immediate actions while professional assistance is being arranged. It is aimed at Indian users, including people in semi-urban and rural areas who may have limited first-aid knowledge or difficulty understanding medical terminology.

This repository contains a working browser prototype built as a submission for the **VBYLD 2027 Hack for Social Cause** competition.

---

## Features Working in This Prototype

| Feature | Status |
|---|---|
| Bilingual interface (English / हिन्दी) | ✅ Working |
| Language toggle — updates all text | ✅ Working |
| 3 guided demonstration scenarios | ✅ Working |
| Step-by-step scenario navigation (Next / Prev / Restart) | ✅ Working |
| Step counter ("Step 2 of 5") | ✅ Working |
| Read Aloud via browser Speech Synthesis API | ✅ Where supported |
| Stop / Repeat speech controls | ✅ Working |
| Speech fallback message when audio unavailable | ✅ Working |
| Emergency Call 112 button (tel:112) | ✅ Working |
| Persistent prototype disclaimer banner | ✅ Working |
| About & Safety Information screen | ✅ Working |
| Voice scenario selection (optional) | ✅ Where browser supports SpeechRecognition |
| Mobile-first responsive layout | ✅ Working |
| Keyboard navigation & visible focus indicators | ✅ Working |
| No external APIs, databases, or accounts required | ✅ Confirmed |
| Works offline after initial font load | ✅ Yes (fonts from Google Fonts; rest is local) |

---

## How to Run Locally

No build tools or package installation required.

### Option 1 — Python (recommended, zero-install on most systems)

```bash
# Python 3
cd "PranDisha Prototype 1"
python -m http.server 8080
```
Then open: **http://localhost:8080**

### Option 2 — Node.js `http-server`

```bash
npm install -g http-server   # one-time
cd "PranDisha Prototype 1"
http-server -p 8080
```

### Option 3 — VS Code Live Server extension

Right-click `index.html` → **Open with Live Server**

### Option 4 — Direct file open (limited)

Open `index.html` directly in a browser. Most features work, but the Speech Synthesis API may behave differently on some browsers when run from a `file://` URI. A local server is preferred.

---

## Browser Requirements & Limitations

| Feature | Chrome / Edge | Firefox | Safari | Mobile Chrome |
|---|---|---|---|---|
| Core UI & scenarios | ✅ | ✅ | ✅ | ✅ |
| Speech Synthesis (Read Aloud) | ✅ | ✅ | ✅ | ✅ |
| Hindi voice (hi-IN) | ✅ (if installed) | ⚠️ Varies | ⚠️ Varies | ✅ (Android) |
| Voice scenario selection | ✅ | ❌ | ❌ | ✅ |
| tel:112 dialling | ✅ Mobile | ✅ Mobile | ✅ Mobile | ✅ |
| tel:112 on desktop | ℹ️ Opens dialler app if configured | ℹ️ Same | ℹ️ Same | N/A |

**Hindi voice:** Hindi speech synthesis quality depends on whether `hi-IN` voices are installed on the operating system. On Android devices, Hindi voices are usually present. On desktop, the app falls back to the best available English voice and shows a text fallback message.

---

## Competition Walkthrough (for demonstrating to a judge)

*Use this sequence to show all features in approximately 2 minutes.*

1. **Open the app** — The judge immediately sees the PranDisha name, tagline, safety notice, and the red Call 112 button.
2. **Language toggle** — Click **हिन्दी** in the top-right. All text switches to Hindi. Click **English** to switch back.
3. **Emergency call** — Point out the `Call 112 Now` button. Explain it links to `tel:112` and works on mobile.
4. **Select a scenario** — Click **Severe Bleeding**. The scenario screen opens with Step 1.
5. **Read Aloud** — Click the 🔊 Read Aloud button. The instruction is spoken.
6. **Step through** — Click **Next** twice. The step counter updates. Click **Previous** to go back.
7. **Hindi in scenario** — Toggle to हिन्दी. The scenario title and instruction text switch to Hindi.
8. **Finish scenario** — Click **Next** through to the end. The end screen appears with a Call 112 prompt.
9. **Return home** — Click **Back to Home**.
10. **About screen** — Click **About & Safety Information** to show safety boundaries, sources, and future roadmap.

---

## Safety Disclaimer

- This prototype is **not** a clinically validated medical product.
- It uses **predefined demonstration scripts**, not a live AI or medical engine.
- It does **not** diagnose medical conditions.
- It does **not** contact emergency services on your behalf.
- It does **not** collect, store, or transmit any personal or patient data.
- **Always call 112 first** and follow the emergency call handler's directions.

All scenario content must be reviewed by qualified Indian emergency-care professionals before any real-world deployment.

---

## Future Roadmap

- [ ] Expert review of all emergency protocols by Indian emergency-care professionals
- [ ] Support for additional Indian languages (Tamil, Telugu, Bengali, Marathi, Kannada, Gujarati, Punjabi)
- [ ] Enhanced voice recognition optimised for hands-free emergency use
- [ ] Progressive Web App (PWA) for offline-first use in low-connectivity areas
- [ ] Structured user testing with first responders, community health workers, and the public
- [ ] Accessibility improvements including screen-reader-optimised flows
- [ ] Clinical validation study before any public deployment
- [ ] Guidance for future integration with local health-system partners (conceptual, not live)

---

## Files in This Repository

```
PranDisha Prototype 1/
├── index.html                 # Main application
├── styles.css                 # All visual styling
├── app.js                     # Logic, language, scenarios, speech
├── README.md                  # This file
├── LICENSE                    # MIT Licence
├── .gitignore                 # Editor and OS exclusions
├── docs/
│   ├── architecture.md        # Frontend architecture description
│   └── safety-and-sources.md  # Safety policy, sources, limitations
└── tests/
    └── manual-test-cases.md   # Manual QA test cases
```

---

## Publishing to GitHub (steps for the competitor)

```bash
# 1. Create a new public repository on github.com (do not initialise with README)

# 2. In your terminal, inside the project folder:
git init
git add .
git commit -m "Initial PranDisha prototype — VBYLD 2027 Hack for Social Cause"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/prandisha.git
git push -u origin main

# 3. Enable GitHub Pages:
#    Repository Settings → Pages → Source: Deploy from branch → Branch: main → / (root)
#    The app will be live at: https://YOUR_USERNAME.github.io/prandisha/
```

> **Note:** Do not share any API keys, credentials, or personal data in the public repository.

---

## Licence

Original project code: MIT Licence. See [LICENSE](LICENSE).

The predefined scenario content is provided for demonstration purposes only and is not medically validated.

Sources consulted (no endorsement claimed):
- Government of India ERSS — https://112.gov.in/
- American Red Cross First Aid — https://www.redcross.org/take-a-class/first-aid
- American Red Cross CPR — https://www.redcross.org/take-a-class/cpr

---

*PranDisha — The right next step, when every second matters.*
