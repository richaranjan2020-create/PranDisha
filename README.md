# PranDisha (प्राणदिशा)

**The right next step, when every second matters.**

*A bilingual, voice-first emergency first-aid guidance prototype for India.*

PranDisha is an early-stage demonstration project exploring how a simple web interface, predefined emergency scenarios, and browser speech features could help a bystander access clear first-aid guidance while professional help is being arranged.

> **Project status:** Prototype / demonstration only. The scenario instructions are provisional and have not been reviewed as a complete set by qualified emergency-care professionals. Do not rely on this application as medical advice or as a substitute for emergency services.

## Safety Comes First

- In a serious emergency in India, call **112** promptly and follow the emergency call handler's directions.
- PranDisha does not call an ambulance, dispatch responders, diagnose a condition, or contact emergency services on the user's behalf.
- Do not delay contacting emergency services to use the website or finish a voice interaction.
- Instructions shown by this prototype may be incomplete or unsuitable for a particular person or situation. If a situation is urgent or outside the supported demonstration, contact emergency services and follow the call handler.
- The prototype has not undergone clinical trials, formal clinical validation, or certification as a medical device.

## What the Prototype Contains

The current codebase contains ten predefined demonstration scenarios:

1. Severe bleeding
2. Unresponsive person / suspected cardiac arrest
3. Adult choking
4. Burns and scalds
5. Seizure
6. Road accident / serious injury
7. Possible stroke
8. Chest pain / suspected heart attack
9. Severe allergic reaction
10. Poisoning / chemical exposure

The interface and scenario data include English and Hindi text. The code also includes browser speech features and rule-based matching for a limited set of typed or spoken descriptions.

Supported speech features vary by browser, device, available voice, microphone permission, and network connection. Keep the written instructions visible and use manual scenario selection if speech features are unavailable or fail.

Other code-level demonstration features include scenario step navigation, audio playback controls, and selected timers or audio cues. These features should be tested in the target browser before being described as working in a live presentation.

### What This Is Not

- It is not a generative-AI medical decision engine. Scenario matching is based on predefined rules rather than an LLM making clinical decisions at runtime.
- It is not integrated with the 112/108 dispatch systems.
- It does not provide live ambulance tracking, automatic dispatch, or verified location routing.
- It is not a clinically approved first-aid training course or a replacement for professional assessment.
- An offline-capable service worker does not guarantee that every feature works offline. Speech recognition may require connectivity in some browsers, and third-party assets may load from external services.

## Why This Problem Matters

Government of India figures for 2024 report **487,707 road accidents, 177,175 road fatalities, and 471,441 reported injuries**.

**Source:** Government of India, Lok Sabha Unstarred Question 4505 (road-accident data for 2024).

[View the official road-accident data](https://sansad.in/getFile/loksabhaquestions/annex/187/AU4505_smjOzM.pdf?source=pqals)

A 2020 paper on post-crash emergency care in Aligarh, Uttar Pradesh, studied **665 road-crash patients**. It reported that:

- 67.36% identified a layperson as the first responder.
- 10.99% received first help at the crash scene within ten minutes.
- 23.30% were transported by ambulance.

**Study:** Urfi et al., *Post-crash emergency care: Availability and utilization pattern of existing facilities in Aligarh, Uttar Pradesh* (2020).

[Read the peer-reviewed study](https://pmc.ncbi.nlm.nih.gov/articles/PMC7380813/)

**Important context:** The Aligarh results describe one local sample of patients who reached the study setting. They are not national estimates and do not establish how many deaths could have been prevented by first aid or by an AI assistant.

## Technology

- **Frontend:** HTML5, CSS3, vanilla JavaScript
- **Scenario content and matching:** `scenarios.js` and rule-based matching in `app.js`
- **Speech:** Browser Web Speech APIs where supported
- **Audio tools:** Browser Web Audio API where implemented and supported
- **Progressive web app support:** `manifest.json` and `sw.js`
- **Local server:** Node.js with Express, with an HTTP fallback in `server.js`

The repository includes a small server endpoint for demonstration and health-check purposes. It is not an ambulance, dispatch, secure socket, or emergency-response integration.

## Run Locally

### Requirements

- Node.js 18 or newer
- A current browser such as Chrome or Microsoft Edge for the broadest opportunity to test browser speech functionality

### Installation

1. Download or clone this repository.
2. Open a terminal in the project directory.
3. Install the dependency:

   ```bash
   npm install
   ```

4. Start the local server:

   ```bash
   npm start
   ```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

To run the JavaScript syntax checks defined in `package.json`, use:

```bash
npm run check
```

This command checks JavaScript syntax. It is not a substitute for manually testing the user interface, browser speech features, scenario instructions, or safety behaviour.

## Repository Structure

```text
.
├── index.html       # Application interface
├── styles.css       # Layout, typography, and visual styling
├── app.js           # Interface behaviour, speech features, and scenario navigation
├── scenarios.js     # Predefined bilingual scenario content and matching rules
├── server.js        # Local static server and demonstration endpoints
├── sw.js            # Service worker and cache behaviour
├── manifest.json    # Web app manifest
├── package.json     # Project metadata, start command, and syntax-check command
├── .nojekyll        # GitHub Pages configuration helper
├── .gitignore       # Ignored local/generated files
├── README.md        # Project overview and run instructions
└── LICENSE          # Project code licence
```

This tree describes the main files in the project. If files are renamed or new directories are added, update this section to match the repository.

## Deployment Notes

The frontend is designed as a static web application, and `.nojekyll` is included in the repository. GitHub Pages can host static files, but it does **not** run `server.js` or its demonstration API endpoints.

Test the deployed site separately and do not present local-only endpoints as working production services.

Browser microphone and speech behaviour differs across browsers. Test language switching, typed matching, speech recognition, audio playback, navigation, timers, and fallbacks on the exact device and browser used for a demonstration.

## Before Any Public or Real-World Use

1. Have each scenario reviewed by qualified emergency-care professionals.
2. Have Hindi wording checked by a qualified medical-language reviewer.
3. Test with simulated scenarios and document both successful and failed cases.
4. Confirm that first-aid guidance does not delay emergency-service contact or create unsafe actions.
5. Review privacy, accessibility, browser support, and deployment behaviour.
6. Maintain a source-to-instruction record for each clinical instruction and its review status.

The present repository is a demonstration prototype. It should not be described as clinically verified until a documented review has actually occurred.

## Development and AI-Use Disclosure

AI-assisted tools were used during parts of the project's code, copy, or design iteration. The project owner should disclose the specific tools and their contribution accurately wherever required by the competition.

This README does not claim a measured percentage of AI contribution.

## References

- **Government of India:** Lok Sabha Unstarred Question 4505 — road-accident data for 2024. [Official report](https://sansad.in/getFile/loksabhaquestions/annex/187/AU4505_smjOzM.pdf?source=pqals)
- **Urfi et al. (2020):** Post-crash emergency care study in Aligarh, Uttar Pradesh. [Peer-reviewed paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC7380813/)
- **Emergency Response Support System, India:** [About 112](https://112.gov.in/about) · [112 features](https://112.gov.in/features)
- **American Red Cross:** [First-aid resources](https://www.redcross.org/take-a-class/first-aid)
- **NHS:** [Health information](https://www.nhs.uk/)
- **St John Ambulance:** [First-aid advice](https://www.sja.org.uk/)

These organisations are cited as public information sources. They do not endorse, sponsor, or certify PranDisha. Clinical instructions in this prototype still require professional review.

## Licence

The project code is offered under the MIT License; see [`LICENSE`](LICENSE). This licence does not automatically grant rights to third-party images, fonts, libraries, medical content, or other assets included or referenced by the project. Check each asset's licence separately.
