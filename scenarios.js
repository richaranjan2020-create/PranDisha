/**
 * scenarios.js — PranDisha scenario data (single source of truth)
 * English + Hindi copy live together in every step so the screen text and
 * the spoken audio can never drift apart.
 *
 * ALL CONTENT IS PROVISIONAL DEMONSTRATION CONTENT. It has NOT been reviewed by
 * qualified emergency-care professionals. See docs/safety-and-sources.md.
 *
 * Step kinds:  call  = contact 112 · do = an action · dont = something to avoid · check = look/assess
 */
'use strict';

/* ───────── Step icons (40×40, stroke = currentColor) ───────── */
const _s = 'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const _i = (inner) => `<svg viewBox="0 0 40 40" ${_s} aria-hidden="true">${inner}</svg>`;
const ICONS = {
  shield:  _i('<path d="M20 5l12 4.5v8.5c0 8-5 13.5-12 16.5-7-3-12-8.5-12-16.5V9.5L20 5z"/><path d="M14 20l4.5 4.5L27 16"/>'),
  phone:   _i('<path d="M10 6h6l2.5 7-4 3a19 19 0 0 0 9.5 9.5l3-4 7 2.5v6a3 3 0 0 1-3 3C17.500 33 7 22.500 7 9a3 3 0 0 1 3-3z"/>'),
  pressure:_i('<path d="M20 5s-9 9-9 15.500a9 9 0 0 0 18 0C29 14 20 5 20 5z"/><path d="M20 17v9M16 22.500l4 4 4-4"/>'),
  cloth:   _i('<rect x="6" y="12" width="28" height="18" rx="4"/><path d="M6 19h28M14 12v18M26 12v18" opacity=".45"/>'),
  alert:   _i('<path d="M20 6L5 33h30L20 6z"/><path d="M20 16v8M20 28.500h.01"/>'),
  stay:    _i('<circle cx="14" cy="13" r="5"/><circle cx="28" cy="15" r="3.500"/><path d="M5 34c0-6.500 3.500-11 9-11s9 4.500 9 11M24 25c4-1 9 0 10 9"/>'),
  tap:     _i('<circle cx="20" cy="11" r="5"/><path d="M8 34c0-7.500 5-13 12-13s12 5.500 12 13"/><path d="M5 18l4 2M35 18l-4 2"/>'),
  breath:  _i('<path d="M13 9C8 13 6.500 21 7.500 31c3 1 6 0 8-3V9h-2.500zM27 9c5 4 6.500 12 5.500 22-3 1-6 0-8-3V9H27z"/><path d="M20 5v15"/>'),
  heart:   _i('<path d="M20 33S6 24 6 14a7 7 0 0 1 14-2.500A7 7 0 0 1 34 14c0 10-14 19-14 19z"/><path d="M9 20h6l2-4 3 8 2-4h8"/>'),
  aed:     _i('<rect x="6" y="9" width="28" height="22" rx="4"/><path d="M22.500 13.500L17 21h6.500L18 28.500"/>'),
  still:   _i('<circle cx="20" cy="20" r="14"/><path d="M14.500 15v10M25.500 15v10"/>'),
  neck:    _i('<circle cx="20" cy="9" r="5"/><path d="M20 15v19M11 21h18"/><path d="M6 6l28 28" stroke="#D63D32"/>'),
  eye:     _i('<path d="M3 20s6-11 17-11 17 11 17 11-6 11-17 11S3 20 3 20z"/><circle cx="20" cy="20" r="4.500"/>'),
  clock:   _i('<circle cx="20" cy="21" r="13"/><path d="M20 13v8l5 3M15 5h10"/>'),
  water:   _i('<path d="M20 5s-8 8.500-8 14a8 8 0 0 0 16 0c0-5.500-8-14-8-14z"/><path d="M15 21a5 5 0 0 0 4 4.500" opacity=".6"/>'),
  forbid:  _i('<circle cx="20" cy="20" r="14"/><path d="M10 10l20 20" stroke="#D63D32"/>'),
  cough:   _i('<circle cx="14" cy="12" r="5.500"/><path d="M5 33c0-7 4-12 9-12 3 0 5 1 7 3"/><path d="M26 15l4-2M27 20h6M26 25l4 2"/>'),
  back:    _i('<circle cx="22" cy="9" r="5"/><path d="M14 34V22c0-4 3-7 8-7s7 3 7 7v12"/><path d="M5 20l7-3 1 6-7 2z"/>'),
  abdomen: _i('<circle cx="20" cy="9" r="5"/><path d="M11 34V21c0-4 3-6 9-6s9 2 9 6v13"/><circle cx="20" cy="26" r="3.500"/><path d="M20 20v3"/>'),
  repeat:  _i('<path d="M7 20a13 13 0 0 1 22-9l4 4"/><path d="M33 7v8h-8M33 20a13 13 0 0 1-22 9l-4-4"/><path d="M7 33v-8h8"/>'),
  pillow:  _i('<rect x="5" y="14" width="30" height="16" rx="8"/><path d="M12 22h16" opacity=".5"/><path d="M8 8l3 3M32 8l-3 3M20 4v4"/>'),
  sit:     _i('<circle cx="16" cy="9" r="5"/><path d="M16 15v10h12M16 25l-4 9M28 25v9"/>'),
  lie:     _i('<circle cx="8" cy="22" r="4.500"/><path d="M13 24h16l6 4M13 24l-1 6M29 24l-1 7"/>'),
  pen:     _i('<rect x="8" y="16" width="24" height="9" rx="3" transform="rotate(-30 20 20)"/><path d="M30 8l3-3M14 31l-4 4"/>'),
  bottle:  _i('<path d="M16 5h8v6l4 4v18a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V15l4-4V5z"/><path d="M12 22h16"/>'),
  face:    _i('<circle cx="20" cy="20" r="14"/><path d="M14 17h.01M26 17h.01M13 26c4 3 10 2 14-2"/>'),
  wind:    _i('<path d="M5 14h18a4 4 0 1 0-4-4M5 21h26a4 4 0 1 1-4 4M5 28h12"/>'),
};

/* ───────── Scenario illustrations (320×180 scenes, transparent background) ───────── */
const SK = '#E2AE84', SK2 = '#C98D62', NV = '#10243A', NV3 = '#2A4A6B', TL = '#13A995', CR = '#D63D32', WH = '#FFFFFF';
const _scene = (inner) => `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
const ground = (c) => `<ellipse cx="160" cy="152" rx="130" ry="9" fill="${c}" opacity=".16"/>`;
const bubbles = (c) => `<circle cx="38" cy="38" r="26" fill="${c}" opacity=".10"/><circle cx="288" cy="132" r="38" fill="${c}" opacity=".08"/><circle cx="262" cy="30" r="9" fill="${c}" opacity=".14"/>`;

const ART = {
  bleeding: _scene(`${bubbles(CR)}${ground(NV)}
    <rect x="52" y="104" width="216" height="38" rx="19" fill="${SK}"/><rect x="52" y="104" width="216" height="38" rx="19" fill="none" stroke="${SK2}" stroke-width="2"/>
    <rect x="124" y="92" width="76" height="46" rx="9" fill="${WH}" stroke="#D9DCE1" stroke-width="2"/>
    <circle cx="162" cy="115" r="10" fill="${CR}" opacity=".85"/><circle cx="162" cy="115" r="5" fill="#B52E25"/>
    <path d="M136 92c4-34 6-44 20-44h12c14 0 16 10 20 44" fill="${SK}" stroke="${SK2}" stroke-width="2"/>
    <path d="M162 30v22M153 44l9 9 9-9" stroke="${TL}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M238 52c0 0-9 10-9 17a9 9 0 0 0 18 0c0-7-9-17-9-17z" fill="${CR}"/><path d="M80 66c0 0-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12z" fill="${CR}" opacity=".6"/>`),

  unresponsive: _scene(`${bubbles('#1D5FA8')}${ground(NV)}
    <rect x="62" y="118" width="124" height="26" rx="13" fill="${NV3}"/><rect x="170" y="122" width="82" height="20" rx="10" fill="${NV}"/>
    <circle cx="56" cy="128" r="15" fill="${SK}"/><path d="M42 124c2-10 18-12 26-4" stroke="#2B1B12" stroke-width="7" stroke-linecap="round" fill="none"/>
    <circle cx="150" cy="52" r="14" fill="${SK}"/><path d="M137 48c2-10 22-11 26 0" stroke="#2B1B12" stroke-width="6" stroke-linecap="round" fill="none"/>
    <rect x="134" y="68" width="32" height="52" rx="14" fill="${TL}"/><path d="M152 86l-48 28" stroke="${TL}" stroke-width="11" stroke-linecap="round"/><circle cx="98" cy="118" r="7" fill="${SK}"/>
    <path d="M106 100c-6-4-8-10-5-16M96 108c-8-4-12-10-9-18" stroke="#1D5FA8" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>
    <rect x="212" y="22" width="76" height="46" rx="12" fill="${NV}"/><path d="M224 68l-4 14 16-14" fill="${NV}"/><text x="250" y="52" font-family="Inter,sans-serif" font-size="22" font-weight="800" fill="${WH}" text-anchor="middle">112</text>`),

  choking: _scene(`${bubbles('#B26A12')}${ground(NV)}
    <rect x="124" y="124" width="14" height="30" rx="6" fill="${NV}"/><rect x="146" y="124" width="14" height="30" rx="6" fill="${NV}"/>
    <rect x="118" y="68" width="48" height="62" rx="18" fill="#D98F3A"/>
    <circle cx="142" cy="48" r="16" fill="${SK}"/><path d="M127 44c2-12 26-14 30 0" stroke="#2B1B12" stroke-width="7" stroke-linecap="round" fill="none"/>
    <circle cx="132" cy="70" r="7" fill="${SK}"/><circle cx="152" cy="70" r="7" fill="${SK}"/><circle cx="142" cy="66" r="18" fill="none" stroke="${CR}" stroke-width="3" stroke-dasharray="4 5"/>
    <rect x="198" y="72" width="40" height="58" rx="16" fill="${TL}"/><circle cx="220" cy="52" r="15" fill="${SK2}"/><path d="M206 48c3-12 24-12 28 0" stroke="#1d130d" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M202 92L168 88" stroke="${TL}" stroke-width="11" stroke-linecap="round"/><circle cx="162" cy="87" r="7" fill="${SK2}"/>
    <path d="M150 100c-8 3-10 10-6 16M144 96c-12 4-14 16-8 24" stroke="${CR}" stroke-width="3" stroke-linecap="round" fill="none" opacity=".75"/>
    <g fill="#B26A12"><circle cx="96" cy="40" r="4"/><circle cx="108" cy="32" r="4"/><circle cx="121" cy="27" r="4"/><circle cx="135" cy="25" r="4"/><circle cx="149" cy="26" r="4"/></g>`),

  burns: _scene(`${bubbles('#C4571A')}${ground(NV)}
    <path d="M232 18v34h-52a10 10 0 0 0-10 10v8" stroke="#8FA3B8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="160" y="68" width="22" height="9" rx="3" fill="#8FA3B8"/>
    <path d="M171 82c0 0-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11z" fill="#5AA9E6"/><path d="M171 100c0 0-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11z" fill="#5AA9E6" opacity=".8"/>
    <path d="M160 92c0 0-4 6-4 9a4 4 0 0 0 8 0c0-3-4-9-4-9z" fill="#5AA9E6" opacity=".55"/><path d="M184 90c0 0-4 6-4 9a4 4 0 0 0 8 0c0-3-4-9-4-9z" fill="#5AA9E6" opacity=".55"/>
    <ellipse cx="170" cy="130" rx="62" ry="22" fill="${SK}" stroke="${SK2}" stroke-width="2"/>
    <rect x="112" y="102" width="14" height="38" rx="7" fill="${SK}" transform="rotate(-12 119 121)"/><rect x="130" y="96" width="14" height="42" rx="7" fill="${SK}" transform="rotate(-4 137 117)"/><rect x="148" y="96" width="14" height="42" rx="7" fill="${SK}"/>
    <ellipse cx="172" cy="128" rx="18" ry="10" fill="#E8776A" opacity=".75"/>
    <path d="M96 150h150" stroke="#5AA9E6" stroke-width="4" stroke-linecap="round" opacity=".5" stroke-dasharray="2 9"/>`),

  seizure: _scene(`${bubbles('#6B4FC4')}${ground(NV)}
    <circle cx="160" cy="100" r="76" fill="none" stroke="#6B4FC4" stroke-width="2.500" stroke-dasharray="3 8" opacity=".6"/>
    <rect x="62" y="118" width="40" height="14" rx="7" fill="#B9A9EC"/>
    <rect x="86" y="108" width="118" height="26" rx="13" fill="#4C6E94"/><rect x="190" y="112" width="70" height="20" rx="10" fill="${NV}"/>
    <circle cx="82" cy="118" r="15" fill="${SK}"/><path d="M68 114c2-10 18-12 26-3" stroke="#2B1B12" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M110 92l8-10 8 12 8-12 8 12 8-10" stroke="#6B4FC4" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M214 96l8 8 8-8 8 8" stroke="#6B4FC4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".7"/>
    <circle cx="262" cy="46" r="24" fill="${WH}" stroke="#6B4FC4" stroke-width="3"/><path d="M262 32v15l10 6" stroke="${NV}" stroke-width="3.500" stroke-linecap="round" fill="none"/><path d="M255 18h14" stroke="#6B4FC4" stroke-width="4" stroke-linecap="round"/>`),

  accident: _scene(`${bubbles('#3A5C7B')}
    <rect x="0" y="122" width="320" height="58" fill="#3F5266"/><path d="M0 150h320" stroke="#E9EEF3" stroke-width="3" stroke-dasharray="16 14"/>
    <path d="M56 118h104c8 0 12-6 14-14l4-16c2-6-2-10-8-10H104c-8 0-12 4-16 10l-14 16c-6 6-6 14 0 14z" fill="#8F2A22" transform="translate(0 4)"/>
    <path d="M96 84h42l-8 18H80z" fill="#CFE3F3" opacity=".9" transform="translate(0 4)"/><path d="M146 84h18l8 18h-26z" fill="#CFE3F3" opacity=".9" transform="translate(0 4)"/>
    <circle cx="92" cy="128" r="14" fill="${NV}"/><circle cx="92" cy="128" r="6" fill="#B9C6D3"/><circle cx="154" cy="128" r="14" fill="${NV}"/><circle cx="154" cy="128" r="6" fill="#B9C6D3"/>
    <path d="M230 38l24 42h-48z" fill="${CR}" stroke="${WH}" stroke-width="4" stroke-linejoin="round"/><path d="M230 52v14M230 72h.01" stroke="${WH}" stroke-width="4" stroke-linecap="round"/>
    <rect x="270" y="86" width="26" height="40" rx="11" fill="${TL}"/><circle cx="283" cy="72" r="11" fill="${SK}"/><path d="M272 68c2-9 18-9 22 0" stroke="#2B1B12" stroke-width="5" stroke-linecap="round" fill="none"/><rect x="262" y="96" width="9" height="14" rx="2" fill="${NV}"/>`),

  stroke: _scene(`${bubbles('#B03A6B')}${ground(NV)}
    <circle cx="118" cy="92" r="50" fill="${SK}"/><path d="M70 82c4-30 28-44 52-42 22 2 40 18 44 40-12-14-30-22-50-22-18 0-34 8-46 24z" fill="#2B1B12"/>
    <circle cx="100" cy="92" r="4.500" fill="${NV}"/><circle cx="136" cy="92" r="4.500" fill="${NV}"/>
    <path d="M96 118c10 4 22 4 34-2s14-6 14-6" stroke="${NV}" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M130 118l14 8" stroke="${NV}" stroke-width="4" stroke-linecap="round"/>
    <path d="M118 50a50 50 0 0 1 0 84z" fill="#B03A6B" opacity=".14"/>
    <g font-family="Inter,sans-serif" font-weight="800" font-size="20" text-anchor="middle">
      <rect x="196" y="36" width="34" height="34" rx="10" fill="#B03A6B"/><text x="213" y="60" fill="${WH}">F</text>
      <rect x="238" y="36" width="34" height="34" rx="10" fill="${NV}"/><text x="255" y="60" fill="${WH}">A</text>
      <rect x="196" y="78" width="34" height="34" rx="10" fill="${NV}"/><text x="213" y="102" fill="${WH}">S</text>
      <rect x="238" y="78" width="34" height="34" rx="10" fill="${CR}"/><text x="255" y="102" fill="${WH}">T</text></g>
    <circle cx="234" cy="140" r="14" fill="${WH}" stroke="#B03A6B" stroke-width="3"/><path d="M234 131v9l6 3" stroke="${NV}" stroke-width="2.500" stroke-linecap="round" fill="none"/>`),

  chest: _scene(`${bubbles('#C2362B')}${ground(NV)}
    <path d="M88 160c0-40 18-58 48-62h48c30 4 48 22 48 62z" fill="${NV3}"/><rect x="144" y="82" width="32" height="26" rx="10" fill="${SK}"/><circle cx="160" cy="56" r="26" fill="${SK}"/><path d="M134 50c4-22 48-24 52 0-10-8-40-8-52 0z" fill="#2B1B12"/>
    <path d="M160 156s-40-26-40-54a20 20 0 0 1 40-6 20 20 0 0 1 40 6c0 28-40 54-40 54z" fill="${CR}" transform="translate(0 -4) scale(1) "/>
    <path d="M122 110h24l8-16 10 28 8-12h26" stroke="${WH}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <g stroke="${CR}" stroke-width="4" stroke-linecap="round" opacity=".5"><path d="M92 90l-14-6M88 106l-16 2M98 74l-10-12"/><path d="M228 90l14-6M232 106l16 2M222 74l10-12"/></g>
    <circle cx="206" cy="112" r="11" fill="${SK2}"/>`),

  allergic: _scene(`${bubbles('#C98A0C')}${ground(NV)}
    <g transform="rotate(-24 150 88)"><rect x="70" y="72" width="170" height="34" rx="12" fill="${WH}" stroke="#D9DCE1" stroke-width="2"/>
      <rect x="50" y="76" width="30" height="26" rx="6" fill="#E9833A"/><rect x="224" y="72" width="26" height="34" rx="8" fill="#2D7CC4"/><rect x="108" y="82" width="86" height="14" rx="4" fill="#EEF2F6"/><rect x="116" y="86" width="40" height="6" rx="3" fill="#C9D3DD"/></g>
    <path d="M212 148c-14-30-4-52 28-54l24 6c16 20 12 40-4 54z" fill="${SK}" stroke="${SK2}" stroke-width="2"/>
    <g fill="#E8776A"><circle cx="236" cy="116" r="5"/><circle cx="250" cy="126" r="4.500"/><circle cx="232" cy="134" r="4"/><circle cx="248" cy="108" r="3.500"/><circle cx="258" cy="136" r="3.500"/></g>
    <g stroke="#C98A0C" stroke-width="4" stroke-linecap="round"><path d="M120 40v-14M96 52l-10-10M144 52l10-10"/></g>`),

  poison: _scene(`${bubbles('#3D8B4F')}${ground(NV)}
    <rect x="112" y="74" width="62" height="74" rx="12" fill="#3E8E5A"/><rect x="128" y="52" width="30" height="26" rx="5" fill="#2F6E45"/><rect x="124" y="42" width="38" height="14" rx="5" fill="${NV}"/>
    <rect x="122" y="96" width="42" height="34" rx="6" fill="${WH}"/>
    <path d="M143 98l17 16-17 16-17-16z" fill="#F2B03D" stroke="${NV}" stroke-width="2.500" stroke-linejoin="round"/><path d="M143 106v8M143 119h.01" stroke="${NV}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="232" cy="64" r="26" fill="${WH}" stroke="${CR}" stroke-width="5"/><path d="M214 82l36-36" stroke="${CR}" stroke-width="5" stroke-linecap="round"/>
    <path d="M222 66c0-6 4-9 10-9s10 3 10 9c0 4-3 6-5 8v4h-10v-4c-2-2-5-4-5-8z" fill="${NV}" opacity=".55"/>
    <g stroke="${TL}" stroke-width="4" stroke-linecap="round" fill="none"><path d="M196 124h40a8 8 0 1 0-8-8"/><path d="M196 140h58a8 8 0 1 1-8 8"/></g>`),
};

/* ───────── Scenarios ───────── */
const SCENARIOS = [
  /* 1 ─────────────────────────────────────────────── */
  { id: 'bleeding', tint: '#FDECEA', accent: '#C2362B', featured: true,
    en: { title: 'Severe bleeding', blurb: 'Press firmly on the wound and keep pressing until help arrives.' },
    hi: { title: 'गंभीर रक्तस्राव', blurb: 'घाव पर मज़बूती से दबाव डालें और मदद आने तक दबाए रखें।' },
    steps: [
      { icon: 'shield',  kind: 'check',
        en: 'Check that the scene is safe before you go closer. Do not put yourself at risk.',
        hi: 'पास जाने से पहले देख लें कि जगह सुरक्षित है। खुद को जोखिम में न डालें।' },
      { icon: 'phone',   kind: 'call',
        en: 'Call 112 now, or ask someone nearby to call. Put the phone on speaker so you can keep helping.',
        hi: 'अभी 112 पर कॉल करें, या पास के किसी व्यक्ति से कॉल करने को कहें। फ़ोन स्पीकर पर रखें ताकि आप मदद जारी रख सकें।' },
      { icon: 'pressure', kind: 'do',
        en: 'Press firmly on the wound with a clean cloth or dressing. Keep pressing without letting go.',
        hi: 'साफ़ कपड़े या पट्टी से घाव को मज़बूती से दबाएँ। बिना छोड़े दबाए रखें।' },
      { icon: 'cloth',   kind: 'do',
        en: 'If blood soaks through, add more cloth on top. Do not take off the first layer.',
        hi: 'अगर खून कपड़े से रिस जाए तो ऊपर और कपड़ा रखें। पहली परत न हटाएँ।' },
      { icon: 'alert',   kind: 'dont',
        en: 'If something is stuck in the wound, do not pull it out. Press around it instead.',
        hi: 'अगर घाव में कुछ धँसा हो तो उसे न निकालें। उसके आसपास दबाव डालें।' },
      { icon: 'stay',    kind: 'do',
        en: 'Help the person lie down and stay with them. Keep pressing and follow the 112 call handler until help arrives.',
        hi: 'व्यक्ति को लिटाएँ और उनके साथ रहें। दबाव जारी रखें और मदद आने तक 112 संचालक के निर्देशों का पालन करें।' },
    ] },

  /* 2 ─────────────────────────────────────────────── */
  { id: 'unresponsive', tint: '#E4EEF9', accent: '#1D5FA8', featured: true,
    en: { title: 'Unresponsive person / suspected cardiac arrest', blurb: 'Call 112, check breathing, and follow the call handler’s CPR instructions.' },
    hi: { title: 'बेहोश व्यक्ति / संदिग्ध हृदयगति रुकना', blurb: '112 पर कॉल करें, साँस जाँचें और संचालक के CPR निर्देशों का पालन करें।' },
    steps: [
      { icon: 'phone', kind: 'call',
        en: 'Call 112 now. Put your phone on speaker so the call handler can guide you.',
        hi: 'अभी 112 पर कॉल करें। फ़ोन स्पीकर पर रखें ताकि संचालक आपको निर्देश दे सकें।' },
      { icon: 'tap', kind: 'check',
        en: 'If it is safe, tap the person’s shoulders firmly and shout, “Are you okay?”',
        hi: 'अगर सुरक्षित हो तो व्यक्ति के कंधों को ज़ोर से थपथपाएँ और पूछें, “क्या आप ठीक हैं?”' },
      { icon: 'breath', kind: 'check',
        en: 'Look at the chest and listen for normal breathing for no more than 10 seconds. Gasping is not normal breathing.',
        hi: 'छाती को देखें और 10 सेकंड से ज़्यादा नहीं, सामान्य साँस सुनें। हाँफना सामान्य साँस नहीं है।' },
      { icon: 'heart', kind: 'do',
        en: 'If they do not respond and are not breathing normally, tell the call handler and follow their CPR instructions straight away.',
        hi: 'अगर वे जवाब नहीं दे रहे और सामान्य साँस नहीं ले रहे, तो संचालक को बताएँ और तुरंत उनके CPR निर्देशों का पालन करें।' },
      { icon: 'aed', kind: 'do',
        en: 'If someone else is there, ask them to bring an AED if one is nearby. Do not leave the person alone to look for it.',
        hi: 'अगर कोई और पास है तो उससे AED लाने को कहें, अगर पास में हो। AED ढूँढने के लिए व्यक्ति को अकेला न छोड़ें।' },
      { icon: 'stay', kind: 'do',
        en: 'Keep following the call handler until responders arrive or they tell you otherwise.',
        hi: 'जब तक आपातकालीन दल नहीं आता या संचालक कुछ और न कहें, उनके निर्देशों का पालन करते रहें।' },
    ] },

  /* 3 ─────────────────────────────────────────────── */
  { id: 'choking', tint: '#FCF0DB', accent: '#A8620F',
    en: { title: 'Choking', blurb: 'Adult demo: encourage coughing, then back blows and abdominal thrusts.' },
    hi: { title: 'दम घुटना', blurb: 'वयस्क डेमो: खाँसने को कहें, फिर पीठ पर थपकी और पेट पर दबाव।' },
    scope: { en: 'Adult-only demonstration. Child and infant choking are different and are not covered here.',
             hi: 'यह केवल वयस्कों के लिए डेमो है। बच्चों और शिशुओं में दम घुटना अलग होता है और यहाँ शामिल नहीं है।' },
    steps: [
      { icon: 'cough', kind: 'check',
        en: 'Ask, “Are you choking?” If they can cough, speak or breathe, encourage them to keep coughing. Stay with them.',
        hi: 'पूछें, “क्या आपका दम घुट रहा है?” अगर वे खाँस, बोल या साँस ले पा रहे हैं, तो उन्हें खाँसते रहने को कहें। उनके साथ रहें।' },
      { icon: 'phone', kind: 'call',
        en: 'If they cannot cough, speak or breathe, call 112 now or ask someone else to call.',
        hi: 'अगर वे खाँस, बोल या साँस नहीं ले पा रहे, तो अभी 112 पर कॉल करें या किसी और से कॉल करने को कहें।' },
      { icon: 'back', kind: 'do',
        en: 'Lean them forward. Give up to 5 firm back blows between the shoulder blades with the heel of your hand.',
        hi: 'उन्हें आगे झुकाएँ। हथेली के निचले हिस्से से कंधे की हड्डियों के बीच 5 बार तक ज़ोर से थपकी दें।' },
      { icon: 'abdomen', kind: 'do',
        en: 'If still choking, give up to 5 abdominal thrusts: fist just above the belly button, pull inward and upward.',
        hi: 'अगर अब भी दम घुट रहा है, तो पेट पर 5 बार तक दबाव दें: नाभि के ठीक ऊपर मुट्ठी रखें और अंदर तथा ऊपर की ओर खींचें।' },
      { icon: 'repeat', kind: 'do',
        en: 'Keep alternating 5 back blows and 5 abdominal thrusts until the object comes out or the person becomes unresponsive.',
        hi: 'जब तक वस्तु बाहर न आए या व्यक्ति बेहोश न हो जाए, 5 थपकी और 5 पेट-दबाव बारी-बारी से देते रहें।' },
      { icon: 'heart', kind: 'do',
        en: 'If they become unresponsive, lay them down, tell the call handler, and follow their CPR instructions.',
        hi: 'अगर वे बेहोश हो जाएँ तो उन्हें लिटाएँ, संचालक को बताएँ और उनके CPR निर्देशों का पालन करें।' },
    ] },

  /* 4 ─────────────────────────────────────────────── */
  { id: 'burns', tint: '#FDEBDD', accent: '#B8501A',
    en: { title: 'Burns and scalds', blurb: 'Cool the burn under running water and call for serious burns.' },
    hi: { title: 'जलना और झुलसना', blurb: 'जले हिस्से को बहते पानी में ठंडा करें; गंभीर जलने पर कॉल करें।' },
    steps: [
      { icon: 'shield', kind: 'check',
        en: 'Move the person away from the source of heat. Do not put yourself at risk.',
        hi: 'व्यक्ति को गर्मी के स्रोत से दूर ले जाएँ। खुद को जोखिम में न डालें।' },
      { icon: 'phone', kind: 'call',
        en: 'Call 112 now if the burn is large or deep, on the face, hands, feet or genitals, from chemicals or electricity, or if breathing is affected.',
        hi: 'अगर जलन बड़ी या गहरी है, चेहरे, हाथ, पैर या गुप्तांगों पर है, रसायन या बिजली से हुई है, या साँस पर असर है, तो अभी 112 पर कॉल करें।' },
      { icon: 'water', kind: 'do',
        en: 'Cool the burn with cool or lukewarm running water for about 20 minutes, as soon as possible.',
        hi: 'जले हिस्से को जल्द से जल्द ठंडे या गुनगुने बहते पानी से लगभग 20 मिनट तक ठंडा करें।' },
      { icon: 'forbid', kind: 'dont',
        en: 'Do not use ice, iced water, creams, butter or other greasy substances.',
        hi: 'बर्फ़, बर्फ़ का पानी, क्रीम, मक्खन या कोई चिकना पदार्थ न लगाएँ।' },
      { icon: 'alert', kind: 'do',
        en: 'Gently take off clothing and jewellery near the burn, unless it is stuck to the skin. Do not pull off anything that is stuck.',
        hi: 'जले हिस्से के पास के कपड़े और गहने धीरे से उतारें, जब तक वे त्वचा से चिपके न हों। जो चिपका हो उसे न खींचें।' },
      { icon: 'cloth', kind: 'do',
        en: 'Cover the burn loosely with clean cling film or a clean non-stick covering. Keep the person warm.',
        hi: 'जले हिस्से को साफ़ क्लिंग फ़िल्म या साफ़, न चिपकने वाले कपड़े से ढीला ढकें। व्यक्ति को गर्म रखें।' },
    ] },

  /* 5 ─────────────────────────────────────────────── */
  { id: 'seizure', tint: '#EAE6F8', accent: '#5B3FB8',
    en: { title: 'Seizure', blurb: 'Protect them from harm, never restrain them, and know when to call.' },
    hi: { title: 'दौरा पड़ना', blurb: 'उन्हें चोट से बचाएँ, पकड़कर न रखें, और जानें कब कॉल करना है।' },
    steps: [
      { icon: 'clock', kind: 'do',
        en: 'Stay calm and note the time the seizure started.',
        hi: 'शांत रहें और ध्यान दें कि दौरा कब शुरू हुआ।' },
      { icon: 'pillow', kind: 'do',
        en: 'Clear away hard or sharp objects. Cushion their head with something soft. Move them only if they are in danger.',
        hi: 'सख़्त या नुकीली चीज़ें हटा दें। उनके सिर के नीचे कुछ मुलायम रखें। उन्हें तभी हटाएँ जब वे खतरे में हों।' },
      { icon: 'forbid', kind: 'dont',
        en: 'Do not hold them down. Do not put anything in their mouth.',
        hi: 'उन्हें पकड़कर न रखें। उनके मुँह में कुछ न डालें।' },
      { icon: 'phone', kind: 'call',
        en: 'Call 112 if it lasts more than 5 minutes, if it is their first seizure, if they are hurt or struggling to breathe, or if another seizure follows.',
        hi: 'अगर दौरा 5 मिनट से ज़्यादा चले, पहली बार पड़ा हो, वे घायल हों या साँस लेने में दिक्कत हो, या दूसरा दौरा पड़े, तो 112 पर कॉल करें।' },
      { icon: 'lie', kind: 'do',
        en: 'When the shaking stops, gently turn them onto their side and stay with them.',
        hi: 'झटके रुकने पर उन्हें धीरे से करवट पर लिटाएँ और उनके साथ रहें।' },
      { icon: 'eye', kind: 'check',
        en: 'Stay until they are fully alert. Give no food or drink until then. Tell responders what you saw.',
        hi: 'जब तक वे पूरी तरह होश में न आ जाएँ, साथ रहें। तब तक खाना या पीना न दें। आपातकालीन दल को बताएँ कि आपने क्या देखा।' },
    ] },

  /* 6 ─────────────────────────────────────────────── */
  { id: 'accident', tint: '#E6ECF2', accent: '#35566F',
    en: { title: 'Road accident / serious injury', blurb: 'Stay safe, call 112, and avoid moving a possibly spine-injured person.' },
    hi: { title: 'सड़क दुर्घटना / गंभीर चोट', blurb: 'सुरक्षित रहें, 112 पर कॉल करें, और संभावित रीढ़ की चोट वाले को न हिलाएँ।' },
    steps: [
      { icon: 'shield', kind: 'check',
        en: 'Make sure it is safe. Keep away from traffic, fuel leaks and unstable vehicles. Switch off engines if you safely can.',
        hi: 'सुनिश्चित करें कि जगह सुरक्षित है। यातायात, ईंधन रिसाव और अस्थिर वाहनों से दूर रहें। सुरक्षित हो तो इंजन बंद करें।' },
      { icon: 'phone', kind: 'call',
        en: 'Call 112. Give the location, how many people are hurt, and what you can see.',
        hi: '112 पर कॉल करें। जगह, घायलों की संख्या और जो आप देख रहे हैं वह बताएँ।' },
      { icon: 'still', kind: 'dont',
        en: 'Do not move an injured person unless there is immediate danger, such as fire.',
        hi: 'घायल व्यक्ति को न हिलाएँ, जब तक आग जैसा तत्काल खतरा न हो।' },
      { icon: 'neck', kind: 'dont',
        en: 'Do not move their head, neck or back. Ask them to stay still.',
        hi: 'उनके सिर, गर्दन या पीठ को न हिलाएँ। उन्हें स्थिर रहने को कहें।' },
      { icon: 'stay', kind: 'do',
        en: 'If they are awake, speak calmly and tell them help is coming. Do not give food or drink.',
        hi: 'अगर वे होश में हैं तो शांति से बात करें और बताएँ कि मदद आ रही है। खाना या पीना न दें।' },
      { icon: 'eye', kind: 'check',
        en: 'Keep watching them and follow the call handler until help arrives.',
        hi: 'उन पर नज़र रखें और मदद आने तक संचालक के निर्देशों का पालन करें।' },
    ] },

  /* 7 ─────────────────────────────────────────────── */
  { id: 'stroke', tint: '#F9E8EF', accent: '#A82F61',
    en: { title: 'Possible stroke', blurb: 'Spot sudden warning signs and call 112 immediately.' },
    hi: { title: 'संभावित स्ट्रोक', blurb: 'अचानक दिखे चेतावनी संकेत पहचानें और तुरंत 112 पर कॉल करें।' },
    steps: [
      { icon: 'face', kind: 'check',
        en: 'Look for sudden signs. Face: is one side drooping? Arms: can they raise both? Speech: is it slurred or confused?',
        hi: 'अचानक दिखे संकेत देखें। चेहरा: क्या एक तरफ़ लटका है? बाँहें: क्या वे दोनों उठा पाते हैं? बोली: क्या अस्पष्ट या उलझी है?' },
      { icon: 'phone', kind: 'call',
        en: 'If you see any sign, call 112 immediately. Say you think it may be a stroke. Do not drive them yourself.',
        hi: 'कोई भी संकेत दिखे तो तुरंत 112 पर कॉल करें। बताएँ कि आपको स्ट्रोक की आशंका है। उन्हें खुद गाड़ी चलाकर न ले जाएँ।' },
      { icon: 'clock', kind: 'do',
        en: 'Note the time the symptoms started, or when they were last normal, and tell the call handler.',
        hi: 'ध्यान दें कि लक्षण कब शुरू हुए, या वे आख़िरी बार कब सामान्य थे, और संचालक को बताएँ।' },
      { icon: 'forbid', kind: 'dont',
        en: 'Do not give food, drink or medicine.',
        hi: 'खाना, पीना या कोई दवा न दें।' },
      { icon: 'sit', kind: 'do',
        en: 'Help them into a comfortable position and reassure them. Stay with them.',
        hi: 'उन्हें आरामदेह स्थिति में बिठाएँ या लिटाएँ और तसल्ली दें। उनके साथ रहें।' },
      { icon: 'breath', kind: 'check',
        en: 'If they become unresponsive or are not breathing normally, tell the call handler and follow their instructions.',
        hi: 'अगर वे बेहोश हो जाएँ या सामान्य साँस न लें, तो संचालक को बताएँ और उनके निर्देशों का पालन करें।' },
    ] },

  /* 8 ─────────────────────────────────────────────── */
  { id: 'chest', tint: '#FCE9E6', accent: '#BC3328',
    en: { title: 'Chest pain / suspected heart attack', blurb: 'Treat it as urgent: call 112, rest, and wait for help.' },
    hi: { title: 'सीने में दर्द / संदिग्ध हार्ट अटैक', blurb: 'इसे गंभीर मानें: 112 पर कॉल करें, आराम कराएँ और मदद का इंतज़ार करें।' },
    steps: [
      { icon: 'phone', kind: 'call',
        en: 'Call 112 now for chest pain that may be a heart attack. Do not wait to see if it passes.',
        hi: 'हार्ट अटैक की आशंका वाले सीने के दर्द पर अभी 112 पर कॉल करें। यह देखने के लिए न रुकें कि दर्द ठीक होता है या नहीं।' },
      { icon: 'sit', kind: 'do',
        en: 'Help them sit down and rest in a comfortable position. Loosen tight clothing.',
        hi: 'उन्हें बैठाएँ और आरामदेह स्थिति में आराम करने दें। तंग कपड़े ढीले करें।' },
      { icon: 'forbid', kind: 'dont',
        en: 'Do not let them walk around, and do not drive them yourself. Wait for the ambulance.',
        hi: 'उन्हें चलने-फिरने न दें और उन्हें खुद गाड़ी से न ले जाएँ। एम्बुलेंस का इंतज़ार करें।' },
      { icon: 'alert', kind: 'dont',
        en: 'Do not give food, drink or medicine unless the call handler tells you to. If they have heart medicine prescribed to them, tell the call handler.',
        hi: 'संचालक के कहे बिना खाना, पीना या दवा न दें। अगर उनकी हृदय की कोई दवा चल रही है, तो संचालक को बताएँ।' },
      { icon: 'eye', kind: 'check',
        en: 'Stay with them and watch them. Tell the call handler if they get worse.',
        hi: 'उनके साथ रहें और उन पर नज़र रखें। हालत बिगड़े तो संचालक को बताएँ।' },
      { icon: 'heart', kind: 'do',
        en: 'If they become unresponsive and are not breathing normally, follow the call handler’s CPR instructions straight away.',
        hi: 'अगर वे बेहोश हो जाएँ और सामान्य साँस न लें, तो तुरंत संचालक के CPR निर्देशों का पालन करें।' },
    ] },

  /* 9 ─────────────────────────────────────────────── */
  { id: 'allergic', tint: '#FFF0D2', accent: '#A86F00',
    en: { title: 'Severe allergic reaction', blurb: 'Call 112 and help them use their own adrenaline auto-injector.' },
    hi: { title: 'गंभीर एलर्जी प्रतिक्रिया', blurb: '112 पर कॉल करें और उनके अपने एड्रेनालिन ऑटो-इंजेक्टर के उपयोग में मदद करें।' },
    steps: [
      { icon: 'alert', kind: 'check',
        en: 'Look for swelling of the lips, mouth, throat or tongue, trouble breathing, wheezing, faintness, or pale, grey or blue skin.',
        hi: 'होंठ, मुँह, गले या जीभ में सूजन, साँस लेने में तकलीफ़, घरघराहट, चक्कर, या पीली, भूरी-सी या नीली त्वचा देखें।' },
      { icon: 'phone', kind: 'call',
        en: 'Call 112 now. Say you think it is a severe allergic reaction.',
        hi: 'अभी 112 पर कॉल करें। बताएँ कि आपको गंभीर एलर्जी प्रतिक्रिया की आशंका है।' },
      { icon: 'pen', kind: 'do',
        en: 'If they have their own adrenaline auto-injector, help them use it now. Follow the instructions on the device.',
        hi: 'अगर उनके पास अपना एड्रेनालिन ऑटो-इंजेक्टर है, तो अभी उसे इस्तेमाल करने में मदद करें। डिवाइस पर दिए निर्देशों का पालन करें।' },
      { icon: 'lie', kind: 'do',
        en: 'Help them lie down and raise their legs. If breathing is hard, let them sit up slowly. If pregnant, lie them on their left side.',
        hi: 'उन्हें लिटाएँ और पैर ऊँचे करें। साँस लेना कठिन हो तो धीरे से बैठने दें। गर्भवती हों तो बाईं करवट लिटाएँ।' },
      { icon: 'clock', kind: 'do',
        en: 'If they are no better after 5 minutes and a second auto-injector is available, use it.',
        hi: 'अगर 5 मिनट बाद भी सुधार न हो और दूसरा ऑटो-इंजेक्टर उपलब्ध हो, तो उसे इस्तेमाल करें।' },
      { icon: 'stay', kind: 'do',
        en: 'Stay with them. Do not let them stand or walk, even if they feel better. Follow the call handler.',
        hi: 'उनके साथ रहें। बेहतर महसूस होने पर भी उन्हें खड़े होने या चलने न दें। संचालक के निर्देशों का पालन करें।' },
    ] },

  /* 10 ────────────────────────────────────────────── */
  { id: 'poison', tint: '#E3F2E3', accent: '#2F7D44',
    en: { title: 'Poisoning / chemical exposure', blurb: 'Call for help, never induce vomiting, and keep the container.' },
    hi: { title: 'ज़हर / रसायन का संपर्क', blurb: 'मदद बुलाएँ, उल्टी न करवाएँ, और डिब्बा या पैकेट संभालकर रखें।' },
    steps: [
      { icon: 'shield', kind: 'check',
        en: 'Make sure it is safe. If there are fumes or gas, do not go into the area. Call 112 from a safe place.',
        hi: 'सुनिश्चित करें कि जगह सुरक्षित है। अगर धुआँ या गैस हो तो उस जगह में न जाएँ। किसी सुरक्षित जगह से 112 पर कॉल करें।' },
      { icon: 'phone', kind: 'call',
        en: 'Call 112 now, or a poison information service if you have one. Follow their instructions.',
        hi: 'अभी 112 पर कॉल करें, या अगर आपके पास हो तो ज़हर-सूचना सेवा को कॉल करें। उनके निर्देशों का पालन करें।' },
      { icon: 'forbid', kind: 'dont',
        en: 'Do not make the person vomit. Do not give food, drink or home remedies unless a professional tells you to.',
        hi: 'व्यक्ति को उल्टी न करवाएँ। जब तक कोई विशेषज्ञ न कहे, खाना, पीना या घरेलू नुस्खे न दें।' },
      { icon: 'bottle', kind: 'do',
        en: 'Keep the container, packet or label. Tell the call handler what it was, how much, and when.',
        hi: 'डिब्बा, पैकेट या लेबल संभालकर रखें। संचालक को बताएँ कि वह क्या था, कितना और कब।' },
      { icon: 'water', kind: 'do',
        en: 'If a chemical is on the skin or in the eyes, rinse with plenty of clean running water and take off contaminated clothing.',
        hi: 'अगर रसायन त्वचा या आँखों पर लगा हो, तो खूब साफ़ बहते पानी से धोएँ और दूषित कपड़े उतार दें।' },
      { icon: 'eye', kind: 'check',
        en: 'Stay with them and watch their breathing. If they become unresponsive and are not breathing normally, follow the call handler’s CPR instructions.',
        hi: 'उनके साथ रहें और उनकी साँस पर नज़र रखें। अगर वे बेहोश हो जाएँ और सामान्य साँस न लें, तो संचालक के CPR निर्देशों का पालन करें।' },
    ] },
];

/* ───────── Rule-based intent matching (transparent, no AI model) ─────────
   Text is normalised first (lower-case, Devanagari nukta/chandrabindu folded), so the
   Hindi patterns below are written WITHOUT nukta/chandrabindu: ज़→ज, ँ→ं.
   Each scenario has weighted patterns; the highest total score wins. */
const MATCH = {
  unresponsive: [
    [/unresponsive|unconscious|not responding|not respond|passed out|collapsed|fainted|faint|cardiac arrest|no pulse|not waking|won'?t wake|(not|isn'?t|aren'?t|no longer|stopped) breathing|stopped breathing|can'?t breathe|heart stopped/, 3],
    [/behosh|bebosh|बेहोश|होश नहीं|होश में नहीं|अचेत|गिर पड़ा|गिर गया|गिर गई/, 3],
    [/(सामान्य|ठीक) (रूप से )?सांस नहीं|सांस नहीं ले|सांस रुक|सांस बंद|दिल रुक|हृदय गति रुक|नब्ज नहीं|जवाब नहीं दे/, 4],
    [/saans nahi|sans nahi|saas nahi/, 3],
  ],
  choking: [
    [/chok|something stuck|stuck in (his|her|their|the) throat|swallowed wrong|can'?t (speak|cough)|gagging/, 4],
    [/दम घुट|गला घुट|गले में (कुछ )?(अटक|फंस)|अटक गया|अटक गई|फंस गया|निवाला|खाना अटक/, 4],
    [/dam ghut|gala ghut|gale mein atak/, 4],
  ],
  bleeding: [
    [/bleed|blood|deep cut|gash|wound|stabbed|cut (his|her|their|the|a)/, 3],
    [/खून|रक्त|खुन|घाव|ब्लीडिंग|कट गया|कट लगा|चाकू/, 3],
    [/khoon|khun|rakt|ghav/, 3],
  ],
  burns: [
    [/\bburn|scald|boiling (water|oil|tea|milk)|hot (water|oil)|on fire|caught fire|fire (burn|injury)/, 4],
    [/जल गया|जल गई|जला|जली|झुलस|उबलता|गर्म पानी|गरम पानी|गर्म तेल|गरम तेल|आग (लग|से)/, 4],
    [/jal gaya|jal gayi|jhulas|jala hai/, 4],
  ],
  seizure: [
    [/seiz|convuls|epilep|fits?\b|having a fit|shaking uncontrollably|jerking/, 4],
    [/दौरा|मिर्गी|झटके|ऐंठन|अकड़/, 4],
    [/daura|mirgi|jhatke/, 4],
  ],
  accident: [
    [/accident|crash|collision|hit by|run over|knocked down|fell from|road|bike|car|truck|vehicle|scooter|serious injur|badly (hurt|injured)|fracture|broken (bone|leg|arm|back)/, 3],
    [/दुर्घटना|हादसा|एक्सीडेंट|एक्सिडेंट|टक्कर|सड़क|गाड़ी|बाइक|ट्रक|गंभीर चोट|हड्डी टूट|फ्रैक्चर|गिर गया ऊंचाई/, 3],
    [/durghatna|hadsa|takkar|sadak|accident ho/, 3],
  ],
  stroke: [
    [/stroke|face (is )?drooping|drooping|slurred|can'?t (lift|raise) (his|her|their) arm|arm (is )?weak|speech (is )?(slurred|confused)|sudden (weakness|confusion)|can'?t speak properly/, 4],
    [/स्ट्रोक|लकवा|पक्षाघात|चेहरा (टेढ़ा|लटक)|मुंह (टेढ़ा|लटक)|बोल नहीं पा|लड़खड़ा|जुबान लड़खड़ा|हाथ नहीं उठ/, 4],
    [/lakwa|laqwa|paralysis/, 4],
  ],
  chest: [
    [/chest (pain|tight|pressure|hurts)|heart attack|pain in (his|her|their|the) chest|tight(ness)? in (the )?chest|crushing/, 4],
    [/सीने में|छाती में|सीने का दर्द|छाती का दर्द|हार्ट अटैक|दिल का दौरा|दिल में दर्द/, 4],
    [/seene mein|chhati mein|dil ka daura|heart attack/, 4],
  ],
  allergic: [
    [/allerg|anaphyla|swollen (face|lips|tongue|throat)|swelling (of|in) (the )?(face|lips|tongue|throat)|hives|bee sting|wasp sting|epipen|adrenaline|reaction to/, 4],
    [/एलर्जी|एलर्जिक|सूजन|सूज गया|सूज गई|सूज गए|मधुमक्खी|ततैया|डंक|रिएक्शन/, 4],
    [/allergy|elarji|sujan/, 4],
  ],
  poison: [
    [/poison|toxic|chemical|swallowed (something|a|some|the)|drank (something|bleach|acid|cleaner|pesticide)|overdose|pesticide|acid|bleach|kerosene|fumes|gas leak|inhaled/, 4],
    [/जहर|विष|जहरीली|जहरीला|ज़हर|रसायन|केमिकल|कीटनाशक|फिनायल|तेजाब|एसिड|मिट्टी का तेल|खा ली|पी ली|धुआं|गैस/, 4],
    [/zeher|jehar|vish|keetnashak/, 4],
  ],
};

/* Review flags, sources — shown on the About page and mirrored in docs/safety-and-sources.md */
const REVIEW_FLAGS = {
  en: [
    'Every step in all 10 scenarios is provisional and needs review by qualified Indian emergency-care professionals.',
    'Choking: adults only. Child and infant protocols, pregnancy and very large adults (chest thrusts) are NOT covered and must be reviewed and added.',
    'Burns: cooling duration (about 20 minutes here) and cling film vs. non-stick dressing differ between sources and need expert confirmation.',
    'Severe bleeding: tourniquet use is deliberately left out. “Press around an embedded object” needs expert wording.',
    'Chest pain: aspirin and any other medicine advice is deliberately NOT included because sources differ; this needs clinical review before any inclusion.',
    'Stroke: “note the time” and “no food, drink or medicine” need confirmation against an authoritative Indian protocol.',
    'Allergic reaction: second-dose timing and positioning come from UK guidance and need review for Indian devices and practice.',
    'Poisoning: no Indian poison-helpline number is shown because it was not verified from a primary source. Rinse durations and fresh-air movement are not specified because they were not verified.',
    'Hindi translations have not been reviewed by a qualified medical translator.',
    'Browser text-to-speech voices vary by device; Hindi may be unavailable on some computers and phones.',
  ],
  hi: [
    'सभी 10 परिदृश्यों का प्रत्येक चरण अस्थायी है और योग्य भारतीय आपातकालीन-देखभाल विशेषज्ञों की समीक्षा चाहिए।',
    'दम घुटना: केवल वयस्क। बच्चों, शिशुओं, गर्भावस्था और बहुत भारी वयस्कों (छाती पर दबाव) का प्रोटोकॉल शामिल नहीं है; इसे समीक्षा करके जोड़ना होगा।',
    'जलना: ठंडा करने की अवधि (यहाँ लगभग 20 मिनट) और क्लिंग फ़िल्म बनाम नॉन-स्टिक पट्टी स्रोतों में अलग हैं; विशेषज्ञ पुष्टि चाहिए।',
    'गंभीर रक्तस्राव: टूर्निकेट जानबूझकर शामिल नहीं किया गया। “धँसी वस्तु के आसपास दबाव” के लिए विशेषज्ञ शब्दावली चाहिए।',
    'सीने में दर्द: एस्पिरिन या कोई भी दवा की सलाह जानबूझकर शामिल नहीं की गई क्योंकि स्रोत अलग हैं; शामिल करने से पहले चिकित्सकीय समीक्षा चाहिए।',
    'स्ट्रोक: “समय नोट करें” और “खाना, पीना या दवा नहीं” की पुष्टि किसी प्रामाणिक भारतीय प्रोटोकॉल से होनी चाहिए।',
    'एलर्जी: दूसरी खुराक का समय और लिटाने की स्थिति ब्रिटेन के मार्गदर्शन से है; भारतीय डिवाइस और प्रथा के लिए समीक्षा चाहिए।',
    'ज़हर: कोई भारतीय पॉइज़न हेल्पलाइन नंबर नहीं दिखाया गया क्योंकि प्राथमिक स्रोत से सत्यापित नहीं हुआ। धोने की अवधि और ताज़ी हवा में ले जाने का निर्देश नहीं दिया गया क्योंकि सत्यापित नहीं था।',
    'हिंदी अनुवाद की किसी योग्य मेडिकल अनुवादक ने समीक्षा नहीं की है।',
    'ब्राउज़र की आवाज़ें डिवाइस के अनुसार अलग होती हैं; कुछ कंप्यूटर और फ़ोन पर हिंदी आवाज़ उपलब्ध नहीं हो सकती।',
  ],
};

/* Sources: what was ACTUALLY read, and how. (Honest record — see docs/safety-and-sources.md) */
const SOURCES = [
  { label: 'NHS — Anaphylaxis', url: 'https://www.nhs.uk/conditions/anaphylaxis/', how: { en: 'page read directly', hi: 'पेज सीधे पढ़ा गया' } },
  { label: 'NHS — Burns and scalds', url: 'https://www.nhs.uk/conditions/burns-and-scalds/treatment/', how: { en: 'page fetched directly', hi: 'पेज सीधे प्राप्त किया गया' } },
  { label: 'American Red Cross — First aid & CPR', url: 'https://www.redcross.org/take-a-class/first-aid', how: { en: 'class pages fetched; they contain no step-by-step instructions. Step wording was cross-checked through search summaries that cite Red Cross, NHS and St John Ambulance guidance — not read page-by-page.', hi: 'क्लास पेज प्राप्त किए गए; उनमें चरण-दर-चरण निर्देश नहीं हैं। चरणों की शब्दावली Red Cross, NHS और St John Ambulance का हवाला देने वाले खोज-सारांशों से मिलाई गई — पेज-दर-पेज नहीं पढ़ी गई।' } },
  { label: 'Government of India — 112.gov.in', url: 'https://112.gov.in/', how: { en: 'could NOT be opened from the build environment (connection timed out). 112 as the single national emergency number is taken from search summaries citing government sources.', hi: 'निर्माण परिवेश से खोला नहीं जा सका (कनेक्शन समय-सीमा पार)। 112 राष्ट्रीय आपातकालीन नंबर है, यह सरकारी स्रोतों का हवाला देने वाले खोज-सारांशों से लिया गया।' } },
];

window.PD_DATA = { ICONS, ART, SCENARIOS, MATCH, REVIEW_FLAGS, SOURCES };
