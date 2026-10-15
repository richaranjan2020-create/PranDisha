/**
 * app.js — PranDisha Emergency First-Aid Assistant (v3.0)
 *
 * Vanilla JavaScript:
 * - 10 source-verified demonstration scenarios in English & Hindi
 * - Seamless screen routing (Home, Scenario Guidance, End, About & Safety)
 * - Dynamic card rendering with art, badges, and step counters
 * - Web Speech API: Text-to-speech with play, pause, resume, repeat & auto-read
 * - Web Speech API: Voice recognition intent matching + keyboard text search
 * - Accessible keyboard navigation & screen-reader aria updates
 *
 * All scenario content is PROVISIONAL DEMONSTRATION CONTENT.
 * Not medical advice. No API keys. No database. No user data stored.
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
    aboutTechNote: 'Built for the VBYLD 2027 Hack for Social Cause using standard web technologies. It runs fully client-side without API keys, tracking, external AI dependencies, or cloud data storage. Voice recognition and speech synthesis use the browser’s built-in Web Speech API.',
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
    aboutTechNote: 'मानक वेब तकनीकों का उपयोग करके VBYLD 2027 हैक फ़ॉर सोशल कॉज़ के लिए निर्मित। यह बिना किसी API कीज़, ट्रैकिंग, बाहरी AI निर्भरता या क्लाउड डेटा स्टोरेज के पूरी तरह से ब्राउज़र में चलता है। आवाज़ पहचान और वाक् संश्लेषण ब्राउज़र के अंतर्निहित Web Speech API का उपयोग करते हैं।',
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
      'Voice input uses rule-based keyword matching on your device. It does not analyse symptoms or make clinical decisions.',
      'A complete written transcript is always shown on screen as a dependable visual fallback.',
    ],
    hi: [
      'बोले गए निर्देश ब्राउज़र के अपने टेक्स्ट-टू-स्पीच का उपयोग करते हैं। आवाज़ की गुणवत्ता आपकी डिवाइस पर निर्भर करती है।',
      'हिंदी आवाज़ प्लेबैक के लिए आपके ऑपरेटिंग सिस्टम या ब्राउज़र में हिंदी टीटीएस इंजन होना आवश्यक है।',
      'आवाज़ इनपुट आपके डिवाइस पर केवल कीवर्ड मिलान का उपयोग करता है। यह लक्षणों का विश्लेषण नहीं करता।',
      'स्क्रीन पर हमेशा एक पूरा लिखित निर्देश दिखाई देता है ताकि आवाज़ न आने पर भी कोई रुकावट न हो।',
    ],
  },
  future: {
    en: [
      'Formal clinical review and endorsement by certified emergency medicine specialists in India.',
      'Support for Indian regional languages: Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, and Punjabi.',
      'Offline-first Progressive Web App (PWA) with fully packaged regional voice packs for remote areas.',
      'Structured usability testing with rural community health workers (ASHAs) and everyday citizens.',
    ],
    hi: [
      'भारत में प्रमाणित आपातकालीन चिकित्सा विशेषज्ञों द्वारा औपचारिक नैदानिक समीक्षा और सत्यापन।',
      'भारतीय क्षेत्रीय भाषाओं का समर्थन: तमिल, तेलुगु, बंगाली, मराठी, कन्नड़, मलयालम, गुजराती और पंजाबी।',
      'दूरदराज के इलाकों के लिए ऑफ़लाइन-फ़र्स्ट PWA और स्थानीय भाषा वॉइस पैक।',
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
  vpNoSpeech: $('vp-no-speech'),

  // Guidance screen
  btnBackHome: $('btn-back-home'),
  scenarioTitle: $('scenario-title'),
  stepCounter: $('step-counter'),
  progressSegs: $('progress-segs'),
  instructionCard: $('instruction-card'),
  sgArt: $('sg-art'),
  sgStepIcon: $('sg-step-icon'),
  stepKind: $('step-kind'),
  stepBadge: $('step-badge'),
  instructionText: $('instruction-text'),

  // Audio controls
  btnListen: $('btn-listen'),
  listenLabel: $('listen-label'),
  btnPause: $('btn-pause'),
  pauseLabel: $('pause-label'),
  btnRepeat: $('btn-repeat'),
  audioState: $('audio-state'),
  audioStateText: $('audio-state-text'),
  autoRead: $('auto-read'),
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

  // About screen
  aboutSafetyList: $('about-safety-list'),
  aboutVoiceList: $('about-voice-list'),
  aboutSources: $('about-sources'),
  aboutFutureList: $('about-future-list'),
  aboutReviewList: $('about-review-list'),
};

/* ══════════════════════════════════════════════════════════
   3. SCREEN ROUTING
   ══════════════════════════════════════════════════════════ */

function showScreen(name) {
  stopSpeech();
  if (name !== 'home') stopListening();

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

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════════════════════════
   4. DATA ACCESS HELPERS
   ══════════════════════════════════════════════════════════ */

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
   5. DYNAMIC RENDERING (CARDS & ABOUT)
   ══════════════════════════════════════════════════════════ */

function renderScenarioCards() {
  if (!els.scenarioGrid) return;
  const list = getScenarios();
  const lang = state.lang;
  const ui = UI[lang];
  const artMap = getData().ART || {};

  els.scenarioGrid.innerHTML = list
    .map((sc, index) => {
      const title = (sc[lang] && sc[lang].title) || sc.en.title;
      const blurb = (sc[lang] && sc[lang].blurb) || sc.en.blurb;
      const stepCount = sc.steps ? sc.steps.length : 0;
      const num = String(index + 1).padStart(2, '0');
      const artSvg = artMap[sc.id] || '';
      const featuredClass = sc.featured ? ' featured' : '';

      return `
        <button class="sc-card${featuredClass}" data-scenario="${sc.id}" aria-label="${title} — ${stepCount} ${ui.guidedSteps}" style="--tint: ${sc.tint || '#DDF4EE'}; --accent: ${sc.accent || '#13A995'};">
          <div class="sc-art">
            ${artSvg}
            <span class="sc-num">${num}</span>
          </div>
          <div class="sc-body">
            <h3 class="sc-title">${title}</h3>
            <p class="sc-desc">${blurb}</p>
            <div class="sc-cue">
              <small>${stepCount} ${ui.guidedSteps}</small>
              <span class="sc-go">
                ${ui.guideMe}
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5l4.5 4.5L6 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </div>
          </div>
        </button>
      `;
    })
    .join('');

  els.scenarioGrid.querySelectorAll('[data-scenario]').forEach((btn) => {
    btn.addEventListener('click', () => {
      startScenario(btn.getAttribute('data-scenario'));
    });
  });
}

function renderAboutScreen() {
  const lang = state.lang;
  const data = getData();

  // Safety list
  if (els.aboutSafetyList) {
    els.aboutSafetyList.innerHTML = STATIC_ABOUT.safety[lang]
      .map((item) => `<li>${item}</li>`)
      .join('');
  }

  // Voice list
  if (els.aboutVoiceList) {
    els.aboutVoiceList.innerHTML = STATIC_ABOUT.voice[lang]
      .map((item) => `<li>${item}</li>`)
      .join('');
  }

  // Sources consulted
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

  // Future development
  if (els.aboutFutureList) {
    els.aboutFutureList.innerHTML = STATIC_ABOUT.future[lang]
      .map((item) => `<li>${item}</li>`)
      .join('');
  }

  // Clinical review flags
  if (els.aboutReviewList) {
    const flags = (data.REVIEW_FLAGS && data.REVIEW_FLAGS[lang]) || [];
    els.aboutReviewList.innerHTML = flags.map((f) => `<li>${f}</li>`).join('');
  }
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

  // Mini language toggle in guidance sidebar
  document.querySelectorAll('[data-setlang]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-setlang') === lang);
  });
  if (els.sideLangNow) {
    els.sideLangNow.textContent = lang === 'en' ? 'English' : 'हिन्दी';
  }

  // Update static [data-key] elements
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

  // Update input placeholders
  document.querySelectorAll('[data-ph]').forEach((input) => {
    const key = input.getAttribute('data-ph');
    if (key && strings[key]) input.placeholder = strings[key];
  });

  // Update aria labels
  document.querySelectorAll('[data-aria]').forEach((btn) => {
    const key = btn.getAttribute('data-aria');
    if (key && strings[key]) btn.setAttribute('aria-label', strings[key]);
  });

  // Re-render scenario cards and About page
  renderScenarioCards();
  renderAboutScreen();

  // Voice status
  setVoiceStatus(state.voiceStatusKey);

  // If currently listening, restart recognition in new language
  if (state.isListening) {
    stopListening();
  }

  // If viewing a scenario, re-render the step in the new language
  if (state.scenarioId && !screens.scenario.hasAttribute('hidden')) {
    renderStep();
  }
}

/* ══════════════════════════════════════════════════════════
   7. SCENARIO GUIDANCE FLOW
   ══════════════════════════════════════════════════════════ */

function startScenario(id) {
  const sc = findScenario(id);
  if (!sc) return;

  state.scenarioId = id;
  state.stepIndex = 0;
  resetVoiceCard();
  showScreen('scenario');
  renderStep();
}

function renderStep() {
  const sc = findScenario(state.scenarioId);
  if (!sc || !sc.steps || sc.steps.length === 0) return;

  const total = sc.steps.length;
  const current = Math.min(Math.max(0, state.stepIndex), total - 1);
  state.stepIndex = current;
  const stepObj = sc.steps[current];
  const lang = state.lang;
  const ui = UI[lang];
  const isLast = current === total - 1;

  // Title
  if (els.scenarioTitle) {
    els.scenarioTitle.textContent = (sc[lang] && sc[lang].title) || sc.en.title;
  }

  // Counter
  const counterText = `${ui.stepLabel} ${current + 1} ${ui.of} ${total}`;
  if (els.stepCounter) els.stepCounter.textContent = counterText;
  if (els.stepBadge) els.stepBadge.textContent = counterText.toUpperCase();

  // Progress segments
  if (els.progressSegs) {
    els.progressSegs.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const seg = document.createElement('i');
      if (i < current) seg.className = 'done';
      else if (i === current) seg.className = 'current';
      els.progressSegs.appendChild(seg);
    }
  }

  // Scenario artwork & step icon
  const artMap = getData().ART || {};
  const iconMap = getData().ICONS || {};
  if (els.sgArt) {
    els.sgArt.innerHTML = artMap[sc.id] || '';
  }
  if (els.sgStepIcon) {
    els.sgStepIcon.innerHTML = iconMap[stepObj.icon] || iconMap.shield || '';
  }

  // Step kind chip
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

  // Instruction text
  const stepText = (stepObj && stepObj[lang]) || stepObj.en || '';
  if (els.instructionText) {
    els.instructionText.textContent = stepText;
  }

  // Styling theme for the scenario
  if (els.instructionCard) {
    els.instructionCard.style.setProperty('--tint', sc.tint || '#DDF4EE');
    els.instructionCard.style.setProperty('--accent', sc.accent || '#13A995');
    // Entrance animation re-trigger
    els.instructionCard.style.animation = 'none';
    void els.instructionCard.offsetWidth;
    els.instructionCard.style.animation = '';
  }

  // Prev / Next button states
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

  // Stop previous speech, reset audio bar state
  stopSpeech();
  setAudioState('idle');

  // Auto-read if enabled
  if (state.autoRead) {
    speakCurrent();
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
   8. SPEECH SYNTHESIS (AUDIO PLAYBACK)
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
  // English
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
    setAudioState('speaking');
    if (els.speechFallback) els.speechFallback.hidden = true;
  };

  u.onpause = () => {
    setAudioState('paused');
  };

  u.onresume = () => {
    setAudioState('speaking');
  };

  u.onend = () => {
    setAudioState('done');
  };

  u.onerror = (e) => {
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      setAudioState('idle');
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
  speechSynthesis.onvoiceschanged = () => {
    // Voices loaded asynchronously in Chromium
  };
}

/* ══════════════════════════════════════════════════════════
   9. INTENT MATCHING & VOICE RECOGNITION
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

function matchIntent(query) {
  if (!query) return null;
  const matchMap = (getData().MATCH) || {};
  const norm = normalizeText(query);
  let bestId = null;
  let maxScore = 0;

  for (const [id, rules] of Object.entries(matchMap)) {
    let score = 0;
    for (const [re, weight] of rules) {
      if (re.test(norm) || re.test(query)) {
        score += weight;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestId = id;
    }
  }

  return maxScore > 0 ? bestId : null;
}

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

  if (mode === 'listening') {
    els.btnMic.classList.add('listening');
    els.waveBars.classList.add('active');
  } else if (mode === 'processing') {
    els.btnMic.classList.add('processing');
  } else if (mode === 'done') {
    els.btnMic.classList.add('done');
  }

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

      let matchedId = null;
      for (const a of alts) {
        matchedId = matchIntent(a);
        if (matchedId) break;
      }

      setTimeout(() => {
        if (matchedId) {
          setMicState('done');
          setVoiceStatus('vpFound', 'is-ok');
          setTimeout(() => {
            startScenario(matchedId);
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
  } catch (err) {
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

  const matchedId = matchIntent(clean);
  setTimeout(() => {
    if (matchedId) {
      setMicState('done');
      setVoiceStatus('vpFound', 'is-ok');
      setTimeout(() => {
        startScenario(matchedId);
      }, 550);
    } else {
      setMicState('idle');
      setVoiceStatus('vpReady');
      showVoiceError('vpNoMatch');
    }
  }, 350);
}

/* ══════════════════════════════════════════════════════════
   10. EVENT WIRING & INITIALISATION
   ══════════════════════════════════════════════════════════ */

function wireEvents() {
  // Language toggles
  if (els.btnLangEn) els.btnLangEn.addEventListener('click', () => setLang('en'));
  if (els.btnLangHi) els.btnLangHi.addEventListener('click', () => setLang('hi'));

  // Mini language toggle in guidance
  document.querySelectorAll('[data-setlang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-setlang'));
    });
  });

  // Navigation
  if (els.btnHome) els.btnHome.addEventListener('click', () => showScreen('home'));
  if (els.btnBackHome) els.btnBackHome.addEventListener('click', () => showScreen('home'));
  if (els.btnBackFromAbout) els.btnBackFromAbout.addEventListener('click', () => showScreen('home'));
  if (els.btnHomeFromEnd) els.btnHomeFromEnd.addEventListener('click', () => showScreen('home'));

  if (els.btnAboutHeader) els.btnAboutHeader.addEventListener('click', () => showScreen('about'));
  if (els.btnAboutFooter) els.btnAboutFooter.addEventListener('click', () => showScreen('about'));

  // Hero actions
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

  // Voice card mic & text input
  if (els.btnMic) els.btnMic.addEventListener('click', startListening);

  if (els.voiceTextForm) {
    els.voiceTextForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (els.voiceText) handleTextSearch(els.voiceText.value);
    });
  }

  // Guidance audio controls
  if (els.btnListen) els.btnListen.addEventListener('click', speakCurrent);
  if (els.btnPause) els.btnPause.addEventListener('click', togglePause);
  if (els.btnRepeat) els.btnRepeat.addEventListener('click', speakCurrent);

  if (els.autoRead) {
    els.autoRead.addEventListener('change', (e) => {
      state.autoRead = e.target.checked;
      if (state.autoRead && !speechSynthesis.speaking) {
        speakCurrent();
      }
    });
  }

  // Guidance step navigation
  if (els.btnNext) els.btnNext.addEventListener('click', nextStep);
  if (els.btnPrev) els.btnPrev.addEventListener('click', prevStep);
  if (els.btnRestart) els.btnRestart.addEventListener('click', () => { state.stepIndex = 0; renderStep(); });
  if (els.btnRestartScenario) els.btnRestartScenario.addEventListener('click', restartScenario);

  // End screen actions
  if (els.btnRepeatLast) {
    els.btnRepeatLast.addEventListener('click', () => {
      const sc = findScenario(state.scenarioId);
      if (sc && sc.steps && sc.steps.length > 0) {
        const lastStep = sc.steps[sc.steps.length - 1];
        speak(lastStep[state.lang] || lastStep.en);
      }
    });
  }

  // Keyboard navigation
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
      if (state.isListening) {
        stopListening();
      } else if (speechSynthesis.speaking) {
        stopSpeech();
      }
    }
  });

  // Handle tab visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSpeech();
      stopListening();
    }
  });
}

function init() {
  wireEvents();
  setLang('en');
  showScreen('home');
  if (!state.recognitionSupported && els.vpNoSpeech) {
    els.vpNoSpeech.hidden = false;
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
