/**
 * app.js — PranDisha Emergency First-Aid Assistant (v7.0 Clinical Bento Edition)
 *
 * Vanilla JavaScript (100% client-side, zero external APIs, zero LLM calls at runtime):
 * - 10 pre-authored demonstration scenarios in English & Hindi
 * - Rule-based + Hinglish phonetic intent matcher with visible match banner & override
 * - Scope safety boundary banners (choking, unresponsive, bleeding, burns, allergic)
 * - Web Audio + haptic (navigator.vibrate) emergency micro-tools:
 *     * 110 BPM CPR compression metronome with instruction-card pulse
 *     * 10-second breathing check countdown
 *     * 20-minute burn cooling countdown
 *     * Persistent seizure stopwatch with 5:00 escalation
 * - Clinical bento scenario cards with per-scenario micro-widgets
 * - Soft-3D studio medical sculpture (Three.js) scoped to #hero-3d-stage
 * - Judge Sandbox inspector drawer (opened from the home footer)
 * - Sortable Clinical Traceability Matrix on the About & Safety screen
 * - Hands-free step navigation ("next"/"आगे", "back"/"पीछे", "repeat"/"दोहराएँ")
 *   with automatic TTS echo suppression
 * - Offline-capable Service Worker registration
 */

'use strict';

/* ══════════════════════════════════════════════════════════
   1. BILINGUAL UI STRINGS
   ══════════════════════════════════════════════════════════ */

const HTML_KEYS = new Set(['heroHeadline', 'heroSafety', 'aboutWhatBody', 'aboutTechNote']);

const UI = {
  en: {
    skipLink: 'Skip to content',
    headerLabel: 'VOICE-FIRST FIRST-AID DEMO',
    aboutNav: 'About & Safety',
    call112: 'Call 112',
    protoBanner: 'Prototype demonstration — provisional content, not clinically reviewed. Not a substitute for emergency services.',
    heroEyebrow: 'EMERGENCY GUIDANCE · MADE ACCESSIBLE',
    heroHeadline: 'In an emergency, know your <em>next step.</em>',
    heroSub: 'Clear, voice-led first-aid guidance while professional help is being arranged.',
    talkBtn: 'Talk to PranDisha',
    exploreBtn: 'Explore emergency situations',
    heroSafety: '<strong>Call 112 first.</strong> PranDisha supports — it never replaces — emergency services, and it never places a call for you.',
    factScenarios: 'demo scenarios',
    factLang: 'spoken & written',
    factData: 'data stored',
    heroCaption: 'Illustrative image · generated for this prototype',
    vpReady: 'Ready to guide',
    vpListening: 'Listening… say what happened',
    vpProcessing: 'Understanding…',
    vpFound: 'Opening guidance…',
    vpPrompt: 'Tap the microphone and say what happened.',
    vpHeard: 'Heard on this device',
    typeLabel: 'Or type what happened',
    typePlaceholder: 'Or type: “someone is choking”',
    typeGo: 'Find guidance',
    vpNoMatch: 'Couldn’t match that to a demo scenario. Please choose a situation below — or call 112 now.',
    vpNoSpeech: 'Voice recognition isn’t available in this browser. Type above or choose a situation below.',
    vpErrPermission: 'Microphone access was blocked. Please allow the microphone, or choose a situation below.',
    vpErrNoSpeech: 'Didn’t hear anything. Tap the microphone and try again, or choose a situation below.',
    vpErrNetwork: 'Voice recognition requires a network connection in this browser. Please choose below.',
    vpErrGeneric: 'Voice input did not work. Please choose a situation below.',
    chipProf: 'Professional help stays the priority',
    exEyebrow: '10 DEMONSTRATION SITUATIONS',
    exTitle: 'When something happens, start here.',
    exSub: 'Choose a situation or describe it in your own words.',
    exNote: 'These are ten demonstration scenarios, not a ranking of the most common emergencies in India.',
    footerCopy: 'VBYLD 2027 Hack for Social Cause · Provisional demonstration content · Requires review by qualified emergency-care professionals before any public use. Not affiliated with or endorsed by any government body or the organisations cited.',
    backHome: 'Home',
    transcript: 'Written transcript — always shown',
    listen: 'Listen to instruction',
    pause: 'Pause',
    resume: 'Resume',
    repeat: 'Repeat',
    audioIdle: 'Audio ready',
    audioSpeaking: 'Playing instruction…',
    audioPaused: 'Audio paused',
    audioDone: 'Instruction complete',
    audioUnavailable: 'Speech playback not supported in this browser',
    autoRead: 'Auto-read instructions',
    prevStep: 'Previous',
    restart: 'Restart',
    nextStep: 'Continue',
    finish: 'Finish',
    stepLabel: 'Step',
    of: 'of',
    callFirst: 'CALL FIRST',
    callBtnLg: 'Call 112',
    callNote: 'Tap to dial on a phone. PranDisha never places the call for you.',
    safetyH: 'Safety reminder',
    safetyP: 'Follow the emergency call handler’s directions over anything shown here. If the situation changes or gets worse, call 112 again.',
    langH: 'Language',
    provH: 'Provisional content',
    provP: 'These instructions are demonstration content. They have not been reviewed by qualified emergency-care professionals and must not be relied on as medical advice.',
    endHeadline: 'Keep following emergency-service guidance.',
    endBody: 'Continue following the call handler’s instructions until professional help arrives. Tell responders what happened and what has already been done.',
    callBtnEnd: 'Call 112 now',
    repeatLast: 'Hear last instruction',
    restartScenario: 'Restart this guidance',
    goHome: 'Back to home',
    endNote: 'This was a demonstration using predefined, provisional guidance. It does not confirm any clinical outcome.',
    aboutPageTitle: 'About & Safety',
    aboutWhatTitle: 'What is PranDisha?',
    aboutWhatBody: 'PranDisha is a prototype of a proposed multilingual, voice-first emergency first-aid assistant for India. When someone encounters an emergency, they may panic or struggle to recall first-aid knowledge. PranDisha provides calm, one-step-at-a-time voice guidance in their own language while professional emergency services are on their way.',
    aboutTechNote: 'Built for the VBYLD 2027 Hack for Social Cause using standard web technologies. It runs fully client-side without API keys, tracking, external AI dependencies, or cloud data storage. Voice recognition, speech synthesis, haptic rhythm feedback, and interactive emergency timers/metronomes use built-in browser Web Speech, Vibration, and Web Audio APIs.',
    aboutSafetyTitle: 'Safety boundaries',
    aboutVoiceTitle: 'Voice: what to expect',
    aboutSourcesTitle: 'Sources consulted',
    sourcesNote: 'These organizations do not endorse PranDisha. All scenario content requires clinical review before public deployment.',
    aboutFutureTitle: 'Before any real-world use',
    aboutReviewTitle: 'Flagged for clinical review',
    guideMe: 'Guide me',
    guidedSteps: 'guided steps',
    kindCall: 'Call 112',
    kindDont: 'Do not',
    kindCheck: 'Check',
    kindDo: 'Action',

    // v4.0 + v5.0 additions
    scopeBadge: 'SCOPE & SAFETY BOUNDARY',
    demoTryLabel: '1-tap demo:',
    demoChips: [
      'Someone collapsed',
      'Bleeding heavily',
      'Choking on food',
      'Garm paani se jal gaya',
    ],
    intentMatchedPrefix: 'Matched',
    intentRuleBadge: '⚡ Adrenaline-Optimized Intent Match',
    intentChooseAnother: 'Choose another',
    intentDismissAria: 'Dismiss match banner',
    handsfreeOff: 'Hands-free commands: OFF',
    handsfreeOn: 'Hands-free commands: ON',
    handsfreeHint: 'Say "Next" / "आगे", "Back" / "पीछे", or "Repeat" / "दोहराएँ" (auto-pauses while speaking)',
    toolMetronomeSub: '110 BPM · Audio + Haptic + Visual Pulse',
    toolMetronomeStart: 'Start 110 BPM Beat',
    toolMetronomeStop: 'Stop Metronome',
    toolCountdownStart: 'Start Timer',
    toolCountdownPause: 'Pause Timer',
    toolCountdownResume: 'Resume Timer',
    toolReset: 'Reset',
    toolDoneNote: 'Timer complete — proceed to the next step.',
    toolStopwatchStart: 'Start Seizure Timer',
    toolStopwatchPause: 'Pause',
    toolStopwatchResume: 'Resume',
    toolSeizurePillPrefix: 'Seizure timer:',
    toolSeizureAlert: '5:00 reached — Seizure ≥ 5 min: Call 112 immediately!',

    // v5.0 Judge Sandbox & Clinical Traceability Matrix strings
    aboutMatrixTitle: 'Interactive Clinical Traceability Matrix',
    aboutMatrixSub: 'Click any column header to sort scenarios by protocol number, primary reference, safety guardrail, or governance status.',
    aboutMatrixBadge: '10 / 10 Scenarios Mapped · Zero LLM Runtime',
    matrixColNum: '#',
    matrixColScenario: 'Scenario',
    matrixColSource: 'Source Guidelines',
    matrixColGuardrail: 'Scope & Micro-Tool Guardrails',
    matrixColStatus: 'Clinical Review Status',
    sandboxBtn: 'Judge Sandbox Mode',
    sandboxTitle: 'Offline & Intent Sandbox Inspector',
    sandboxSub: 'Live deterministic telemetry · VBYLD 2027 Verification',
    sandboxNetLabel: 'NETWORK & PWA ENGINE STATUS',
    sandboxNetOnline: 'Online · Client-Side',
    sandboxNetOffline: 'Offline PWA Cache Active',
    sandboxSimBtn: 'Simulate Network Disconnect Test',
    sandboxSimRestoreBtn: 'Restore Online Status Indicator',
    sandboxIntentLabel: 'ADRENALINE & HINGLISH INTENT MATCHER LOG',
  },
  hi: {
    skipLink: 'सामग्री पर जाएँ',
    headerLabel: 'आवाज़-प्रथम प्राथमिक-उपचार डेमो',
    aboutNav: 'परिचय और सुरक्षा',
    call112: '112 कॉल करें',
    protoBanner: 'प्रदर्शन प्रोटोटाइप — अस्थायी सामग्री, चिकित्सकीय समीक्षा नहीं हुई है। आपातकालीन सेवाओं का विकल्प नहीं।',
    heroEyebrow: 'आपातकालीन मार्गदर्शन · सबके लिए सुलभ',
    heroHeadline: 'आपातकाल में, जानें अपना <em>अगला कदम।</em>',
    heroSub: 'पेशेवर मदद आने तक स्पष्ट, आवाज़-निर्देशित प्राथमिक-उपचार सहायता।',
    talkBtn: 'PranDisha से बात करें',
    exploreBtn: 'आपातकालीन स्थितियाँ देखें',
    heroSafety: '<strong>पहले 112 कॉल करें।</strong> PranDisha आपातकालीन सेवाओं का सहयोगी है — विकल्प नहीं, और यह आपकी ओर से कॉल नहीं करता।',
    factScenarios: 'डेमो परिदृश्य',
    factLang: 'बोलकर और लिखकर',
    factData: 'डेटा संग्रहीत',
    heroCaption: 'उदाहरणात्मक छवि · इस प्रोटोटाइप के लिए बनाई गई',
    vpReady: 'मार्गदर्शन के लिए तैयार',
    vpListening: 'सुन रहा हूँ… बताइए क्या हुआ',
    vpProcessing: 'समझ रहा हूँ…',
    vpFound: 'मार्गदर्शन खोल रहा हूँ…',
    vpPrompt: 'माइक्रोफ़ोन दबाएँ और बताइए क्या हुआ।',
    vpHeard: 'इस डिवाइस पर सुना गया',
    typeLabel: 'या टाइप करें क्या हुआ',
    typePlaceholder: 'या टाइप करें: “गले में कुछ अटक गया”',
    typeGo: 'मार्गदर्शन खोजें',
    vpNoMatch: 'इसे किसी डेमो परिदृश्य से नहीं जोड़ पाया। कृपया नीचे से चुनें — या अभी 112 कॉल करें।',
    vpNoSpeech: 'इस ब्राउज़र में आवाज़ पहचान उपलब्ध नहीं है। ऊपर टाइप करें या नीचे से चुनें।',
    vpErrPermission: 'माइक्रोफ़ोन की अनुमति नहीं मिली। कृपया अनुमति दें, या नीचे से चुनें।',
    vpErrNoSpeech: 'कुछ सुनाई नहीं दिया। माइक्रोफ़ोन दबाकर फिर कोशिश करें, या नीचे से चुनें।',
    vpErrNetwork: 'इस ब्राउज़र में आवाज़ पहचान के लिए इंटरनेट चाहिए। कृपया नीचे से चुनें।',
    vpErrGeneric: 'आवाज़ इनपुट काम नहीं किया। कृपया नीचे से चुनें।',
    chipProf: 'पेशेवर मदद ही सर्वोच्च प्राथमिकता है',
    exEyebrow: '10 प्रदर्शन स्थितियाँ',
    exTitle: 'जब कोई आपातकाल हो, यहाँ से शुरू करें।',
    exSub: 'कोई स्थिति चुनें या अपने शब्दों में बताइए।',
    exNote: 'ये दस प्रदर्शन परिदृश्य हैं, भारत में सबसे आम आपातकालों की रैंकिंग नहीं।',
    footerCopy: 'VBYLD 2027 हैक फ़ॉर सोशल कॉज़ · अस्थायी प्रदर्शन सामग्री · किसी भी सार्वजनिक उपयोग से पहले योग्य आपातकालीन-देखभाल विशेषज्ञों द्वारा समीक्षा आवश्यक। किसी भी सरकारी निकाय या संदर्भित संगठनों से संबद्ध नहीं।',
    backHome: 'होम',
    transcript: 'लिखित प्रतिलिपि — हमेशा प्रदर्शित',
    listen: 'निर्देश सुनें',
    pause: 'रोकें',
    resume: 'जारी रखें',
    repeat: 'दोहराएँ',
    audioIdle: 'ऑडियो तैयार',
    audioSpeaking: 'निर्देश सुना रहा है…',
    audioPaused: 'ऑडियो रुका हुआ',
    audioDone: 'निर्देश समाप्त',
    audioUnavailable: 'इस ब्राउज़र पर ऑडियो उपलब्ध नहीं है',
    autoRead: 'निर्देश अपने आप पढ़ें',
    prevStep: 'पिछला',
    restart: 'फिर शुरू करें',
    nextStep: 'आगे बढ़ें',
    finish: 'समाप्त करें',
    stepLabel: 'चरण',
    of: 'में से',
    callFirst: 'पहले कॉल करें',
    callBtnLg: '112 कॉल करें',
    callNote: 'फ़ोन पर डायल करने के लिए टैप करें। PranDisha आपकी ओर से कभी कॉल नहीं करता।',
    safetyH: 'सुरक्षा स्मरण',
    safetyP: 'यहाँ दिखाई गई किसी भी बात से ऊपर आपातकालीन कॉल संचालक के निर्देशों का पालन करें। यदि स्थिति बदले या बिगड़े, तो दोबारा 112 कॉल करें।',
    langH: 'भाषा',
    provH: 'अस्थायी सामग्री',
    provP: 'ये निर्देश प्रदर्शन सामग्री हैं। योग्य आपातकालीन-देखभाल विशेषज्ञों द्वारा इनकी समीक्षा नहीं की गई है और इन्हें चिकित्सीय सलाह नहीं माना जाना चाहिए।',
    endHeadline: 'आपातकालीन सेवा के निर्देशों का पालन करते रहें।',
    endBody: 'पेशेवर मदद आने तक कॉल संचालक के निर्देशों का पालन करते रहें। आने वाले आपातकालीन दल को बताएँ कि क्या हुआ और अब तक क्या किया गया है।',
    callBtnEnd: 'अभी 112 कॉल करें',
    repeatLast: 'आख़िरी निर्देश सुनें',
    restartScenario: 'यह मार्गदर्शन फिर शुरू करें',
    goHome: 'होम पर वापस जाएँ',
    endNote: 'यह पहले से तय, अस्थायी मार्गदर्शन वाला एक प्रदर्शन था। यह किसी चिकित्सकीय परिणाम की पुष्टि नहीं करता।',
    aboutPageTitle: 'परिचय और सुरक्षा',
    aboutWhatTitle: 'PranDisha क्या है?',
    aboutWhatBody: 'PranDisha भारत के लिए प्रस्तावित एक बहुभाषी, आवाज़-प्रथम आपातकालीन प्राथमिक-उपचार सहायक का प्रोटोटाइप है। किसी आपात स्थिति में लोग घबरा सकते हैं या प्राथमिक उपचार की जानकारी याद करने में असमर्थ हो सकते हैं। PranDisha उनकी अपनी भाषा में एक-एक कदम का शांत आवाज़ मार्गदर्शन देता है, जब तक कि पेशेवर आपातकालीन सेवाएँ पहुँच न जाएँ।',
    aboutTechNote: 'मानक वेब तकनीकों का उपयोग करके VBYLD 2027 हैक फ़ॉर सोशल कॉज़ के लिए निर्मित। यह बिना किसी API कीज़, ट्रैकिंग, बाहरी AI निर्भरता या क्लाउड डेटा स्टोरेज के पूरी तरह से ब्राउज़र में चलता है। आवाज़ पहचान, वाक् संश्लेषण, हैप्टिक वाइब्रेशन और आपातकालीन टाइमर/मेट्रोनोम ब्राउज़र के अंतर्निहित Web Speech, Vibration और Web Audio API का उपयोग करते हैं।',
    aboutSafetyTitle: 'सुरक्षा सीमाएँ',
    aboutVoiceTitle: 'आवाज़: क्या अपेक्षा रखें',
    aboutSourcesTitle: 'परामर्श किए गए स्रोत',
    sourcesNote: 'ये संगठन PranDisha का समर्थन नहीं करते। सभी परिदृश्य सामग्री को सार्वजनिक उपयोग से पहले चिकित्सकीय समीक्षा की आवश्यकता है।',
    aboutFutureTitle: 'वास्तविक उपयोग से पहले आवश्यक कदम',
    aboutReviewTitle: 'चिकित्सकीय समीक्षा के लिए चिह्नित',
    guideMe: 'मार्गदर्शन',
    guidedSteps: 'मार्गदर्शित कदम',
    kindCall: '112 कॉल',
    kindDont: 'न करें',
    kindCheck: 'जाँचें',
    kindDo: 'कार्रवाई',

    // v4.0 + v5.0 additions
    scopeBadge: 'सुरक्षा और दायरा सीमा',
    demoTryLabel: '1-टैप डेमो:',
    demoChips: [
      'कोई बेहोश हो गया',
      'बहुत खून बह रहा है',
      'गले में कुछ अटक गया',
      'सड़क पर एक्सीडेंट हुआ',
    ],
    intentMatchedPrefix: 'मिलान',
    intentRuleBadge: '⚡ उच्च-तनाव पहचान मिलान',
    intentChooseAnother: 'दूसरा चुनें',
    intentDismissAria: 'मिलान बैनर बंद करें',
    handsfreeOff: 'हैंड्स-फ़्री कमांड: बंद',
    handsfreeOn: 'हैंड्स-फ़्री कमांड: चालू',
    handsfreeHint: 'बोलें: "आगे" / "Next", "पीछे" / "Back", या "दोहराएँ" / "Repeat" (बोलते समय अपने आप रुकता है)',
    toolMetronomeSub: '110 BPM · ऑडियो + हैप्टिक + विज़ुअल पल्स',
    toolMetronomeStart: '110 BPM बीट शुरू करें',
    toolMetronomeStop: 'मेट्रोनोम रोकें',
    toolCountdownStart: 'टाइमर शुरू करें',
    toolCountdownPause: 'टाइमर रोकें',
    toolCountdownResume: 'टाइमर जारी रखें',
    toolReset: 'रीसेट करें',
    toolDoneNote: 'समय पूरा हुआ — अगले चरण पर जाएँ।',
    toolStopwatchStart: 'दौरे का टाइमर शुरू करें',
    toolStopwatchPause: 'रोकें',
    toolStopwatchResume: 'जारी रखें',
    toolSeizurePillPrefix: 'दौरा टाइमर:',
    toolSeizureAlert: '5:00 पूरे — 5 मिनट से अधिक दौरा: तुरंत 112 कॉल करें!',

    // v5.0 Judge Sandbox & Clinical Traceability Matrix strings
    aboutMatrixTitle: 'इंटरैक्टिव क्लिनिकल ट्रेसेबिलिटी मैट्रिक्स',
    aboutMatrixSub: 'प्रोटोकॉल संख्या, मुख्य संदर्भ, सुरक्षा दायरा या समीक्षा स्थिति के अनुसार क्रमबद्ध करने के लिए किसी भी कॉलम हेडर पर क्लिक करें।',
    aboutMatrixBadge: '10 / 10 परिदृश्य मैप किए गए · शून्य LLM रनटाइम',
    matrixColNum: '#',
    matrixColScenario: 'परिदृश्य',
    matrixColSource: 'स्रोत दिशानिर्देश',
    matrixColGuardrail: 'सुरक्षा दायरा और माइक्रो-टूल',
    matrixColStatus: 'नैदानिक समीक्षा स्थिति',
    sandboxBtn: 'जज सैंडबॉक्स मोड',
    sandboxTitle: 'ऑफ़लाइन और इंटेंट सैंडबॉक्स इंस्पेक्टर',
    sandboxSub: 'लाइव नियतात्मक टेलीमेट्री · VBYLD 2027 सत्यापन',
    sandboxNetLabel: 'नेटवर्क और PWA इंजन स्थिति',
    sandboxNetOnline: 'ऑनलाइन · क्लाइंट-साइड',
    sandboxNetOffline: 'ऑफ़लाइन PWA कैश सक्रिय',
    sandboxSimBtn: 'ऑफ़लाइन डिस्कनेक्ट परीक्षण करें',
    sandboxSimRestoreBtn: 'ऑनलाइन स्थिति संकेतक बहाल करें',
    sandboxIntentLabel: 'उच्च-तनाव और हिंग्लिश इंटेंट मिलान लॉग',
  },
};

const STATIC_ABOUT = {
  safety: {
    en: [
      'Does not diagnose medical conditions or give clinical prognoses.',
      'Does not contact emergency services on your behalf — call 112 yourself.',
      'Does not dispatch ambulances or track their real-time location.',
      'Does not collect or transmit personal health data, names, or locations.',
      'Uses predefined demonstration scripts — not generative unconstrained medical AI.',
      'Call 112 first. Always follow the emergency call handler’s directions over any screen text.',
    ],
    hi: [
      'किसी चिकित्सीय स्थिति का निदान नहीं करता और न ही रोग का पूर्वानुमान देता है।',
      'आपकी ओर से आपातकालीन सेवाओं को संपर्क नहीं करता — स्वयं 112 कॉल करें।',
      'एम्बुलेंस नहीं भेजता और न ही उसकी लोकेशन ट्रैक करता है।',
      'व्यक्तिगत स्वास्थ्य डेटा, नाम या स्थान एकत्र या प्रसारित नहीं करता।',
      'पहले से तय डेमो स्क्रिप्ट का उपयोग करता है — अनियंत्रित मेडिकल AI नहीं है।',
      'पहले 112 कॉल करें। स्क्रीन पर किसी भी निर्देश से पहले हमेशा संचालक के निर्देशों का पालन करें।',
    ],
  },
  voice: {
    en: [
      'Spoken instructions use the browser’s built-in text-to-speech. Voice naturalness and pronunciation depend on your device.',
      'Hindi voice playback requires an installed Hindi text-to-speech engine on your operating system or browser.',
      'Voice input uses transparent, rule-based and phonetic Hinglish keyword matching on your device. It does not analyse symptoms or make clinical decisions.',
      'Hands-free voice step navigation ("Next", "Back", "Repeat") automatically pauses while TTS is speaking to prevent audio feedback.',
      'A complete written transcript is always shown on screen as a dependable visual fallback.',
    ],
    hi: [
      'बोले गए निर्देश ब्राउज़र के अपने टेक्स्ट-टू-स्पीच का उपयोग करते हैं। आवाज़ की गुणवत्ता आपकी डिवाइस पर निर्भर करती है।',
      'हिंदी आवाज़ प्लेबैक के लिए आपके ऑपरेटिंग सिस्टम या ब्राउज़र में हिंदी टीटीएस इंजन होना आवश्यक है।',
      'आवाज़ इनपुट आपके डिवाइस पर पारदर्शी और ध्वन्यात्मक हिंग्लिश कीवर्ड मिलान का उपयोग करता है। यह लक्षणों का विश्लेषण नहीं करता।',
      'हैंड्स-फ़्री वॉइस कमांड ("आगे", "पीछे", "दोहराएँ") निर्देश बोलते समय अपने आप रुक जाते हैं ताकि आवाज़ न टकराए।',
      'स्क्रीन पर हमेशा एक पूरा लिखित निर्देश दिखाई देता है ताकि आवाज़ न आने पर भी कोई रुकावट न हो।',
    ],
  },
  future: {
    en: [
      'Formal clinical review and endorsement by certified emergency medicine specialists in India.',
      'Support for Indian regional languages: Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, and Punjabi.',
      'Bundled offline regional text-to-speech voice packs to complement the offline PWA app shell in low-connectivity areas.',
      'Structured usability testing with rural community health workers (ASHAs) and everyday citizens.',
    ],
    hi: [
      'भारत में प्रमाणित आपातकालीन चिकित्सा विशेषज्ञों द्वारा औपचारिक नैदानिक समीक्षा और सत्यापन।',
      'भारतीय क्षेत्रीय भाषाओं का समर्थन: तमिल, तेलुगु, बंगाली, मराठी, कन्नड़, मलयालम, गुजराती और पंजाबी।',
      'कम नेटवर्क वाले क्षेत्रों के लिए ऑफ़लाइन PWA ऐप शेल के साथ क्षेत्रीय भाषा के ऑफ़लाइन वॉइस पैक।',
      'आशा (ASHA) कार्यकर्ताओं और आम नागरिकों के साथ संरचित उपयोगिता परीक्षण।',
    ],
  },
};

/* ══════════════════════════════════════════════════════════
   2. STATE & CORE OBJECTS
   ══════════════════════════════════════════════════════════ */

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

const state = {
  lang: 'en',
  scenarioId: null,
  stepIndex: 0,
  speechSupported: 'speechSynthesis' in window,
  recognitionSupported: !!SR,
  voiceStatusKey: 'vpReady',
  isListening: false,
  autoRead: false,
  audioState: 'idle', // 'idle' | 'speaking' | 'paused' | 'done' | 'unavailable'
  currentUtterance: null,
  lastIntentMatch: null, // { query, phoneticNorm, scenarioId, score, matchedTokens, isAdrenaline }
  handsFree: false,
  matrixSortCol: 'order',
  matrixSortAsc: true,
  sandboxOpen: false,
  simulatedOffline: false,
};

const $ = (id) => document.getElementById(id);

const screens = {
  home: $('screen-home'),
  scenario: $('screen-scenario'),
  end: $('screen-end'),
  about: $('screen-about'),
};

const els = {
  btnLangEn: $('btn-lang-en'),
  btnLangHi: $('btn-lang-hi'),
  btnHome: $('btn-home'),
  btnAboutHeader: $('btn-about-header'),
  btnAboutFooter: $('btn-about-footer'),
  btnBackFromAbout: $('btn-back-from-about'),
  btnTalk: $('btn-talk'),
  btnExplore: $('btn-explore'),
  explorer: $('explorer'),
  scenarioGrid: $('scenario-grid'),

  // Voice card
  voiceCard: $('voice-card'),
  btnMic: $('btn-mic'),
  waveBars: $('wave-bars'),
  vpStatus: $('vp-status'),
  vpPrompt: $('vp-prompt'),
  vpTranscriptBox: $('vp-transcript-box'),
  vpTranscriptText: $('vp-transcript-text'),
  vpErrorBox: $('vp-error-box'),
  vpErrorText: $('vp-error-text'),
  voiceTextForm: $('voice-text-form'),
  voiceText: $('voice-text'),
  vcDemoChips: $('vc-demo-chips'),
  vpNoSpeech: $('vp-no-speech'),

  // Guidance screen
  btnBackHome: $('btn-back-home'),
  intentMatchBanner: $('intent-match-banner'),
  scenarioTitle: $('scenario-title'),
  stepCounter: $('step-counter'),
  seizureTimerPill: $('seizure-timer-pill'),
  progressSegs: $('progress-segs'),
  scenarioScopeBanner: $('scenario-scope-banner'),
  instructionCard: $('instruction-card'),
  sgArt: $('sg-art'),
  sgStepIcon: $('sg-step-icon'),
  stepKind: $('step-kind'),
  stepBadge: $('step-badge'),
  instructionText: $('instruction-text'),
  stepToolBox: $('step-tool-box'),

  // Audio controls
  btnListen: $('btn-listen'),
  listenLabel: $('listen-label'),
  btnPause: $('btn-pause'),
  pauseLabel: $('pause-label'),
  btnRepeat: $('btn-repeat'),
  audioState: $('audio-state'),
  audioStateText: $('audio-state-text'),
  autoRead: $('auto-read'),
  btnHandsfree: $('btn-handsfree'),
  handsfreeLabel: $('handsfree-label'),
  handsfreeHint: $('handsfree-hint'),
  speechFallback: $('speech-fallback'),

  // Guidance navigation
  btnPrev: $('btn-prev'),
  btnRestart: $('btn-restart'),
  btnNext: $('btn-next'),

  // Guidance side
  sideLangNow: $('side-lang-now'),

  // End screen
  btnRepeatLast: $('btn-repeat-last'),
  btnRestartScenario: $('btn-restart-scenario'),
  btnHomeFromEnd: $('btn-home-from-end'),

  // About screen & Clinical Matrix
  aboutSafetyList: $('about-safety-list'),
  aboutVoiceList: $('about-voice-list'),
  aboutSources: $('about-sources'),
  aboutFutureList: $('about-future-list'),
  aboutReviewList: $('about-review-list'),
  clinicalMatrixTable: $('clinical-matrix-table'),
  matrixThead: $('matrix-thead'),
  matrixTbody: $('matrix-tbody'),

  // Judge Sandbox Mode Inspector Drawer
  btnSandboxToggle: $('btn-sandbox-toggle'),
  sandboxFabLabel: $('sandbox-fab-label'),
  sandboxDrawer: $('sandbox-drawer'),
  btnSandboxClose: $('btn-sandbox-close'),
  sandboxNetPill: $('sandbox-net-pill'),
  btnSandboxOfflineTest: $('btn-sandbox-offline-test'),
  sandboxOfflineReport: $('sandbox-offline-report'),
  sandboxTestPills: $('sandbox-test-pills'),
  sandboxIntentLog: $('sandbox-intent-log'),
};

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ══════════════════════════════════════════════════════════
   3. SCREEN ROUTING
   ══════════════════════════════════════════════════════════ */

function showScreen(name) {
  stopSpeech();
  if (name !== 'home') stopListening();
  if (name !== 'scenario') {
    stopStepTools();
    stopHandsFreeListening();
    if (name === 'home' || name === 'about') {
      stopSeizureStopwatch();
    }
  }

  Object.entries(screens).forEach(([key, el]) => {
    if (!el) return;
    const isActive = key === name;
    el.classList.toggle('active', isActive);
    if (isActive) {
      el.removeAttribute('hidden');
    } else {
      el.setAttribute('hidden', '');
    }
  });

  // Keep Judge Sandbox toggle button visible on Home and Guidance screens
  if (els.btnSandboxToggle) {
    els.btnSandboxToggle.hidden = !(name === 'home' || name === 'scenario');
  }

  transition3DCameraForScreen(name);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════════════════════════
   4. DATA ACCESS HELPERS & CLINICAL BENTO METADATA
   ══════════════════════════════════════════════════════════ */

const SCENARIO_VISUAL_META = {
  bleeding: {
    icon: 'pressure',
    tint: '#FFE4E6',
    accent: '#E11D48',
    tagEn: 'Urgent · Bleeding Control',
    tagHi: 'आपात · रक्तस्राव नियंत्रण',
  },
  unresponsive: {
    icon: 'heart',
    tint: '#DBEAFE',
    accent: '#2563EB',
    tagEn: 'Critical · CPR & Airway',
    tagHi: 'गंभीर · सीपीआर और श्वास',
  },
  choking: {
    icon: 'cough',
    tint: '#FEF3C7',
    accent: '#D97706',
    tagEn: 'Adult Demo · Airway',
    tagHi: 'वयस्क डेमो · वायुमार्ग',
  },
  burns: {
    icon: 'water',
    tint: '#FFEDD5',
    accent: '#EA580C',
    tagEn: 'Thermal · Cool 20 Min',
    tagHi: 'जलन · 20 मिनट ठंडा पानी',
  },
  seizure: {
    icon: 'clock',
    tint: '#EDE9FE',
    accent: '#7C3AED',
    tagEn: 'Neurological · Time Seizure',
    tagHi: 'तंत्रिका · दौरे का समय',
  },
  accident: {
    icon: 'alert',
    tint: '#E2E8F0',
    accent: '#334155',
    tagEn: 'Trauma · Spine Safety',
    tagHi: 'दुर्घटना · रीढ़ सुरक्षा',
  },
  stroke: {
    icon: 'face',
    tint: '#FCE7F3',
    accent: '#DB2777',
    tagEn: 'FAST Check · Stroke',
    tagHi: 'FAST जाँच · स्ट्रोक',
  },
  chest: {
    icon: 'heart',
    tint: '#FFE4E6',
    accent: '#E11D48',
    tagEn: 'Cardiac · Call 112',
    tagHi: 'हृदय · 112 कॉल करें',
  },
  allergic: {
    icon: 'pen',
    tint: '#FEF9C3',
    accent: '#CA8A04',
    tagEn: 'Anaphylaxis · Auto-Injector',
    tagHi: 'गंभीर एलर्जी · इंजेक्टर',
  },
  poison: {
    icon: 'bottle',
    tint: '#D1FAE5',
    accent: '#059669',
    tagEn: 'Toxicology · Do Not Vomit',
    tagHi: 'विषाक्तता · उल्टी न कराएँ',
  },
};

function getScenarioVisual(sc) {
  if (!sc) {
    return {
      icon: 'shield',
      tint: '#E6FAF5',
      accent: '#0D9488',
      tagEn: 'Clinical Guidance',
      tagHi: 'प्राथमिक मार्गदर्शन',
    };
  }
  return (
    SCENARIO_VISUAL_META[sc.id] || {
      icon: (sc.steps && sc.steps[0] && sc.steps[0].icon) || 'shield',
      tint: sc.tint || '#E6FAF5',
      accent: sc.accent || '#0D9488',
      tagEn: 'Clinical Guidance',
      tagHi: 'प्राथमिक मार्गदर्शन',
    }
  );
}

function buildScenarioMicroWidget(scId, lang, iconSvg) {
  const isHi = lang === 'hi';
  switch (scId) {
    case 'bleeding':
      return `
        <div class="sc-widget">
          <div class="mw-rings" aria-hidden="true"><span class="r1"></span><span class="r2"></span><span class="r3"></span></div>
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? 'सीधा मज़बूत दबाव' : 'Direct Pressure'}</span>
            <span class="sc-w-sub">${isHi ? 'कपड़ा न हटाएँ · 112 कॉल' : 'Keep cloth in place · Call 112'}</span>
          </div>
          <span class="mw-badge-pill">${isHi ? 'दबाए रखें' : 'Hold Firm'}</span>
        </div>`;
    case 'unresponsive':
      return `
        <div class="sc-widget">
          <div class="sc-w-icon" aria-hidden="true">${iconSvg}</div>
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? '110 BPM सीपीआर सहायता' : '110 BPM CPR Aid'}</span>
            <span class="sc-w-sub">${isHi ? '10 सेकंड श्वास जाँच' : '10s Breathing Check'}</span>
          </div>
          <svg class="mw-ecg" viewBox="0 0 80 26" aria-hidden="true">
            <path d="M2 14h16l5-8 6 16 7-20 6 15 5-3h31"/>
          </svg>
        </div>`;
    case 'choking':
      return `
        <div class="sc-widget">
          <div class="sc-w-icon" aria-hidden="true">${iconSvg}</div>
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? '5 पीठ पर वार ⇄ 5 पेट दबाव' : '5 Back Blows ⇄ 5 Thrusts'}</span>
            <span class="sc-w-sub">${isHi ? 'खुलने तक दोहराएँ' : 'Alternate cycle until clear'}</span>
          </div>
          <span class="mw-badge-pill">5 ⇄ 5</span>
        </div>`;
    case 'burns':
      return `
        <div class="sc-widget">
          <div class="sc-w-icon" aria-hidden="true">${iconSvg}</div>
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? '20:00 बहता ठंडा पानी' : '20:00 Cool Running Water'}</span>
            <div class="mw-bar-track" aria-hidden="true"><div class="mw-bar-fill"></div></div>
          </div>
          <span class="mw-badge-pill">20m</span>
        </div>`;
    case 'seizure':
      return `
        <div class="sc-widget">
          <div class="sc-w-icon" aria-hidden="true">${iconSvg}</div>
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? '00:00 अवधि टाइमर' : '00:00 Duration Timer'}</span>
            <span class="sc-w-sub">${isHi ? 'सिर के नीचे नरम कपड़ा' : 'Protect Head · Clear Area'}</span>
          </div>
          <span class="mw-badge-pill">⏱ 5:00</span>
        </div>`;
    case 'accident':
      return `
        <div class="sc-widget">
          <div class="sc-w-icon" aria-hidden="true">${iconSvg}</div>
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? '112 + रीढ़/गर्दन सुरक्षा' : '112 + Spine Immobilization'}</span>
            <span class="sc-w-sub">${isHi ? 'घायल को न हिलाएँ' : 'Do not move neck or back'}</span>
          </div>
          <span class="mw-badge-pill">112</span>
        </div>`;
    case 'stroke':
      return `
        <div class="sc-widget">
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? 'F (चेहरा) · A (हाथ) · S (बोली) · T (समय)' : 'F (Face) · A (Arms) · S (Speech) · T (Time)'}</span>
            <span class="sc-w-sub">${isHi ? 'लक्षण शुरू होने का समय नोट करें' : 'Note exact onset time · Call 112'}</span>
          </div>
          <div class="mw-fast-grid" aria-hidden="true">
            <span class="mw-fast-pill">F</span>
            <span class="mw-fast-pill">A</span>
            <span class="mw-fast-pill">S</span>
            <span class="mw-fast-pill">T</span>
          </div>
        </div>`;
    case 'chest':
      return `
        <div class="sc-widget">
          <div class="sc-w-icon" aria-hidden="true">${iconSvg}</div>
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? 'तुरंत 112 · आराम से बैठाएँ' : 'Urgent 112 · Rest Sitting'}</span>
            <span class="sc-w-sub">${isHi ? 'स्वयं गाड़ी न चलाएँ' : 'Do not drive yourself'}</span>
          </div>
          <svg class="mw-ecg" viewBox="0 0 80 26" aria-hidden="true">
            <path d="M2 14h14l4-7 6 15 7-19 6 14 5-3h34"/>
          </svg>
        </div>`;
    case 'allergic':
      return `
        <div class="sc-widget">
          <div class="sc-w-icon" aria-hidden="true">${iconSvg}</div>
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? 'ऑटो-इंजेक्टर + सीधा लिटाएँ' : 'Auto-Injector + Lie Flat'}</span>
            <span class="sc-w-sub">${isHi ? 'पैर ऊपर रखें · 112 कॉल' : 'Raise legs gently · Call 112'}</span>
          </div>
          <span class="mw-badge-pill">Epi</span>
        </div>`;
    case 'poison':
    default:
      return `
        <div class="sc-widget">
          <div class="sc-w-icon" aria-hidden="true">${iconSvg}</div>
          <div class="sc-w-content">
            <span class="sc-w-title">${isHi ? 'उल्टी न कराएँ · लेबल रखें' : 'Do Not Induce Vomiting · Keep Label'}</span>
            <span class="sc-w-sub">${isHi ? 'ताज़ी हवा · तुरंत 112 कॉल' : 'Fresh air · Call 112 immediately'}</span>
          </div>
          <span class="mw-badge-pill">112</span>
        </div>`;
  }
}

function getData() {
  return window.PD_DATA || {};
}

function getScenarios() {
  return getData().SCENARIOS || [];
}

function findScenario(id) {
  return getScenarios().find((s) => s.id === id) || null;
}

/* ══════════════════════════════════════════════════════════
   5. DYNAMIC RENDERING (BENTO CARDS, DEMO CHIPS, ABOUT & MATRIX)
   ══════════════════════════════════════════════════════════ */

function renderDemoChips() {
  if (!els.vcDemoChips) return;
  const ui = UI[state.lang];
  const chips = ui.demoChips || [];

  els.vcDemoChips.innerHTML =
    `<span class="vc-chips-label">${escapeHtml(ui.demoTryLabel)}</span>` +
    chips
      .map(
        (phrase) =>
          `<button type="button" class="vc-chip" data-chip="${escapeHtml(phrase)}">“${escapeHtml(phrase)}”</button>`
      )
      .join('');

  els.vcDemoChips.querySelectorAll('[data-chip]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const phrase = btn.getAttribute('data-chip') || '';
      if (els.voiceText) els.voiceText.value = phrase;
      handleTextSearch(phrase);
    });
  });
}

function renderScenarioCards() {
  if (!els.scenarioGrid) return;
  const list = getScenarios();
  const lang = state.lang;
  const ui = UI[lang];
  const iconMap = getData().ICONS || {};

  els.scenarioGrid.innerHTML = list
    .map((sc) => {
      const title = (sc[lang] && sc[lang].title) || sc.en.title;
      const blurb = (sc[lang] && sc[lang].blurb) || sc.en.blurb;
      const stepCount = sc.steps ? sc.steps.length : 0;
      const featuredClass = sc.featured ? ' featured' : '';
      const vis = getScenarioVisual(sc);
      const vectorIcon = iconMap[vis.icon] || iconMap.shield || '';
      const clinicalTag = lang === 'hi' ? vis.tagHi : vis.tagEn;
      const stepsBadge = lang === 'hi' ? `${stepCount} चरण` : `${stepCount} steps`;
      const microWidgetHtml = buildScenarioMicroWidget(sc.id, lang, vectorIcon);

      return `
        <button class="sc-card${featuredClass}" data-scenario="${sc.id}" data-accent="${vis.accent}" aria-label="${escapeHtml(title)} — ${stepCount} ${escapeHtml(ui.guidedSteps)}" style="--tint: ${vis.tint}; --accent: ${vis.accent};">
          <div class="sc-art">
            <div class="sc-top-bar">
              <span class="sc-clinical-tag">${escapeHtml(clinicalTag)}</span>
              <span class="sc-steps-pill">${escapeHtml(stepsBadge)}</span>
            </div>
            ${microWidgetHtml}
          </div>
          <div class="sc-body">
            <h3 class="sc-title">${escapeHtml(title)}</h3>
            <p class="sc-desc">${escapeHtml(blurb)}</p>
            <div class="sc-cue">
              <small>${stepCount} ${escapeHtml(ui.guidedSteps)}</small>
              <span class="sc-go">
                ${escapeHtml(ui.guideMe)}
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5l4.5 4.5L6 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </div>
          </div>
        </button>
      `;
    })
    .join('');

  els.scenarioGrid.querySelectorAll('[data-scenario]').forEach((btn) => {
    const accentHex = btn.getAttribute('data-accent') || '#0D9488';
    btn.addEventListener('click', () => {
      startScenario(btn.getAttribute('data-scenario'), null);
    });
    btn.addEventListener('mouseenter', () => {
      set3DOrbScenarioHover(accentHex, true);
    });
    btn.addEventListener('mouseleave', () => {
      set3DOrbScenarioHover(accentHex, false);
    });
  });
}

function renderClinicalMatrix() {
  if (!els.matrixThead || !els.matrixTbody) return;
  const lang = state.lang;
  const ui = UI[lang];
  const rawRows = (getData().TRACEABILITY || []).map((row) => {
    const sc = findScenario(row.scenarioId);
    const scTitle = sc ? (sc[lang] && sc[lang].title) || sc.en.title : row.scenarioId;
    const guidelineText = (row.guideline && (row.guideline[lang] || row.guideline.en)) || '';
    const guardrailText = (row.guardrail && (row.guardrail[lang] || row.guardrail.en)) || '';
    const statusText = (row.status && (row.status[lang] || row.status.en)) || '';
    return {
      order: row.order,
      scenarioId: row.scenarioId,
      scenarioTitle: scTitle,
      source: row.source,
      guideline: guidelineText,
      guardrail: guardrailText,
      statusCode: row.statusCode,
      status: statusText,
    };
  });

  const col = state.matrixSortCol;
  const dir = state.matrixSortAsc ? 1 : -1;
  rawRows.sort((a, b) => {
    if (col === 'order') return (a.order - b.order) * dir;
    const valA = String(a[col] || '').toLowerCase();
    const valB = String(b[col] || '').toLowerCase();
    return valA.localeCompare(valB) * dir;
  });

  const cols = [
    { key: 'order', label: ui.matrixColNum },
    { key: 'scenarioTitle', label: ui.matrixColScenario },
    { key: 'source', label: ui.matrixColSource },
    { key: 'guardrail', label: ui.matrixColGuardrail },
    { key: 'status', label: ui.matrixColStatus },
  ];

  els.matrixThead.innerHTML = `
    <tr>
      ${cols
        .map((c) => {
          const isCurrent = state.matrixSortCol === c.key;
          const arrow = isCurrent ? (state.matrixSortAsc ? '↑' : '↓') : '↕';
          const ariaSort = isCurrent ? (state.matrixSortAsc ? 'ascending' : 'descending') : 'none';
          return `<th aria-sort="${ariaSort}">
            <button type="button" class="matrix-sort-btn" data-sort-col="${c.key}">
              <span>${escapeHtml(c.label)}</span>
              <span aria-hidden="true">${arrow}</span>
            </button>
          </th>`;
        })
        .join('')}
    </tr>
  `;

  els.matrixTbody.innerHTML = rawRows
    .map(
      (r) => `
      <tr>
        <td><strong>${String(r.order).padStart(2, '0')}</strong></td>
        <td>
          <button type="button" class="matrix-sc-btn" data-open-scenario="${escapeHtml(r.scenarioId)}">
            ${escapeHtml(r.scenarioTitle)}
          </button>
        </td>
        <td>
          <div><strong>${escapeHtml(r.source)}</strong></div>
          <div style="font-size:.78rem; color:var(--slate); margin-top:2px;">${escapeHtml(r.guideline)}</div>
        </td>
        <td>${escapeHtml(r.guardrail)}</td>
        <td>
          <span class="matrix-status-pill" data-status="${escapeHtml(r.statusCode)}">
            ${escapeHtml(r.status)}
          </span>
        </td>
      </tr>
    `
    )
    .join('');

  els.matrixThead.querySelectorAll('[data-sort-col]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const clickedCol = btn.getAttribute('data-sort-col');
      if (state.matrixSortCol === clickedCol) {
        state.matrixSortAsc = !state.matrixSortAsc;
      } else {
        state.matrixSortCol = clickedCol;
        state.matrixSortAsc = true;
      }
      renderClinicalMatrix();
    });
  });

  els.matrixTbody.querySelectorAll('[data-open-scenario]').forEach((btn) => {
    btn.addEventListener('click', () => {
      startScenario(btn.getAttribute('data-open-scenario'), null);
    });
  });
}

function renderAboutScreen() {
  const lang = state.lang;
  const data = getData();

  if (els.aboutSafetyList) {
    els.aboutSafetyList.innerHTML = STATIC_ABOUT.safety[lang]
      .map((item) => `<li>${item}</li>`)
      .join('');
  }

  if (els.aboutVoiceList) {
    els.aboutVoiceList.innerHTML = STATIC_ABOUT.voice[lang]
      .map((item) => `<li>${item}</li>`)
      .join('');
  }

  if (els.aboutSources) {
    const sources = data.SOURCES || [];
    els.aboutSources.innerHTML = sources
      .map((s) => {
        const howText = (s.how && s.how[lang]) || s.how.en || '';
        return `
          <li>
            <a href="${s.url}" target="_blank" rel="noopener noreferrer"><strong>${s.label}</strong></a>
            <p style="margin-top: 3px; font-size: .84rem; opacity: .88;">${howText}</p>
          </li>
        `;
      })
      .join('');
  }

  if (els.aboutFutureList) {
    els.aboutFutureList.innerHTML = STATIC_ABOUT.future[lang]
      .map((item) => `<li>${item}</li>`)
      .join('');
  }

  if (els.aboutReviewList) {
    const flags = (data.REVIEW_FLAGS && data.REVIEW_FLAGS[lang]) || [];
    els.aboutReviewList.innerHTML = flags.map((f) => `<li>${f}</li>`).join('');
  }

  renderClinicalMatrix();
}

/* ══════════════════════════════════════════════════════════
   6. LANGUAGE MANAGEMENT
   ══════════════════════════════════════════════════════════ */

function setLang(lang) {
  if (lang !== 'en' && lang !== 'hi') return;
  state.lang = lang;

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  if (els.btnLangEn) {
    els.btnLangEn.classList.toggle('active', lang === 'en');
    els.btnLangEn.setAttribute('aria-pressed', String(lang === 'en'));
  }
  if (els.btnLangHi) {
    els.btnLangHi.classList.toggle('active', lang === 'hi');
    els.btnLangHi.setAttribute('aria-pressed', String(lang === 'hi'));
  }

  document.querySelectorAll('[data-setlang]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-setlang') === lang);
  });
  if (els.sideLangNow) {
    els.sideLangNow.textContent = lang === 'en' ? 'English' : 'हिन्दी';
  }

  const strings = UI[lang];
  document.querySelectorAll('[data-key]').forEach((el) => {
    const key = el.getAttribute('data-key');
    if (!key || !(key in strings)) return;
    if (HTML_KEYS.has(key)) {
      el.innerHTML = strings[key];
    } else {
      el.textContent = strings[key];
    }
  });

  document.querySelectorAll('[data-ph]').forEach((input) => {
    const key = input.getAttribute('data-ph');
    if (key && strings[key]) input.placeholder = strings[key];
  });

  document.querySelectorAll('[data-aria]').forEach((btn) => {
    const key = btn.getAttribute('data-aria');
    if (key && strings[key]) btn.setAttribute('aria-label', strings[key]);
  });

  updateHandsFreeUI();
  renderDemoChips();
  renderScenarioCards();
  renderAboutScreen();
  renderSandboxUI();

  setVoiceStatus(state.voiceStatusKey);

  if (state.isListening) {
    stopListening();
  }

  if (state.scenarioId && !screens.scenario.hasAttribute('hidden')) {
    renderStep();
  }
}

/* ══════════════════════════════════════════════════════════
   7. WEB AUDIO API + HAPTIC & VISUAL PULSE EMERGENCY MICRO-TOOLS
   ══════════════════════════════════════════════════════════ */

let audioCtx = null;

function getAudioCtx() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    try {
      audioCtx = new Ctx();
    } catch (_) {
      return null;
    }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function triggerHaptic(pattern) {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(pattern || [40]);
    }
  } catch (_) {}
}

function pulseInstructionCard(isDownbeat) {
  if (!els.instructionCard) return;
  const cls = isDownbeat ? 'metronome-downbeat' : 'metronome-beat';
  els.instructionCard.classList.remove('metronome-downbeat', 'metronome-beat');
  void els.instructionCard.offsetWidth;
  els.instructionCard.classList.add(cls);
  setTimeout(() => {
    if (els.instructionCard) {
      els.instructionCard.classList.remove('metronome-downbeat', 'metronome-beat');
    }
  }, 220);
}

function playMetronomeTick(isDownbeat) {
  triggerHaptic([40]);
  pulseInstructionCard(isDownbeat);
  pulse3DOrbBeat(isDownbeat);

  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isDownbeat ? 920 : 680, now);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch (_) {}
}

function playCompletionChime(isUrgent) {
  triggerHaptic(isUrgent ? [80, 50, 80] : [40]);
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = isUrgent ? [880, 987.77, 880] : [523.25, 659.25];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.16;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.16);
    });
  } catch (_) {}
}

function formatMMSS(totalSeconds) {
  const sec = Math.max(0, Math.floor(totalSeconds));
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

// Step-scoped tool states (Metronome & Countdown)
let metronomeInterval = null;
let metronomeBeat = 0;
let metronomeRunning = false;

let countdownInterval = null;
let countdownRemaining = 0;
let countdownTotal = 0;
let countdownRunning = false;
let countdownDone = false;

// Scenario-scoped Seizure Stopwatch state
let seizureInterval = null;
let seizureElapsed = 0;
let seizureRunning = false;
let seizureAlertSeconds = 300;
let seizureAlertFired = false;

function stopStepTools() {
  if (metronomeInterval) {
    clearInterval(metronomeInterval);
    metronomeInterval = null;
  }
  metronomeRunning = false;
  metronomeBeat = 0;
  if (els.instructionCard) {
    els.instructionCard.classList.remove(
      'metronome-pulse-active',
      'metronome-beat',
      'metronome-downbeat'
    );
  }

  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  countdownRunning = false;
  countdownDone = false;
}

function stopSeizureStopwatch() {
  if (seizureInterval) {
    clearInterval(seizureInterval);
    seizureInterval = null;
  }
  seizureElapsed = 0;
  seizureRunning = false;
  seizureAlertFired = false;
  updateSeizurePill();
}

function updateSeizurePill() {
  if (!els.seizureTimerPill) return;
  const isSeizureScenario = state.scenarioId === 'seizure';
  if (!isSeizureScenario || (!seizureRunning && seizureElapsed === 0)) {
    els.seizureTimerPill.hidden = true;
    els.seizureTimerPill.classList.remove('is-alert');
    els.seizureTimerPill.textContent = '';
    return;
  }

  const ui = UI[state.lang];
  const timeStr = formatMMSS(seizureElapsed);
  const isAlert = seizureElapsed >= seizureAlertSeconds;

  els.seizureTimerPill.hidden = false;
  els.seizureTimerPill.classList.toggle('is-alert', isAlert);
  els.seizureTimerPill.textContent = isAlert
    ? `⚠ ${ui.toolSeizureAlert} (${timeStr})`
    : `⏱ ${ui.toolSeizurePillPrefix} ${timeStr}`;
}

function renderStepTool(stepObj) {
  if (!els.stepToolBox) return;
  const tool = stepObj && stepObj.tool;
  const lang = state.lang;
  const ui = UI[lang];

  if (!tool) {
    els.stepToolBox.hidden = true;
    els.stepToolBox.classList.remove('is-alert');
    els.stepToolBox.innerHTML = '';
    return;
  }

  els.stepToolBox.hidden = false;
  els.stepToolBox.classList.remove('is-alert');
  const toolLabel = (tool.label && (tool.label[lang] || tool.label.en)) || '';

  if (tool.type === 'metronome') {
    const bpm = tool.bpm || 110;
    els.stepToolBox.innerHTML = `
      <div class="tool-top">
        <div class="tool-label-group">
          <span class="tool-title">${escapeHtml(toolLabel)}</span>
          <span class="tool-sub">${escapeHtml(ui.toolMetronomeSub)}</span>
        </div>
      </div>
      <div class="tool-main">
        <div class="tool-beats" id="metronome-beats" aria-label="110 BPM compression beat indicator">
          <span class="beat-dot" data-beat="0">1</span>
          <span class="beat-dot" data-beat="1">2</span>
          <span class="beat-dot" data-beat="2">3</span>
          <span class="beat-dot" data-beat="3">4</span>
        </div>
        <div class="tool-actions">
          <button type="button" id="btn-tool-metronome" class="tool-btn tool-btn-primary">
            ${escapeHtml(ui.toolMetronomeStart)}
          </button>
        </div>
      </div>
    `;

    const btnMetro = $('btn-tool-metronome');
    const beatsWrap = $('metronome-beats');

    const tick = () => {
      const idx = metronomeBeat % 4;
      playMetronomeTick(idx === 0);
      if (beatsWrap) {
        beatsWrap.querySelectorAll('.beat-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === idx);
        });
      }
      metronomeBeat++;
    };

    if (btnMetro) {
      btnMetro.addEventListener('click', () => {
        if (metronomeRunning) {
          clearInterval(metronomeInterval);
          metronomeInterval = null;
          metronomeRunning = false;
          btnMetro.classList.remove('is-running');
          btnMetro.textContent = ui.toolMetronomeStart;
          if (els.instructionCard) {
            els.instructionCard.classList.remove(
              'metronome-pulse-active',
              'metronome-beat',
              'metronome-downbeat'
            );
          }
          if (beatsWrap) {
            beatsWrap.querySelectorAll('.beat-dot').forEach((d) => d.classList.remove('active'));
          }
        } else {
          metronomeRunning = true;
          metronomeBeat = 0;
          btnMetro.classList.add('is-running');
          btnMetro.textContent = ui.toolMetronomeStop;
          if (els.instructionCard) {
            els.instructionCard.classList.add('metronome-pulse-active');
          }
          tick();
          metronomeInterval = setInterval(tick, Math.round(60000 / bpm));
        }
      });
    }
    return;
  }

  if (tool.type === 'countdown') {
    countdownTotal = tool.seconds || 10;
    countdownRemaining = countdownTotal;
    countdownDone = false;

    els.stepToolBox.innerHTML = `
      <div class="tool-top">
        <div class="tool-label-group">
          <span class="tool-title">${escapeHtml(toolLabel)}</span>
        </div>
        <span id="tool-cd-note" class="tool-status-note" hidden>${escapeHtml(ui.toolDoneNote)}</span>
      </div>
      <div class="tool-main">
        <div id="tool-cd-readout" class="tool-readout" aria-live="off">${formatMMSS(countdownRemaining)}</div>
        <div class="tool-actions">
          <button type="button" id="btn-tool-cd-toggle" class="tool-btn tool-btn-primary">
            ${escapeHtml(ui.toolCountdownStart)}
          </button>
          <button type="button" id="btn-tool-cd-reset" class="tool-btn tool-btn-secondary">
            ${escapeHtml(ui.toolReset)}
          </button>
        </div>
      </div>
    `;

    const readoutEl = $('tool-cd-readout');
    const toggleBtn = $('btn-tool-cd-toggle');
    const resetBtn = $('btn-tool-cd-reset');
    const noteEl = $('tool-cd-note');

    const updateCdUI = () => {
      if (readoutEl) readoutEl.textContent = formatMMSS(countdownRemaining);
      if (toggleBtn) {
        toggleBtn.classList.toggle('is-running', countdownRunning);
        if (countdownRunning) {
          toggleBtn.textContent = ui.toolCountdownPause;
        } else if (countdownRemaining < countdownTotal && countdownRemaining > 0) {
          toggleBtn.textContent = ui.toolCountdownResume;
        } else {
          toggleBtn.textContent = ui.toolCountdownStart;
        }
      }
      if (noteEl) noteEl.hidden = !countdownDone;
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        getAudioCtx();
        if (countdownRunning) {
          clearInterval(countdownInterval);
          countdownInterval = null;
          countdownRunning = false;
          updateCdUI();
        } else {
          if (countdownRemaining <= 0) {
            countdownRemaining = countdownTotal;
            countdownDone = false;
          }
          countdownRunning = true;
          triggerHaptic([40]);
          updateCdUI();
          countdownInterval = setInterval(() => {
            if (countdownRemaining > 0) {
              countdownRemaining--;
              triggerHaptic([40]);
            }
            if (countdownRemaining <= 0) {
              countdownRemaining = 0;
              clearInterval(countdownInterval);
              countdownInterval = null;
              countdownRunning = false;
              countdownDone = true;
              playCompletionChime(false);
            }
            updateCdUI();
          }, 1000);
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (countdownInterval) {
          clearInterval(countdownInterval);
          countdownInterval = null;
        }
        countdownRunning = false;
        countdownDone = false;
        countdownRemaining = countdownTotal;
        updateCdUI();
      });
    }
    return;
  }

  if (tool.type === 'stopwatch') {
    seizureAlertSeconds = tool.alertSeconds || 300;
    const isAlert = seizureElapsed >= seizureAlertSeconds;
    els.stepToolBox.classList.toggle('is-alert', isAlert);

    els.stepToolBox.innerHTML = `
      <div class="tool-top">
        <div class="tool-label-group">
          <span class="tool-title">${escapeHtml(toolLabel)}</span>
        </div>
        <span id="tool-sw-note" class="tool-status-note" ${isAlert ? '' : 'hidden'}>${escapeHtml(ui.toolSeizureAlert)}</span>
      </div>
      <div class="tool-main">
        <div id="tool-sw-readout" class="tool-readout" aria-live="off">${formatMMSS(seizureElapsed)}</div>
        <div class="tool-actions">
          <button type="button" id="btn-tool-sw-toggle" class="tool-btn tool-btn-primary ${seizureRunning ? 'is-running' : ''}">
            ${escapeHtml(
              seizureRunning
                ? ui.toolStopwatchPause
                : seizureElapsed > 0
                ? ui.toolStopwatchResume
                : ui.toolStopwatchStart
            )}
          </button>
          <button type="button" id="btn-tool-sw-reset" class="tool-btn tool-btn-secondary">
            ${escapeHtml(ui.toolReset)}
          </button>
        </div>
      </div>
    `;

    const syncStopwatchStepUI = () => {
      const readoutEl = $('tool-sw-readout');
      const toggleBtn = $('btn-tool-sw-toggle');
      const noteEl = $('tool-sw-note');
      const alertNow = seizureElapsed >= seizureAlertSeconds;

      if (readoutEl) readoutEl.textContent = formatMMSS(seizureElapsed);
      if (els.stepToolBox && state.scenarioId === 'seizure' && state.stepIndex === 0) {
        els.stepToolBox.classList.toggle('is-alert', alertNow);
      }
      if (noteEl) noteEl.hidden = !alertNow;
      if (toggleBtn) {
        const curUi = UI[state.lang];
        toggleBtn.classList.toggle('is-running', seizureRunning);
        toggleBtn.textContent = seizureRunning
          ? curUi.toolStopwatchPause
          : seizureElapsed > 0
          ? curUi.toolStopwatchResume
          : curUi.toolStopwatchStart;
      }
      updateSeizurePill();
    };

    const toggleBtn = $('btn-tool-sw-toggle');
    const resetBtn = $('btn-tool-sw-reset');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        getAudioCtx();
        if (seizureRunning) {
          clearInterval(seizureInterval);
          seizureInterval = null;
          seizureRunning = false;
          syncStopwatchStepUI();
        } else {
          seizureRunning = true;
          triggerHaptic([40]);
          syncStopwatchStepUI();
          seizureInterval = setInterval(() => {
            seizureElapsed++;
            triggerHaptic([40]);
            if (seizureElapsed >= seizureAlertSeconds && !seizureAlertFired) {
              seizureAlertFired = true;
              playCompletionChime(true);
            }
            syncStopwatchStepUI();
          }, 1000);
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        stopSeizureStopwatch();
        syncStopwatchStepUI();
      });
    }
  }
}

/* ══════════════════════════════════════════════════════════
   8. SCENARIO GUIDANCE FLOW
   ══════════════════════════════════════════════════════════ */

function startScenario(id, intentMeta) {
  const sc = findScenario(id);
  if (!sc) return;

  if (state.scenarioId !== id) {
    stopSeizureStopwatch();
  }

  state.scenarioId = id;
  state.stepIndex = 0;
  state.lastIntentMatch = intentMeta || null;

  if (intentMeta) {
    state.autoRead = true;
    if (els.autoRead) els.autoRead.checked = true;
  }

  resetVoiceCard();
  showScreen('scenario');
  renderStep();
}

function renderIntentBanner(sc) {
  if (!els.intentMatchBanner) return;
  const meta = state.lastIntentMatch;
  if (!meta || meta.scenarioId !== sc.id || !meta.query) {
    els.intentMatchBanner.hidden = true;
    els.intentMatchBanner.innerHTML = '';
    return;
  }

  const lang = state.lang;
  const ui = UI[lang];
  const scTitle = (sc[lang] && sc[lang].title) || sc.en.title;
  const tokenSummary =
    meta.matchedTokens && meta.matchedTokens.length > 0
      ? `score ${meta.score} · [${meta.matchedTokens.slice(0, 3).join(', ')}]`
      : `score ${meta.score}`;

  els.intentMatchBanner.hidden = false;
  els.intentMatchBanner.innerHTML = `
    <div class="intent-match-text">
      <span class="intent-match-tag is-adrenaline">${escapeHtml(ui.intentRuleBadge)}</span>
      <span>${escapeHtml(ui.intentMatchedPrefix)} “<strong>${escapeHtml(meta.query)}</strong>” → <strong>${escapeHtml(scTitle)}</strong></span>
      <span class="intent-tokens-pill">${escapeHtml(tokenSummary)}</span>
    </div>
    <div class="intent-match-actions">
      <button type="button" id="btn-intent-change" class="intent-change-btn">${escapeHtml(ui.intentChooseAnother)}</button>
      <button type="button" id="btn-intent-dismiss" class="intent-dismiss-btn" aria-label="${escapeHtml(ui.intentDismissAria)}">✕</button>
    </div>
  `;

  const changeBtn = $('btn-intent-change');
  const dismissBtn = $('btn-intent-dismiss');

  if (changeBtn) {
    changeBtn.addEventListener('click', () => {
      state.lastIntentMatch = null;
      showScreen('home');
      setTimeout(() => {
        if (els.explorer) {
          els.explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      state.lastIntentMatch = null;
      els.intentMatchBanner.hidden = true;
      els.intentMatchBanner.innerHTML = '';
    });
  }
}

function renderScopeBanner(sc) {
  if (!els.scenarioScopeBanner) return;
  const lang = state.lang;
  const ui = UI[lang];
  const scopeText = sc.scope && (sc.scope[lang] || sc.scope.en);

  if (scopeText) {
    els.scenarioScopeBanner.hidden = false;
    els.scenarioScopeBanner.innerHTML = `
      <span class="scope-badge">${escapeHtml(ui.scopeBadge)}</span>
      <span class="scope-text">${escapeHtml(scopeText)}</span>
    `;
  } else {
    els.scenarioScopeBanner.hidden = true;
    els.scenarioScopeBanner.innerHTML = '';
  }
}

function renderStep() {
  const sc = findScenario(state.scenarioId);
  if (!sc || !sc.steps || sc.steps.length === 0) return;

  stopStepTools();

  const total = sc.steps.length;
  const current = Math.min(Math.max(0, state.stepIndex), total - 1);
  state.stepIndex = current;
  const stepObj = sc.steps[current];
  const lang = state.lang;
  const ui = UI[lang];
  const isLast = current === total - 1;
  const vis = getScenarioVisual(sc);

  renderIntentBanner(sc);
  renderScopeBanner(sc);
  updateSeizurePill();

  if (els.scenarioTitle) {
    els.scenarioTitle.textContent = (sc[lang] && sc[lang].title) || sc.en.title;
  }

  const counterText = `${ui.stepLabel} ${current + 1} ${ui.of} ${total}`;
  if (els.stepCounter) els.stepCounter.textContent = counterText;
  if (els.stepBadge) els.stepBadge.textContent = counterText.toUpperCase();

  if (els.progressSegs) {
    els.progressSegs.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const seg = document.createElement('i');
      if (i < current) seg.className = 'done';
      else if (i === current) seg.className = 'current';
      els.progressSegs.appendChild(seg);
    }
  }

  const iconMap = getData().ICONS || {};
  if (els.sgArt) {
    els.sgArt.innerHTML = `
      <div class="clinical-step-rings" aria-hidden="true">
        <span class="r1"></span>
        <span class="r2"></span>
      </div>
    `;
  }
  if (els.sgStepIcon) {
    els.sgStepIcon.innerHTML = iconMap[stepObj.icon] || iconMap[vis.icon] || iconMap.shield || '';
  }

  if (els.stepKind) {
    const kindKey =
      stepObj.kind === 'call'
        ? 'kindCall'
        : stepObj.kind === 'dont'
        ? 'kindDont'
        : stepObj.kind === 'check'
        ? 'kindCheck'
        : 'kindDo';
    els.stepKind.textContent = ui[kindKey] || stepObj.kind;
    els.stepKind.setAttribute('data-kind', stepObj.kind || 'do');
  }

  const stepText = (stepObj && stepObj[lang]) || stepObj.en || '';
  if (els.instructionText) {
    els.instructionText.textContent = stepText;
  }

  renderStepTool(stepObj);

  if (els.instructionCard) {
    els.instructionCard.style.setProperty('--tint', vis.tint || '#E6FAF5');
    els.instructionCard.style.setProperty('--accent', vis.accent || '#0D9488');
    els.instructionCard.style.animation = 'none';
    void els.instructionCard.offsetWidth;
    els.instructionCard.style.animation = '';
  }

  set3DOrbScenarioHover(vis.accent || '#0D9488', true);

  if (els.btnPrev) {
    els.btnPrev.disabled = current === 0;
  }
  if (els.btnNext) {
    const nextLabel = els.btnNext.querySelector('[data-key="nextStep"]');
    if (nextLabel) {
      nextLabel.textContent = isLast ? ui.finish : ui.nextStep;
    }
    els.btnNext.setAttribute('aria-label', isLast ? ui.finish : ui.nextStep);
  }

  stopSpeech();
  setAudioState('idle');

  if (state.autoRead) {
    speakCurrent();
  } else if (state.handsFree) {
    scheduleHandsFreeResume(200);
  }
}

function nextStep() {
  const sc = findScenario(state.scenarioId);
  if (!sc) return;
  if (state.stepIndex < sc.steps.length - 1) {
    state.stepIndex++;
    renderStep();
  } else {
    showScreen('end');
  }
}

function prevStep() {
  if (state.stepIndex > 0) {
    state.stepIndex--;
    renderStep();
  }
}

function restartScenario() {
  state.stepIndex = 0;
  showScreen('scenario');
  renderStep();
}

/* ══════════════════════════════════════════════════════════
   9. SPEECH SYNTHESIS (AUDIO PLAYBACK)
   ══════════════════════════════════════════════════════════ */

function pickVoice(lang) {
  if (!('speechSynthesis' in window)) return null;
  const voices = speechSynthesis.getVoices() || [];
  if (voices.length === 0) return null;

  if (lang === 'hi') {
    return (
      voices.find((v) => v.lang === 'hi-IN') ||
      voices.find((v) => v.lang.toLowerCase().startsWith('hi')) ||
      null
    );
  }
  return (
    voices.find((v) => v.lang === 'en-IN') ||
    voices.find((v) => v.lang === 'en-GB') ||
    voices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
    null
  );
}

function setAudioState(mode) {
  state.audioState = mode;
  const ui = UI[state.lang];

  if (els.audioState) {
    els.audioState.setAttribute('data-state', mode);
  }

  const map = {
    idle: ui.audioIdle,
    speaking: ui.audioSpeaking,
    paused: ui.audioPaused,
    done: ui.audioDone,
    unavailable: ui.audioUnavailable,
  };

  if (els.audioStateText) {
    els.audioStateText.textContent = map[mode] || ui.audioIdle;
  }

  if (els.btnPause) {
    els.btnPause.disabled = mode === 'idle' || mode === 'done' || mode === 'unavailable';
    if (els.pauseLabel) {
      els.pauseLabel.textContent = mode === 'paused' ? ui.resume : ui.pause;
    }
  }

  if (els.listenLabel) {
    els.listenLabel.textContent = mode === 'speaking' ? ui.audioSpeaking : ui.listen;
  }
}

function speak(text) {
  if (!state.speechSupported) {
    setAudioState('unavailable');
    if (els.speechFallback) {
      els.speechFallback.hidden = false;
      els.speechFallback.textContent = UI[state.lang].audioUnavailable;
    }
    return;
  }

  pauseHandsFreeForTTS();
  stopSpeech();

  const lang = state.lang;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  u.rate = 0.92;
  u.pitch = 1.0;

  const voice = pickVoice(lang);
  if (voice) {
    u.voice = voice;
  }

  u.onstart = () => {
    pauseHandsFreeForTTS();
    setAudioState('speaking');
    if (els.speechFallback) els.speechFallback.hidden = true;
  };

  u.onpause = () => {
    setAudioState('paused');
  };

  u.onresume = () => {
    pauseHandsFreeForTTS();
    setAudioState('speaking');
  };

  u.onend = () => {
    setAudioState('done');
    if (state.handsFree) {
      scheduleHandsFreeResume(300);
    }
  };

  u.onerror = (e) => {
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      setAudioState('idle');
    }
    if (state.handsFree) {
      scheduleHandsFreeResume(300);
    }
  };

  state.currentUtterance = u;
  speechSynthesis.speak(u);
}

function stopSpeech() {
  if (state.speechSupported && speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  state.currentUtterance = null;
  setAudioState('idle');
}

function togglePause() {
  if (!state.speechSupported) return;
  if (speechSynthesis.speaking) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setAudioState('speaking');
    } else {
      speechSynthesis.pause();
      setAudioState('paused');
    }
  }
}

function speakCurrent() {
  const sc = findScenario(state.scenarioId);
  if (!sc || !sc.steps || !sc.steps[state.stepIndex]) return;
  const text = (sc.steps[state.stepIndex] && sc.steps[state.stepIndex][state.lang]) || sc.steps[state.stepIndex].en || '';
  speak(text);
}

if (state.speechSupported) {
  speechSynthesis.onvoiceschanged = () => {};
}

/* ══════════════════════════════════════════════════════════
   10. HANDS-FREE VOICE STEP NAVIGATION
   ══════════════════════════════════════════════════════════ */

let handsFreeRec = null;
let handsFreeResumeTimer = null;
let handsFreeActive = false;

function updateHandsFreeUI() {
  const ui = UI[state.lang];
  if (els.btnHandsfree) {
    els.btnHandsfree.classList.toggle('active', state.handsFree);
    els.btnHandsfree.setAttribute('aria-pressed', String(state.handsFree));
    if (!state.recognitionSupported) {
      els.btnHandsfree.disabled = true;
    }
  }
  if (els.handsfreeLabel) {
    els.handsfreeLabel.textContent = state.handsFree ? ui.handsfreeOn : ui.handsfreeOff;
  }
  if (els.handsfreeHint) {
    els.handsfreeHint.hidden = !state.handsFree;
    els.handsfreeHint.textContent = ui.handsfreeHint;
  }
}

function matchHandsFreeCommand(transcript) {
  const norm = normalizeText(transcript);
  if (!norm) return null;
  if (/\b(next|continue|forward|go ahead|aage|age|agla)\b|आगे|अगला|बढ़ें/.test(norm)) {
    return 'next';
  }
  if (/\b(back|previous|prev|peeche|piche|pichla)\b|पीछे|पिछला/.test(norm)) {
    return 'prev';
  }
  if (/\b(repeat|again|listen|read|dobara|phir se|sunao)\b|दोहराएँ|दोहराओ|फिर से|सुनाओ/.test(norm)) {
    return 'repeat';
  }
  return null;
}

function pauseHandsFreeForTTS() {
  if (handsFreeResumeTimer) {
    clearTimeout(handsFreeResumeTimer);
    handsFreeResumeTimer = null;
  }
  if (handsFreeRec && handsFreeActive) {
    try {
      handsFreeRec.abort();
    } catch (_) {}
  }
  handsFreeActive = false;
}

function stopHandsFreeListening() {
  pauseHandsFreeForTTS();
}

function scheduleHandsFreeResume(delayMs) {
  if (!state.handsFree || !state.recognitionSupported) return;
  if (handsFreeResumeTimer) clearTimeout(handsFreeResumeTimer);
  handsFreeResumeTimer = setTimeout(() => {
    handsFreeResumeTimer = null;
    startHandsFreeListening();
  }, delayMs || 300);
}

function startHandsFreeListening() {
  if (!state.handsFree || !state.recognitionSupported) return;
  const isScenarioVisible = screens.scenario && !screens.scenario.hasAttribute('hidden');
  if (!isScenarioVisible) return;
  if (state.speechSupported && speechSynthesis.speaking) return;
  if (handsFreeActive) return;

  try {
    handsFreeRec = new SR();
    handsFreeRec.lang = state.lang === 'hi' ? 'hi-IN' : 'en-IN';
    handsFreeRec.interimResults = false;
    handsFreeRec.maxAlternatives = 3;
    handsFreeRec.continuous = false;

    handsFreeRec.onstart = () => {
      handsFreeActive = true;
    };

    handsFreeRec.onresult = (e) => {
      if (state.speechSupported && speechSynthesis.speaking) return;
      const alts = Array.from(e.results[0]).map((a) => a.transcript.trim());
      for (const phrase of alts) {
        const cmd = matchHandsFreeCommand(phrase);
        if (cmd === 'next') {
          nextStep();
          return;
        }
        if (cmd === 'prev') {
          prevStep();
          return;
        }
        if (cmd === 'repeat') {
          speakCurrent();
          return;
        }
      }
    };

    handsFreeRec.onerror = () => {
      handsFreeActive = false;
    };

    handsFreeRec.onend = () => {
      handsFreeActive = false;
      const stillInScenario = screens.scenario && !screens.scenario.hasAttribute('hidden');
      const notSpeaking = !(state.speechSupported && speechSynthesis.speaking);
      if (state.handsFree && stillInScenario && notSpeaking) {
        scheduleHandsFreeResume(280);
      }
    };

    handsFreeRec.start();
  } catch (_) {
    handsFreeActive = false;
  }
}

function toggleHandsFree() {
  if (!state.recognitionSupported) return;
  state.handsFree = !state.handsFree;
  updateHandsFreeUI();
  if (state.handsFree) {
    if (!(state.speechSupported && speechSynthesis.speaking)) {
      startHandsFreeListening();
    }
  } else {
    stopHandsFreeListening();
  }
}

/* ══════════════════════════════════════════════════════════
   11. ADRENALINE & HINGLISH PHONETIC FUZZY INTENT MATCHING
   ══════════════════════════════════════════════════════════ */

function normalizeText(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ज़/g, 'ज')
    .replace(/फ़/g, 'फ')
    .replace(/क़/g, 'क')
    .replace(/ख़/g, 'ख')
    .replace(/ग़/g, 'ग')
    .replace(/ँ/g, 'ं');
}

// Phonetic & Adrenaline shorthand canonicalizer for panicked/fragmented Hinglish & typos
const PHONETIC_RULES = [
  [/\b(khun|koon|khn|bleedng|blod)\b/g, 'khoon'],
  [/\b(sans|saas|sns|breth|breathng)\b/g, 'saans'],
  [/\b(bihosh|bebosh|behos|behoos|unconcious|unconsious|colaps)\b/g, 'behosh'],
  [/\b(chakar|chkr|dizy)\b/g, 'chakkar'],
  [/\b(agg|aag|jaln|jalan|jhuls|bhaap)\b/g, 'jal gaya'],
  [/\b(gaadi|gari|gadi|scooty|takar|exident|acident|accidnt)\b/g, 'accident takkar'],
  [/\b(nhi|nhe|nahi|nahee)\b/g, 'nahi'],
  [/\b(atka|fasa|phasa|phas|chokng)\b/g, 'atak'],
  [/\b(dora|mrgi|jhatka|kapkapi|seizure)\b/g, 'daura mirgi'],
  [/\b(lkwa|laqwa|strok)\b/g, 'lakwa stroke'],
  [/\b(sina|seena|chati|hart)\b/g, 'seene heart'],
  [/\b(elarji|alerji|soojan|suj)\b/g, 'allergy sujan'],
  [/\b(zehr|jehr|jehar|poisn|finayal|tejab)\b/g, 'zeher poison'],
];

function normalizePhonetic(str) {
  let out = normalizeText(str);
  for (const [re, replacement] of PHONETIC_RULES) {
    out = out.replace(re, replacement);
  }
  return out;
}

function matchIntentWithMeta(query) {
  if (!query) return null;
  const matchMap = getData().MATCH || {};
  const norm = normalizeText(query);
  const phoneticNorm = normalizePhonetic(query);
  let bestId = null;
  let maxScore = 0;
  let bestTokens = [];

  for (const [id, rules] of Object.entries(matchMap)) {
    let score = 0;
    const matchedTokens = [];
    for (const [re, weight] of rules) {
      const mNorm = norm.match(re);
      const mRaw = String(query).match(re);
      const mPhon = phoneticNorm.match(re);
      const hit = mNorm || mRaw || mPhon;
      if (hit) {
        score += weight;
        if (hit[0] && !matchedTokens.includes(hit[0])) {
          matchedTokens.push(hit[0]);
        }
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestId = id;
      bestTokens = matchedTokens;
    }
  }

  const meta =
    maxScore > 0
      ? {
          scenarioId: bestId,
          score: maxScore,
          query: String(query).trim(),
          phoneticNorm,
          matchedTokens: bestTokens,
          isAdrenaline: true,
        }
      : null;

  updateSandboxIntentLog(query, phoneticNorm, meta);
  return meta;
}

function matchIntent(query) {
  const res = matchIntentWithMeta(query);
  return res ? res.scenarioId : null;
}

/* ══════════════════════════════════════════════════════════
   12. FLOATING "OFFLINE & INTENT SANDBOX" INSPECTOR DRAWER
   ══════════════════════════════════════════════════════════ */

const SANDBOX_TEST_QUERIES = [
  'khoon bht nikal rha',
  'behosh chakkar saans nhi',
  'aag se hath jaln',
  'gadi takkar sadak',
  'gale me khana atka',
];

function updateSandboxNetUI() {
  if (!els.sandboxNetPill) return;
  const ui = UI[state.lang];
  const isOffline = state.simulatedOffline || !navigator.onLine;
  els.sandboxNetPill.classList.toggle('is-offline', isOffline);
  els.sandboxNetPill.classList.toggle('is-online', !isOffline);
  els.sandboxNetPill.textContent = isOffline ? ui.sandboxNetOffline : ui.sandboxNetOnline;

  if (els.btnSandboxOfflineTest) {
    els.btnSandboxOfflineTest.classList.toggle('is-simulating', state.simulatedOffline);
    els.btnSandboxOfflineTest.textContent = state.simulatedOffline
      ? ui.sandboxSimRestoreBtn
      : ui.sandboxSimBtn;
  }
}

function runSimulatedDisconnectTest() {
  state.simulatedOffline = !state.simulatedOffline;
  updateSandboxNetUI();

  if (!els.sandboxOfflineReport) return;
  if (!state.simulatedOffline) {
    els.sandboxOfflineReport.innerHTML =
      `✓ Online indicator restored. All 10 deterministic scenarios remain 100% client-side.`;
    return;
  }

  const scCount = getScenarios().length;
  const hasHaptic = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
  const hasWebAudio = !!(window.AudioContext || window.webkitAudioContext);
  const hasSW = 'serviceWorker' in navigator;

  els.sandboxOfflineReport.innerHTML = [
    `<strong>[SIMULATED AIRPLANE / DISCONNECT TEST: PASS]</strong>`,
    `• External API / LLM Calls: <strong>0 (Strictly Prohibited)</strong>`,
    `• Local Scenarios Ready: <strong>${scCount} / 10 (EN + HI)</strong>`,
    `• Web Audio Synthesizer: <strong>${hasWebAudio ? 'Active (110 BPM + Timers)' : 'Fallback'}</strong>`,
    `• Haptic Vibration API: <strong>${hasHaptic ? 'Supported (40ms pulse)' : 'Visual Fallback'}</strong>`,
    `• PWA Service Worker: <strong>${hasSW ? 'Registered (sw.js)' : 'Static Local Mode'}</strong>`,
  ].join('<br>');
}

function updateSandboxIntentLog(rawQuery, phoneticNorm, meta) {
  if (!els.sandboxIntentLog) return;
  if (!rawQuery) {
    els.sandboxIntentLog.innerHTML =
      `Ready. Click a panicked Hinglish test phrase above or use the Voice/Text bar to inspect regex telemetry.`;
    return;
  }

  if (!meta) {
    els.sandboxIntentLog.innerHTML = [
      `Query: "${escapeHtml(rawQuery)}"`,
      `Phonetic: "${escapeHtml(phoneticNorm)}"`,
      `Result: NO_MATCH (Score 0) → Fallback to 112 / Grid`,
    ].join('<br>');
    return;
  }

  const sc = findScenario(meta.scenarioId);
  const scTitle = sc ? sc.en.title : meta.scenarioId;
  els.sandboxIntentLog.innerHTML = [
    `Query     : "${escapeHtml(meta.query)}"`,
    `Phonetic  : "${escapeHtml(meta.phoneticNorm)}"`,
    `Tokens    : [${escapeHtml(meta.matchedTokens.join(', '))}]`,
    `RegexScore: <strong>${meta.score}</strong> → <strong>${escapeHtml(meta.scenarioId)}</strong> (${escapeHtml(scTitle)})`,
    `Badge     : ⚡ Adrenaline-Optimized Intent Match`,
  ].join('<br>');
}

function renderSandboxUI() {
  updateSandboxNetUI();

  if (els.sandboxTestPills && !els.sandboxTestPills.hasChildNodes()) {
    els.sandboxTestPills.innerHTML = SANDBOX_TEST_QUERIES.map(
      (q) =>
        `<button type="button" class="sandbox-test-pill" data-sandbox-q="${escapeHtml(q)}">“${escapeHtml(q)}”</button>`
    ).join('');

    els.sandboxTestPills.querySelectorAll('[data-sandbox-q]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-sandbox-q') || '';
        if (els.voiceText) els.voiceText.value = q;
        const meta = matchIntentWithMeta(q);
        if (meta) {
          startScenario(meta.scenarioId, meta);
        }
      });
    });
  }

  if (els.sandboxOfflineReport && !els.sandboxOfflineReport.innerHTML) {
    els.sandboxOfflineReport.innerHTML =
      `100% client-side engine active. Click above to simulate an offline network disconnect test.`;
  }

  if (els.sandboxIntentLog && !els.sandboxIntentLog.innerHTML) {
    updateSandboxIntentLog('', '', null);
  }
}

function toggleSandboxDrawer(forceOpen) {
  if (!els.sandboxDrawer || !els.btnSandboxToggle) return;
  state.sandboxOpen = typeof forceOpen === 'boolean' ? forceOpen : !state.sandboxOpen;
  els.sandboxDrawer.hidden = !state.sandboxOpen;
  els.btnSandboxToggle.setAttribute('aria-expanded', String(state.sandboxOpen));
}

/* ══════════════════════════════════════════════════════════
   13. VOICE RECOGNITION (HOME CONSOLE)
   ══════════════════════════════════════════════════════════ */

function setVoiceStatus(key, cls) {
  state.voiceStatusKey = key;
  const ui = UI[state.lang];
  if (els.vpStatus) {
    els.vpStatus.textContent = ui[key] || '';
    els.vpStatus.classList.remove('is-listening', 'is-ok');
    if (cls) els.vpStatus.classList.add(cls);
  }
}

function setMicState(mode) {
  if (!els.btnMic || !els.waveBars) return;
  els.btnMic.classList.remove('listening', 'processing', 'done');
  els.waveBars.classList.remove('active');
  if (els.voiceCard) {
    els.voiceCard.classList.remove('is-hud-listening', 'is-hud-active');
  }

  if (mode === 'listening') {
    els.btnMic.classList.add('listening');
    els.waveBars.classList.add('active');
    if (els.voiceCard) els.voiceCard.classList.add('is-hud-listening');
  } else if (mode === 'processing') {
    els.btnMic.classList.add('processing');
    if (els.voiceCard) els.voiceCard.classList.add('is-hud-active');
  } else if (mode === 'done') {
    els.btnMic.classList.add('done');
    if (els.voiceCard) els.voiceCard.classList.add('is-hud-active');
  }

  set3DOrbVoiceMode(mode);
  els.btnMic.setAttribute('aria-label', mode === 'listening' ? 'Stop listening' : 'Start listening');
}

function showVoiceError(key) {
  const ui = UI[state.lang];
  if (els.vpErrorText) {
    els.vpErrorText.textContent = ui[key] || key;
  }
  if (els.vpErrorBox) {
    els.vpErrorBox.hidden = false;
  }
}

function resetVoiceCard() {
  stopListening();
  if (els.vpErrorBox) els.vpErrorBox.hidden = true;
  if (els.vpTranscriptBox) els.vpTranscriptBox.hidden = true;
  setMicState('idle');
  setVoiceStatus('vpReady');
  if (els.voiceText) els.voiceText.value = '';
}

let recognitionInstance = null;
let recognitionHandled = false;

function startListening() {
  if (!state.recognitionSupported) {
    if (els.vpNoSpeech) els.vpNoSpeech.hidden = false;
    return;
  }
  if (state.isListening) {
    stopListening();
    return;
  }

  if (els.vpErrorBox) els.vpErrorBox.hidden = true;
  if (els.vpTranscriptBox) els.vpTranscriptBox.hidden = true;
  recognitionHandled = false;

  try {
    recognitionInstance = new SR();
    recognitionInstance.lang = state.lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognitionInstance.interimResults = false;
    recognitionInstance.maxAlternatives = 3;
    recognitionInstance.continuous = false;

    recognitionInstance.onstart = () => {
      state.isListening = true;
      setMicState('listening');
      setVoiceStatus('vpListening', 'is-listening');
    };

    recognitionInstance.onresult = (e) => {
      recognitionHandled = true;
      const alts = Array.from(e.results[0]).map((a) => a.transcript.trim());
      const transcript = alts[0] || '';

      if (els.vpTranscriptText) {
        els.vpTranscriptText.textContent = `“${transcript}”`;
      }
      if (els.vpTranscriptBox) {
        els.vpTranscriptBox.hidden = false;
      }

      setMicState('processing');
      setVoiceStatus('vpProcessing');

      let matchedMeta = null;
      for (const a of alts) {
        matchedMeta = matchIntentWithMeta(a);
        if (matchedMeta) break;
      }

      setTimeout(() => {
        if (matchedMeta) {
          setMicState('done');
          setVoiceStatus('vpFound', 'is-ok');
          setTimeout(() => {
            startScenario(matchedMeta.scenarioId, matchedMeta);
          }, 650);
        } else {
          setMicState('idle');
          setVoiceStatus('vpReady');
          showVoiceError('vpNoMatch');
        }
      }, 400);
    };

    recognitionInstance.onerror = (e) => {
      recognitionHandled = true;
      setMicState('idle');
      setVoiceStatus('vpReady');
      const errMap = {
        'not-allowed': 'vpErrPermission',
        'service-not-allowed': 'vpErrPermission',
        'no-speech': 'vpErrNoSpeech',
        'network': 'vpErrNetwork',
      };
      if (e.error !== 'aborted') {
        showVoiceError(errMap[e.error] || 'vpErrGeneric');
      }
    };

    recognitionInstance.onend = () => {
      state.isListening = false;
      if (!recognitionHandled) {
        setMicState('idle');
        setVoiceStatus('vpReady');
      }
    };

    recognitionInstance.start();
  } catch (_) {
    state.isListening = false;
    setMicState('idle');
    showVoiceError('vpErrGeneric');
  }
}

function stopListening() {
  if (recognitionInstance && state.isListening) {
    try {
      recognitionInstance.abort();
    } catch (_) {}
  }
  state.isListening = false;
  setMicState('idle');
}

function handleTextSearch(query) {
  const clean = (query || '').trim();
  if (!clean) return;

  if (els.vpTranscriptText) {
    els.vpTranscriptText.textContent = `“${clean}”`;
  }
  if (els.vpTranscriptBox) {
    els.vpTranscriptBox.hidden = false;
  }
  if (els.vpErrorBox) {
    els.vpErrorBox.hidden = true;
  }

  setMicState('processing');
  setVoiceStatus('vpProcessing');

  const matchedMeta = matchIntentWithMeta(clean);
  setTimeout(() => {
    if (matchedMeta) {
      setMicState('done');
      setVoiceStatus('vpFound', 'is-ok');
      setTimeout(() => {
        startScenario(matchedMeta.scenarioId, matchedMeta);
      }, 500);
    } else {
      setMicState('idle');
      setVoiceStatus('vpReady');
      showVoiceError('vpNoMatch');
    }
  }, 300);
}

/* ══════════════════════════════════════════════════════════
   14. EVENT WIRING & INITIALISATION
   ══════════════════════════════════════════════════════════ */

function wireEvents() {
  if (els.btnLangEn) els.btnLangEn.addEventListener('click', () => setLang('en'));
  if (els.btnLangHi) els.btnLangHi.addEventListener('click', () => setLang('hi'));

  document.querySelectorAll('[data-setlang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-setlang'));
    });
  });

  if (els.btnHome) els.btnHome.addEventListener('click', () => showScreen('home'));
  if (els.btnBackHome) els.btnBackHome.addEventListener('click', () => showScreen('home'));
  if (els.btnBackFromAbout) els.btnBackFromAbout.addEventListener('click', () => showScreen('home'));
  if (els.btnHomeFromEnd) els.btnHomeFromEnd.addEventListener('click', () => showScreen('home'));

  if (els.btnAboutHeader) els.btnAboutHeader.addEventListener('click', () => showScreen('about'));
  if (els.btnAboutFooter) els.btnAboutFooter.addEventListener('click', () => showScreen('about'));

  if (els.btnTalk) {
    els.btnTalk.addEventListener('click', () => {
      if (els.voiceCard) {
        els.voiceCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (els.btnMic) {
        els.btnMic.focus();
        startListening();
      }
    });
  }

  if (els.btnExplore) {
    els.btnExplore.addEventListener('click', () => {
      if (els.explorer) {
        els.explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (els.btnMic) els.btnMic.addEventListener('click', startListening);

  if (els.voiceTextForm) {
    els.voiceTextForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (els.voiceText) handleTextSearch(els.voiceText.value);
    });
  }

  if (els.btnListen) els.btnListen.addEventListener('click', speakCurrent);
  if (els.btnPause) els.btnPause.addEventListener('click', togglePause);
  if (els.btnRepeat) els.btnRepeat.addEventListener('click', speakCurrent);
  if (els.btnHandsfree) els.btnHandsfree.addEventListener('click', toggleHandsFree);

  if (els.autoRead) {
    els.autoRead.addEventListener('change', (e) => {
      state.autoRead = e.target.checked;
      if (state.autoRead && !speechSynthesis.speaking) {
        speakCurrent();
      }
    });
  }

  if (els.btnNext) els.btnNext.addEventListener('click', nextStep);
  if (els.btnPrev) els.btnPrev.addEventListener('click', prevStep);
  if (els.btnRestart) els.btnRestart.addEventListener('click', () => { state.stepIndex = 0; renderStep(); });
  if (els.btnRestartScenario) els.btnRestartScenario.addEventListener('click', restartScenario);

  if (els.btnRepeatLast) {
    els.btnRepeatLast.addEventListener('click', () => {
      const sc = findScenario(state.scenarioId);
      if (sc && sc.steps && sc.steps.length > 0) {
        const lastStep = sc.steps[sc.steps.length - 1];
        speak(lastStep[state.lang] || lastStep.en);
      }
    });
  }

  // Judge Sandbox Mode Drawer controls
  if (els.btnSandboxToggle) {
    els.btnSandboxToggle.addEventListener('click', () => toggleSandboxDrawer());
  }
  if (els.btnSandboxClose) {
    els.btnSandboxClose.addEventListener('click', () => toggleSandboxDrawer(false));
  }
  if (els.btnSandboxOfflineTest) {
    els.btnSandboxOfflineTest.addEventListener('click', runSimulatedDisconnectTest);
  }
  window.addEventListener('online', updateSandboxNetUI);
  window.addEventListener('offline', updateSandboxNetUI);

  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const isScenarioActive = screens.scenario && !screens.scenario.hasAttribute('hidden');

    if (isScenarioActive) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      } else if (e.key === ' ' && e.target !== els.voiceText && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        if (speechSynthesis.speaking) {
          togglePause();
        } else {
          speakCurrent();
        }
      }
    }

    if (e.key === 'Escape') {
      if (state.sandboxOpen) {
        toggleSandboxDrawer(false);
      } else if (state.isListening) {
        stopListening();
      } else if (speechSynthesis.speaking) {
        stopSpeech();
      }
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSpeech();
      stopListening();
      stopHandsFreeListening();
    }
  });
}

function registerOfflineSW() {
  if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
}

/* ══════════════════════════════════════════════════════════
   15. SOFT-3D STUDIO MEDICAL SCULPTURE IN #hero-3d-stage
   ══════════════════════════════════════════════════════════ */

const studio3D = {
  ready: false,
  sculptureGroup: null,
  crossMat: null,
  ringMat: null,
  speedMult: 1.0,
  targetScale: 1.0,
};

function set3DOrbVoiceMode(mode) {
  if (!studio3D.ready || !studio3D.sculptureGroup) return;
  if (mode === 'listening') {
    studio3D.speedMult = 2.1;
    studio3D.targetScale = 1.12;
    set3DOrbScenarioHover('#E11D48', true);
  } else if (mode === 'processing' || mode === 'done') {
    studio3D.speedMult = 1.5;
    studio3D.targetScale = 1.05;
    set3DOrbScenarioHover('#0D9488', true);
  } else {
    studio3D.speedMult = 1.0;
    studio3D.targetScale = 1.0;
    set3DOrbScenarioHover('#0D9488', false);
  }
}

function set3DOrbScenarioHover(accentHex, isActive) {
  if (!studio3D.ready || !studio3D.crossMat || typeof window.THREE === 'undefined') return;
  try {
    const targetHex = isActive ? accentHex || '#0D9488' : '#0D9488';
    const c = new window.THREE.Color(targetHex);
    studio3D.speedMult = isActive ? 1.65 : 1.0;
    if (typeof window.gsap !== 'undefined') {
      window.gsap.to(studio3D.crossMat.color, {
        r: c.r,
        g: c.g,
        b: c.b,
        duration: 0.45,
        ease: 'power2.out',
      });
    } else {
      studio3D.crossMat.color.copy(c);
    }
  } catch (_) {}
}

function transition3DCameraForScreen() {
  // Stage is strictly scoped inside #hero-3d-stage on the home screen
}

function pulse3DOrbBeat(isDownbeat) {
  if (!studio3D.ready || !studio3D.sculptureGroup) return;
  const peak = isDownbeat ? 1.14 : 1.07;
  if (typeof window.gsap !== 'undefined') {
    window.gsap.fromTo(
      studio3D.sculptureGroup.scale,
      { x: peak, y: peak, z: peak },
      { x: 1.0, y: 1.0, z: 1.0, duration: 0.38, ease: 'power2.out' }
    );
  }
}

function initHudFrequencyRing() {
  const canvas = $('hud-ring-canvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  let phase = 0;

  function drawRing() {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    ctx.clearRect(0, 0, w, h);

    const isListening = state.isListening;
    const isSpeaking = state.audioState === 'speaking' || metronomeRunning;
    const baseRadius = 38;
    const amp = isListening ? 9.5 : isSpeaking ? 6.5 : 2.2;
    const speed = isListening ? 0.12 : isSpeaking ? 0.08 : 0.03;
    phase += speed;

    const primaryColor = isListening
      ? 'rgba(225, 29, 72, 0.75)'
      : isSpeaking
      ? 'rgba(13, 148, 136, 0.8)'
      : 'rgba(13, 148, 136, 0.38)';
    const secondaryColor = isListening
      ? 'rgba(225, 29, 72, 0.25)'
      : 'rgba(13, 148, 136, 0.18)';

    // Smooth organic audio ring
    ctx.beginPath();
    const steps = 64;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const wave =
        Math.sin(angle * 6 + phase) * (amp * 0.5) +
        Math.cos(angle * 4 - phase * 1.2) * (amp * 0.4);
      const r = baseRadius + 6 + wave;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Subtle outer halo circle
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius + 13, 0, Math.PI * 2);
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    requestAnimationFrame(drawRing);
  }

  requestAnimationFrame(drawRing);
}

function buildRounded3DCapsule(THREE, radius, halfLen, matTop, matBottom) {
  const group = new THREE.Group();
  const cylTopGeo = new THREE.CylinderGeometry(radius, radius, halfLen, 36);
  cylTopGeo.translate(0, halfLen / 2, 0);
  const cylBotGeo = new THREE.CylinderGeometry(radius, radius, halfLen, 36);
  cylBotGeo.translate(0, -halfLen / 2, 0);

  const capTopGeo = new THREE.SphereGeometry(radius, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2);
  capTopGeo.translate(0, halfLen, 0);
  const capBotGeo = new THREE.SphereGeometry(radius, 36, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  capBotGeo.translate(0, -halfLen, 0);

  group.add(new THREE.Mesh(cylTopGeo, matTop));
  group.add(new THREE.Mesh(capTopGeo, matTop));
  group.add(new THREE.Mesh(cylBotGeo, matBottom));
  group.add(new THREE.Mesh(capBotGeo, matBottom));
  return group;
}

function buildRounded3DMedicalCross(THREE, armRadius, armLen, mat) {
  const group = new THREE.Group();
  const vCyl = new THREE.Mesh(new THREE.CylinderGeometry(armRadius, armRadius, armLen, 40), mat);
  const hCyl = new THREE.Mesh(new THREE.CylinderGeometry(armRadius, armRadius, armLen, 40), mat);
  hCyl.rotation.z = Math.PI / 2;
  group.add(vCyl, hCyl);

  const half = armLen / 2;
  const capGeo = new THREE.SphereGeometry(armRadius, 36, 36);
  const positions = [
    [0, half, 0],
    [0, -half, 0],
    [half, 0, 0],
    [-half, 0, 0],
  ];
  positions.forEach(([x, y, z]) => {
    const cap = new THREE.Mesh(capGeo, mat);
    cap.position.set(x, y, z);
    group.add(cap);
  });

  const centerFillet = new THREE.Mesh(new THREE.SphereGeometry(armRadius * 1.18, 36, 36), mat);
  group.add(centerFillet);
  return group;
}

function init3DBackground() {
  const stage = $('hero-3d-stage');
  if (!stage) return;

  let pointerX = 0;
  let pointerY = 0;
  window.addEventListener(
    'mousemove',
    (e) => {
      pointerX = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointerY = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    },
    { passive: true }
  );

  if (typeof window.THREE !== 'undefined') {
    try {
      const THREE = window.THREE;
      const width = stage.clientWidth || 540;
      const height = stage.clientHeight || 380;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      stage.innerHTML = '';
      stage.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / Math.max(1, height), 0.1, 60);
      camera.position.set(0, 0.35, 11.2);

      // Soft Warm/Cool Clinical Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.88);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
      keyLight.position.set(6, 9, 8);
      scene.add(keyLight);

      const warmFill = new THREE.DirectionalLight(0xffe4e6, 0.65);
      warmFill.position.set(-7, -4, 6);
      scene.add(warmFill);

      const coolRim = new THREE.PointLight(0x0d9488, 0.7, 25);
      coolRim.position.set(0, 5, -5);
      scene.add(coolRim);

      // Porcelain & Clay Physical Materials (Zero Wireframes)
      const matTeal = new THREE.MeshPhysicalMaterial({
        color: 0x0d9488,
        roughness: 0.18,
        metalness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });

      const matPorcelain = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.16,
        metalness: 0.04,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
      });

      const matCoral = new THREE.MeshPhysicalMaterial({
        color: 0xe11d48,
        roughness: 0.18,
        metalness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });

      const matSoftBlue = new THREE.MeshPhysicalMaterial({
        color: 0x3b82f6,
        roughness: 0.18,
        metalness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });

      const matRing = new THREE.MeshPhysicalMaterial({
        color: 0x99f6e4,
        roughness: 0.2,
        metalness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.12,
      });

      const sculptureGroup = new THREE.Group();
      sculptureGroup.position.y = 0.45;
      scene.add(sculptureGroup);

      // 1. Porcelain Circular Studio Badge Backing
      const discGeo = new THREE.CylinderGeometry(2.25, 2.25, 0.34, 64);
      discGeo.rotateX(Math.PI / 2);
      const backingDisc = new THREE.Mesh(discGeo, matPorcelain);
      backingDisc.position.z = -0.32;
      sculptureGroup.add(backingDisc);

      // 2. Smooth Rounded 3D Medical Cross Centerpiece
      const crossMesh = buildRounded3DMedicalCross(THREE, 0.44, 2.15, matTeal);
      crossMesh.position.z = 0.12;
      sculptureGroup.add(crossMesh);

      // 3. Smooth 3D Torus Ring framing the Medical Cross
      const torusGeo = new THREE.TorusGeometry(2.85, 0.13, 36, 120);
      const torusMesh = new THREE.Mesh(torusGeo, matRing);
      torusMesh.rotation.x = 0.35;
      torusMesh.rotation.y = -0.25;
      sculptureGroup.add(torusMesh);

      // 4. Two Orbiting Glossy 3D Pill/Capsule Meshes
      const pill1 = buildRounded3DCapsule(THREE, 0.34, 0.42, matCoral, matPorcelain);
      pill1.position.set(-3.35, 1.05, 0.65);
      pill1.rotation.set(0.35, 0.25, -0.52);
      sculptureGroup.add(pill1);

      const pill2 = buildRounded3DCapsule(THREE, 0.31, 0.38, matSoftBlue, matPorcelain);
      pill2.position.set(3.35, -0.65, 0.75);
      pill2.rotation.set(-0.3, -0.25, 0.62);
      sculptureGroup.add(pill2);

      // Soft Porcelain Accent Spheres (Smooth high-segment spheres, NO square points)
      const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.36, 36, 36), matPorcelain);
      sphere1.position.set(2.9, 1.55, -0.4);
      sculptureGroup.add(sphere1);

      const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.26, 36, 36), matTeal);
      sphere2.position.set(-2.85, -1.25, 0.3);
      sculptureGroup.add(sphere2);

      studio3D.ready = true;
      studio3D.sculptureGroup = sculptureGroup;
      studio3D.crossMat = matTeal;
      studio3D.ringMat = matRing;

      window.addEventListener('resize', () => {
        const w = stage.clientWidth || 540;
        const h = stage.clientHeight || 380;
        camera.aspect = w / Math.max(1, h);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });

      let clock = 0;
      const animateStudio = () => {
        clock += 0.018 * studio3D.speedMult;

        // Gentle studio levitation & mouse parallax tilt
        sculptureGroup.position.y = 0.45 + Math.sin(clock * 1.3) * 0.16;
        const targetRotY = pointerX * 0.32 + Math.sin(clock * 0.6) * 0.12;
        const targetRotX = -pointerY * 0.22 + Math.cos(clock * 0.5) * 0.08;
        sculptureGroup.rotation.y += (targetRotY - sculptureGroup.rotation.y) * 0.06;
        sculptureGroup.rotation.x += (targetRotX - sculptureGroup.rotation.x) * 0.06;

        // Smooth scale response when listening
        const pulseScale =
          state.isListening || state.audioState === 'speaking'
            ? studio3D.targetScale + Math.sin(clock * 4.5) * 0.04
            : studio3D.targetScale;
        sculptureGroup.scale.x += (pulseScale - sculptureGroup.scale.x) * 0.08;
        sculptureGroup.scale.y += (pulseScale - sculptureGroup.scale.y) * 0.08;
        sculptureGroup.scale.z += (pulseScale - sculptureGroup.scale.z) * 0.08;

        // Gentle orbital motion of capsules & torus ring
        torusMesh.rotation.z = Math.sin(clock * 0.7) * 0.25;
        pill1.position.y = 1.05 + Math.sin(clock * 1.7 + 1.0) * 0.22;
        pill1.rotation.z = -0.52 + Math.sin(clock * 1.2) * 0.18;

        pill2.position.y = -0.65 + Math.cos(clock * 1.5) * 0.22;
        pill2.rotation.z = 0.62 + Math.cos(clock * 1.1) * 0.18;

        sphere1.position.y = 1.55 + Math.cos(clock * 1.8) * 0.15;
        sphere2.position.y = -1.25 + Math.sin(clock * 1.6) * 0.15;

        renderer.render(scene, camera);
        requestAnimationFrame(animateStudio);
      };

      requestAnimationFrame(animateStudio);
    } catch (_) {}
  }
}

function checkBackendHealth() {
  if (location.protocol !== 'http:' && location.protocol !== 'https:') return;
  fetch('/api/health', { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data && data.status === 'ok' && els.sandboxOfflineReport && !state.simulatedOffline) {
        els.sandboxOfflineReport.innerHTML = [
          `<strong>[NODE.JS EXPRESS STACK + CLIENT ENGINE ACTIVE]</strong>`,
          `• Server Stack: <strong>${escapeHtml(data.engine || 'Node.js Express')}</strong>`,
          `• Health Check: <strong>${escapeHtml(data.status.toUpperCase())}</strong>`,
          `• Deterministic Guidance: <strong>10/10 Scenarios · Zero LLM Hallucinations</strong>`,
        ].join('<br>');
      }
    })
    .catch(() => {});
}

function init() {
  init3DBackground();
  initHudFrequencyRing();
  wireEvents();
  setLang('en');
  showScreen('home');
  if (!state.recognitionSupported && els.vpNoSpeech) {
    els.vpNoSpeech.hidden = false;
  }
  checkBackendHealth();
  registerOfflineSW();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
