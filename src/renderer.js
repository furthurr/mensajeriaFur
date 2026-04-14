const SERVICE_ICONS = {
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
  slack: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>`,
  messenger: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.389 0 01.002 11.64zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z"/></svg>`,
  discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>`,
  googlechat: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.637 0C.733 0 0 .733 0 1.637v16.5c0 .904.733 1.636 1.637 1.636h3.955v3.323c0 .804.97 1.207 1.539.638l3.963-3.96h11.27c.903 0 1.636-.733 1.636-1.637V5.592L18.408 0Zm3.955 5.592h12.816v8.59H8.455l-2.863 2.863Z"/></svg>`,
  teams: `<svg viewBox="0 0 24 24" fill="none"><circle cx="17.6" cy="7.1" r="2.4" fill="currentColor" opacity="0.78"/><path d="M15.8 10h1.8A2.4 2.4 0 0 1 20 12.4v3.7a1.9 1.9 0 0 1-1.9 1.9h-2.3Z" fill="currentColor" opacity="0.78"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 4A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h7A1.5 1.5 0 0 0 15 18.5v-13A1.5 1.5 0 0 0 13.5 4Zm.8 2.7c0-.387.313-.7.7-.7h4a.7.7 0 1 1 0 1.4h-1.3v6a.7.7 0 0 1-.7.7H9.3a.7.7 0 0 1-.7-.7v-6H8a.7.7 0 0 1-.7-.7Z" fill="currentColor"/></svg>`,
  signal: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" stroke-dasharray="2 2"/><path d="M8 9.5h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4l-3 2v-2H8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z" fill="currentColor"/></svg>`,
  skype: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.1 5.7a5.5 5.5 0 0 0-7.2 1.6 4.4 4.4 0 0 0-5.4 4.3A4.4 4.4 0 0 0 7.9 16 5.2 5.2 0 0 0 12 18a5.3 5.3 0 0 0 5-3.5 4.3 4.3 0 0 0-.9-8.8Zm-6 8.6c.5.36 1.16.55 1.92.55.8 0 1.34-.27 1.34-.73 0-.49-.33-.68-1.55-.95-1.54-.33-2.38-.87-2.38-2.03 0-1.23 1.08-2.08 2.68-2.08.72 0 1.4.16 1.95.47v1.49a3.25 3.25 0 0 0-1.77-.57c-.65 0-1.07.23-1.07.63 0 .43.36.61 1.56.89 1.56.35 2.37.9 2.37 2.1 0 1.27-1.1 2.16-2.83 2.16a4.8 4.8 0 0 1-2.22-.52Z"/></svg>`,
  wechat: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 5C5.134 5 2 7.686 2 11c0 1.874 1.004 3.547 2.574 4.646L4 19l3.186-1.593C7.781 17.79 8.377 18 9 18c3.866 0 7-2.686 7-6s-3.134-7-7-7Zm-2 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/><path d="M17 10c-2.761 0-5 1.79-5 4 0 .46.1.9.283 1.303L11 19l2.215-1.107c.52.216 1.123.337 1.785.337 2.761 0 5-1.79 5-4s-2.239-4-5-4Zm-1.5 4a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm3 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" opacity="0.9"/></svg>`,
  line: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>`,
  viber: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.03-.644-.215-1.178-.58-1.557-.367-.378-.893-.574-1.52-.607h-.018z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg>`,
  xdm: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.02 6.881L22 22h-5.49l-4.3-5.606L7.3 22H4.54l6.44-7.363L2 2h5.63l3.887 5.105L18.244 2Zm-.967 18h1.526L6.8 3.895H5.163L17.277 20Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.18h.05c.53-1.01 1.84-2.18 3.79-2.18 4.05 0 4.8 2.67 4.8 6.13V24h-4v-8.72c0-2.08-.04-4.75-2.89-4.75-2.89 0-3.33 2.26-3.33 4.6V24h-4V8Z"/></svg>`,
  zendesk: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.914 2.904V16.29L24 2.905H12.914zM0 2.906C0 5.966 2.483 8.45 5.543 8.45s5.542-2.484 5.543-5.544H0zm11.086 4.807L0 21.096h11.086V7.713zm7.37 7.84c-3.063 0-5.542 2.48-5.542 5.543H24c0-3.06-2.48-5.543-5.543-5.543z"/></svg>`,
  intercom: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.658 1.343 3 3 3h18c1.658 0 3-1.342 3-3V3c0-1.657-1.342-3-3-3zm-5.801 4.399c0-.44.36-.8.802-.8.44 0 .8.36.8.8v10.688c0 .442-.36.801-.8.801-.443 0-.802-.359-.802-.801V4.399zM11.2 3.994c0-.44.357-.799.8-.799s.8.359.8.799v11.602c0 .44-.357.8-.8.8s-.8-.36-.8-.8V3.994zm-4 .405c0-.44.359-.8.799-.8.443 0 .802.36.802.8v10.688c0 .442-.36.801-.802.801-.44 0-.799-.359-.799-.801V4.399zM3.199 6c0-.442.36-.8.802-.8.44 0 .799.358.799.8v7.195c0 .441-.359.8-.799.8-.443 0-.802-.36-.802-.8V6zM20.52 18.202c-.123.105-3.086 2.593-8.52 2.593-5.433 0-8.397-2.486-8.521-2.593-.335-.288-.375-.792-.086-1.128.285-.334.79-.375 1.125-.09.047.041 2.693 2.211 7.481 2.211 4.848 0 7.456-2.186 7.479-2.207.334-.289.839-.25 1.128.086.289.336.25.84-.086 1.128zm.281-5.007c0 .441-.36.8-.801.8-.441 0-.801-.36-.801-.8V6c0-.442.361-.8.801-.8.441 0 .801.357.801.8v7.195z"/></svg>`,
  googlemessages: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 5h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-5l-5 4v-4H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" fill="currentColor"/><path d="M8 10h8M8 13h5" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>`
};

let instances = [];
let sidebarOrder = [];
let settingsOrder = [];
let activeInstanceId = null;
let serviceTypes = [];
let draggedSidebarId = null;
let draggedSettingsId = null;
let selectedServiceType = null;
let nativeViewVisible = true;
let appInfo = {
  name: 'MensajeriaFur',
  version: '1.0.0'
};
let preferences = {
  theme: 'system',
  openAtLogin: false,
  restoreLastActiveInstance: true,
  confirmBeforeDelete: true,
  notificationsEnabled: true,
  soundsEnabled: true
};
let themeMediaQuery = null;

const elements = {};

function cacheElements() {
  elements.serviceList = document.getElementById('service-list');
  elements.welcome = document.getElementById('welcome');
  elements.loading = document.getElementById('loading');
  elements.settingsPanel = document.getElementById('settings-panel');
  elements.settingsOverlay = document.getElementById('settings-overlay');
  elements.settingsList = document.getElementById('settings-list');
  elements.instancePopup = document.getElementById('instance-popup');
  elements.popupIcon = document.getElementById('popup-icon');
  elements.popupName = document.getElementById('popup-name');
  elements.popupReload = document.getElementById('popup-reload');
  elements.popupDelete = document.getElementById('popup-delete');
  elements.serviceSelectorModal = document.getElementById('service-selector-modal');
  elements.serviceGrid = document.getElementById('service-grid');
  elements.welcomeServiceChips = document.getElementById('welcome-service-chips');
  elements.addNameModal = document.getElementById('add-name-modal');
  elements.addNameTitle = document.getElementById('add-name-title');
  elements.instanceNameInput = document.getElementById('instance-name');
  elements.confirmDeleteModal = document.getElementById('confirm-delete-modal');
  elements.deleteInstanceName = document.getElementById('delete-instance-name');
  elements.aboutAppModal = document.getElementById('about-app-modal');
  elements.aboutAppName = document.getElementById('about-app-name');
  elements.aboutAppVersion = document.getElementById('about-app-version');
}

async function init() {
  cacheElements();
  
  [instances, sidebarOrder, settingsOrder, serviceTypes, activeInstanceId, appInfo, preferences] = await Promise.all([
    window.api.getInstances(),
    window.api.getSidebarOrder(),
    window.api.getSettingsOrder(),
    window.api.getServiceTypes(),
    window.api.getActiveInstance(),
    window.api.getAppInfo(),
    window.api.getPreferences()
  ]);

  setupThemeListener();
  applyTheme();
  renderSidebar();
  renderWelcomeServiceChips();
  setupEventListeners();
  
  window.api.onInstancesChanged((newInstances) => {
    instances = newInstances;
    renderSidebar();
    renderSettingsPanel();
  });

  window.api.onActiveInstanceChanged((instanceId) => {
    activeInstanceId = instanceId;
    updateSidebarActiveState();
  });
}

function renderSidebar() {
  elements.serviceList.innerHTML = '';
  
  const enabledInstances = sidebarOrder
    .map(id => instances.find(i => i.id === id))
    .filter(i => i && i.enabled);

  enabledInstances.forEach((instance, index) => {
    const serviceType = serviceTypes.find(st => st.id === instance.serviceType);
    if (!serviceType) return;

    const btn = document.createElement('button');
    btn.className = 'service-btn';
    btn.setAttribute('data-instance-id', instance.id);
    btn.setAttribute('draggable', 'true');
    btn.setAttribute('data-tooltip', `${serviceType.name} - ${instance.name}`);
    btn.innerHTML = `<span class="service-icon">${SERVICE_ICONS[instance.serviceType]}</span>`;
    btn.style.setProperty('--service-color', serviceType.color);

    if (instance.id === activeInstanceId) {
      btn.classList.add('active');
      btn.style.background = serviceType.color + '22';
      btn.style.color = serviceType.color;
    }

    elements.serviceList.appendChild(btn);
  });

  const hasEnabledInstances = enabledInstances.length > 0;
  elements.welcome.classList.toggle('hidden', hasEnabledInstances);

  attachSidebarEvents();
  setupSidebarDragAndDrop();
}

function renderWelcomeServiceChips() {
  if (!elements.welcomeServiceChips) return;

  elements.welcomeServiceChips.innerHTML = '';

  serviceTypes.forEach(type => {
    const chip = document.createElement('span');
    chip.className = 'welcome-chip';
    chip.setAttribute('title', type.name);
    chip.setAttribute('aria-label', type.name);
    chip.innerHTML = SERVICE_ICONS[type.id] || '';
    chip.style.color = type.color;
    elements.welcomeServiceChips.appendChild(chip);
  });
}

function attachSidebarEvents() {
  const buttons = elements.serviceList.querySelectorAll('.service-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const instanceId = btn.getAttribute('data-instance-id');
      if (instanceId === activeInstanceId) {
        showInstancePopup(instanceId, btn);
      } else {
        switchToInstance(instanceId);
      }
    });

    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const instanceId = btn.getAttribute('data-instance-id');
      showInstancePopup(instanceId, btn);
    });
  });
}

function syncNativeViewVisibility() {
  const shouldHideNativeView =
    !elements.instancePopup.classList.contains('hidden') ||
    elements.settingsPanel.classList.contains('visible') ||
    !elements.serviceSelectorModal.classList.contains('hidden') ||
    !elements.addNameModal.classList.contains('hidden') ||
    !elements.confirmDeleteModal.classList.contains('hidden') ||
    !elements.aboutAppModal.classList.contains('hidden');

  const nextVisible = !shouldHideNativeView;
  if (nextVisible === nativeViewVisible) {
    return;
  }

  nativeViewVisible = nextVisible;
  window.api.setActiveViewVisible(nextVisible);
}

function setupSidebarDragAndDrop() {
  const buttons = elements.serviceList.querySelectorAll('.service-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('dragstart', (e) => {
      draggedSidebarId = btn.getAttribute('data-instance-id');
      btn.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    btn.addEventListener('dragend', () => {
      btn.classList.remove('dragging');
      draggedSidebarId = null;
      buttons.forEach(b => b.classList.remove('drag-over'));
    });

    btn.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (draggedSidebarId && btn.getAttribute('data-instance-id') !== draggedSidebarId) {
        btn.classList.add('drag-over');
      }
    });

    btn.addEventListener('dragleave', () => {
      btn.classList.remove('drag-over');
    });

    btn.addEventListener('drop', async (e) => {
      e.preventDefault();
      btn.classList.remove('drag-over');
      
      const targetId = btn.getAttribute('data-instance-id');
      if (draggedSidebarId && targetId && draggedSidebarId !== targetId) {
        const currentOrder = [...sidebarOrder];
        const fromIndex = currentOrder.indexOf(draggedSidebarId);
        const toIndex = currentOrder.indexOf(targetId);
        
        currentOrder.splice(fromIndex, 1);
        currentOrder.splice(toIndex, 0, draggedSidebarId);
        
        sidebarOrder = currentOrder;
        window.api.reorderSidebar(sidebarOrder);
        renderSidebar();
      }
    });
  });
}

function showInstancePopup(instanceId, btn) {
  const instance = instances.find(i => i.id === instanceId);
  const serviceType = serviceTypes.find(st => st.id === instance.serviceType);
  if (!instance || !serviceType) return;

  const rect = btn.getBoundingClientRect();
  
  elements.popupIcon.innerHTML = SERVICE_ICONS[instance.serviceType];
  elements.popupName.textContent = `${serviceType.name} - ${instance.name}`;
  
  elements.instancePopup.style.left = `${rect.right + 10}px`;
  elements.instancePopup.style.top = `${rect.top}px`;
  elements.instancePopup.classList.remove('hidden');
  syncNativeViewVisibility();

  elements.popupReload.onclick = () => {
    window.api.reloadInstance(instanceId);
    hideInstancePopup();
  };

  elements.popupDelete.onclick = () => {
    hideInstancePopup();
    requestDeleteInstance(instanceId);
  };
}

function hideInstancePopup() {
  elements.instancePopup.classList.add('hidden');
  syncNativeViewVisibility();
}

function switchToInstance(instanceId) {
  hideInstancePopup();
  elements.welcome.classList.add('hidden');
  elements.loading.classList.remove('hidden');
  
  window.api.switchInstance(instanceId);
  activeInstanceId = instanceId;
  updateSidebarActiveState();

  const checkLoading = setInterval(() => {
    const instance = instances.find(i => i.id === instanceId);
    if (instance) {
      clearInterval(checkLoading);
      elements.loading.classList.add('hidden');
    }
  }, 500);

  setTimeout(() => {
    clearInterval(checkLoading);
    elements.loading.classList.add('hidden');
  }, 10000);
}

function updateSidebarActiveState() {
  const buttons = elements.serviceList.querySelectorAll('.service-btn');
  buttons.forEach(btn => {
    const id = btn.getAttribute('data-instance-id');
    const instance = instances.find(i => i.id === id);
    const serviceType = serviceTypes.find(st => st.id === instance?.serviceType);
    
    btn.classList.remove('active');
    btn.style.background = '';
    btn.style.color = '';
    
    if (id === activeInstanceId && instance && serviceType) {
      btn.classList.add('active');
      btn.style.background = serviceType.color + '22';
      btn.style.color = serviceType.color;
    }
  });
}

function renderSettingsPanel() {
  elements.settingsList.innerHTML = '';

  const preferencesSection = document.createElement('div');
  preferencesSection.className = 'settings-section';
  preferencesSection.innerHTML = `
    <div class="settings-block">
      <div class="settings-block-header">
        <h3>Apariencia</h3>
        <p>Controla como se ve MensajeriaFur.</p>
      </div>
      <div class="setting-row setting-row-stacked">
        <div class="setting-copy">
          <strong>Tema</strong>
          <span>Usa el tema del sistema o fuerza un modo fijo.</span>
        </div>
        <div class="theme-segmented" role="group" aria-label="Tema">
          <button class="theme-option ${preferences.theme === 'system' ? 'active' : ''}" data-theme-value="system" type="button">Sistema</button>
          <button class="theme-option ${preferences.theme === 'dark' ? 'active' : ''}" data-theme-value="dark" type="button">Oscuro</button>
          <button class="theme-option ${preferences.theme === 'light' ? 'active' : ''}" data-theme-value="light" type="button">Claro</button>
        </div>
      </div>
    </div>

    <div class="settings-block">
      <div class="settings-block-header">
        <h3>General</h3>
        <p>Preferencias del comportamiento principal de la app.</p>
      </div>
      ${renderPreferenceToggle('openAtLogin', 'Abrir al iniciar sesión', 'Lanza la aplicación automáticamente al entrar a tu equipo.')}
      ${renderPreferenceToggle('restoreLastActiveInstance', 'Restaurar última app activa', 'Al abrir la app vuelve al último servicio que estabas usando.')}
      ${renderPreferenceToggle('confirmBeforeDelete', 'Confirmar antes de eliminar', 'Pide confirmación antes de borrar una instancia.')}
    </div>

    <div class="settings-block">
      <div class="settings-block-header">
        <h3>Notificaciones</h3>
        <p>Controla alertas y audio globales.</p>
      </div>
      ${renderPreferenceToggle('notificationsEnabled', 'Permitir notificaciones', 'Bloquea nuevas solicitudes de notificaciones de los servicios.')}
      ${renderPreferenceToggle('soundsEnabled', 'Permitir sonidos', 'Silencia el audio de todas las apps abiertas dentro de MensajeriaFur.')}
    </div>

    <div class="settings-block">
      <div class="settings-block-header">
        <h3>Acerca de</h3>
        <p>Informacion, autoria y enlaces del proyecto.</p>
      </div>
      <button class="settings-link-btn" id="btn-open-about-from-settings" type="button">Ver informacion de la aplicación</button>
    </div>

    <div class="settings-block settings-services-block">
      <div class="settings-block-header">
        <h3>Servicios</h3>
        <p>Activa, desactiva y ordena tus instancias.</p>
      </div>
      <div id="settings-services-groups"></div>
    </div>
  `;

  elements.settingsList.appendChild(preferencesSection);
  const servicesContainer = document.getElementById('settings-services-groups');

  const groupedInstances = {};
  instances.forEach(instance => {
    if (!groupedInstances[instance.serviceType]) {
      groupedInstances[instance.serviceType] = [];
    }
    groupedInstances[instance.serviceType].push(instance);
  });

  const orderedServiceTypes = [
    'whatsapp',
    'telegram',
    'slack',
    'messenger',
    'discord',
    'googlechat',
    'teams',
    'signal',
    'skype',
    'wechat',
    'line',
    'viber',
    'instagram',
    'xdm',
    'linkedin',
    'zendesk',
    'intercom',
    'googlemessages'
  ];
  
  orderedServiceTypes.forEach(serviceTypeId => {
    const serviceType = serviceTypes.find(st => st.id === serviceTypeId);
    if (!serviceType || !groupedInstances[serviceTypeId]?.length) return;

    const groupEl = document.createElement('div');
    groupEl.className = 'service-group';
    groupEl.innerHTML = `
      <div class="service-group-header" draggable="true" data-group="${serviceTypeId}">
        <span class="group-icon">${SERVICE_ICONS[serviceTypeId]}</span>
        <span>${serviceType.name}</span>
      </div>
    `;

    const groupInstances = groupedInstances[serviceTypeId];
    groupInstances.forEach(instance => {
      const itemEl = document.createElement('div');
      itemEl.className = 'instance-item';
      itemEl.setAttribute('draggable', 'true');
      itemEl.setAttribute('data-instance-id', instance.id);
      
      const isLast = groupInstances.length === 1;
      
      itemEl.innerHTML = `
        <div class="instance-drag">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
        <div class="instance-icon">${SERVICE_ICONS[instance.serviceType]}</div>
        <div class="instance-info">
          <div class="instance-name">${instance.name}</div>
        </div>
        <div class="instance-toggle ${instance.enabled ? 'active' : ''}" data-instance-id="${instance.id}"></div>
        <div class="instance-actions">
          <button class="instance-btn btn-delete" data-instance-id="${instance.id}" title="Eliminar">×</button>
          ${!isLast ? '' : `<button class="instance-btn btn-add" data-service-type="${instance.serviceType}" title="Agregar">+</button>`}
        </div>
      `;

      groupEl.appendChild(itemEl);
    });

    servicesContainer.appendChild(groupEl);
  });

  setupSettingsDragAndDrop();
  setupSettingsEventListeners();
}

function renderPreferenceToggle(key, title, description) {
  return `
    <div class="setting-row">
      <div class="setting-copy">
        <strong>${title}</strong>
        <span>${description}</span>
      </div>
      <button
        class="preference-toggle instance-toggle ${preferences[key] ? 'active' : ''}"
        type="button"
        aria-pressed="${preferences[key] ? 'true' : 'false'}"
        data-pref-key="${key}"></button>
    </div>
  `;
}

function setupSettingsDragAndDrop() {
  const items = elements.settingsList.querySelectorAll('.instance-item');
  
  items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      draggedSettingsId = item.getAttribute('data-instance-id');
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      draggedSettingsId = null;
      items.forEach(i => i.classList.remove('drag-over'));
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (draggedSettingsId && item.getAttribute('data-instance-id') !== draggedSettingsId) {
        item.classList.add('drag-over');
      }
    });

    item.addEventListener('dragleave', () => {
      item.classList.remove('drag-over');
    });

    item.addEventListener('drop', async (e) => {
      e.preventDefault();
      item.classList.remove('drag-over');
      
      const targetId = item.getAttribute('data-instance-id');
      if (draggedSettingsId && targetId && draggedSettingsId !== targetId) {
        const currentOrder = [...settingsOrder];
        const fromIndex = currentOrder.indexOf(draggedSettingsId);
        const toIndex = currentOrder.indexOf(targetId);
        
        currentOrder.splice(fromIndex, 1);
        currentOrder.splice(toIndex, 0, draggedSettingsId);
        
        settingsOrder = currentOrder;
        window.api.reorderSettings(settingsOrder);
        renderSettingsPanel();
      }
    });
  });
}

function setupSettingsEventListeners() {
  const preferenceToggles = elements.settingsList.querySelectorAll('.preference-toggle');
  preferenceToggles.forEach(toggle => {
    toggle.addEventListener('click', async () => {
      const key = toggle.getAttribute('data-pref-key');
      preferences = await window.api.updatePreferences({ [key]: !preferences[key] });
      applyTheme();
      renderSettingsPanel();
    });
  });

  const themeOptions = elements.settingsList.querySelectorAll('.theme-option');
  themeOptions.forEach(btn => {
    btn.addEventListener('click', async () => {
      const nextTheme = btn.getAttribute('data-theme-value');
      if (nextTheme === preferences.theme) return;
      preferences = await window.api.updatePreferences({ theme: nextTheme });
      applyTheme();
      renderSettingsPanel();
    });
  });

  const aboutBtn = document.getElementById('btn-open-about-from-settings');
  if (aboutBtn) {
    aboutBtn.addEventListener('click', () => {
      closeSettings();
      setTimeout(() => showAboutApp(), 220);
    });
  }

  const toggles = elements.settingsList.querySelectorAll('.instance-toggle');
  toggles.forEach(toggle => {
    if (toggle.classList.contains('preference-toggle')) return;
    toggle.addEventListener('click', async () => {
      const instanceId = toggle.getAttribute('data-instance-id');
      const instance = instances.find(i => i.id === instanceId);
      if (instance) {
        await window.api.updateInstance(instanceId, { enabled: !instance.enabled });
        instances = await window.api.getInstances();
        renderSidebar();
        renderSettingsPanel();
      }
    });
  });

  const deleteBtns = elements.settingsList.querySelectorAll('.btn-delete');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const instanceId = btn.getAttribute('data-instance-id');
      requestDeleteInstance(instanceId);
    });
  });

  const addBtns = elements.settingsList.querySelectorAll('.btn-add');
  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceType = btn.getAttribute('data-service-type');
      showServiceSelector(serviceType);
    });
  });
}

function setupEventListeners() {
  document.getElementById('sidebar-app-icon').addEventListener('click', showAboutApp);
  document.getElementById('btn-open-settings').addEventListener('click', openSettings);
  document.getElementById('btn-settings').addEventListener('click', () => {
    hideInstancePopup();
    showServiceSelector();
  });
  document.getElementById('welcome-primary-action').addEventListener('click', () => showServiceSelector());
  document.getElementById('welcome-secondary-action').addEventListener('click', () => showServiceSelector());
  document.getElementById('btn-close-settings').addEventListener('click', closeSettings);
  elements.settingsOverlay.addEventListener('click', closeSettings);

  document.getElementById('btn-add-service').addEventListener('click', () => showServiceSelector());

  document.getElementById('btn-close-service-selector').addEventListener('click', closeServiceSelector);
  document.getElementById('btn-close-add-name').addEventListener('click', closeAddName);
  document.getElementById('btn-cancel-add').addEventListener('click', closeAddName);
  document.getElementById('btn-confirm-add').addEventListener('click', confirmAddInstance);

  document.getElementById('btn-close-confirm').addEventListener('click', closeConfirmDelete);
  document.getElementById('btn-cancel-delete').addEventListener('click', closeConfirmDelete);
  document.getElementById('btn-confirm-delete').addEventListener('click', confirmDeleteInstance);
  document.getElementById('btn-close-about-app').addEventListener('click', closeAboutApp);
  document.getElementById('about-github-link').addEventListener('click', () => {
    window.api.openExternal('https://github.com/furthurr');
  });
  elements.aboutAppModal.addEventListener('click', (e) => {
    if (e.target === elements.aboutAppModal) {
      closeAboutApp();
    }
  });

  document.addEventListener('click', (e) => {
    if (!elements.instancePopup.contains(e.target) && 
        !e.target.closest('.service-btn')) {
      hideInstancePopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSettings();
      closeServiceSelector();
      closeAddName();
      closeConfirmDelete();
      closeAboutApp();
      hideInstancePopup();
    }
  });
}

function showAboutApp() {
  closeSettings();
  hideInstancePopup();
  elements.aboutAppName.textContent = appInfo.name;
  elements.aboutAppVersion.textContent = `Version ${appInfo.version}`;
  elements.aboutAppModal.classList.add('visible');
  elements.aboutAppModal.classList.remove('hidden');
  syncNativeViewVisibility();
}

function requestDeleteInstance(instanceId) {
  if (preferences.confirmBeforeDelete) {
    showConfirmDelete(instanceId);
    return;
  }

  elements.confirmDeleteModal.setAttribute('data-delete-instance-id', instanceId);
  confirmDeleteInstance();
}

function closeAboutApp() {
  elements.aboutAppModal.classList.remove('visible');
  setTimeout(() => {
    elements.aboutAppModal.classList.add('hidden');
    syncNativeViewVisibility();
  }, 200);
}

function openSettings() {
  hideInstancePopup();
  elements.settingsPanel.classList.add('visible');
  elements.settingsOverlay.classList.add('visible');
  elements.settingsOverlay.classList.remove('hidden');
  renderSettingsPanel();
  syncNativeViewVisibility();
}

function closeSettings() {
  elements.settingsPanel.classList.remove('visible');
  elements.settingsOverlay.classList.remove('visible');
  setTimeout(() => {
    elements.settingsOverlay.classList.add('hidden');
    syncNativeViewVisibility();
  }, 300);
}

function showServiceSelector(defaultType = null) {
  closeSettings();
  elements.serviceGrid.innerHTML = '';
  
  serviceTypes.forEach(type => {
    const option = document.createElement('div');
    option.className = 'service-option';
    option.setAttribute('data-service-type', type.id);
    option.innerHTML = `
      <span class="service-option-icon">${SERVICE_ICONS[type.id]}</span>
      <span class="service-option-name">${type.name}</span>
    `;
    option.addEventListener('click', () => selectServiceType(type.id));
    elements.serviceGrid.appendChild(option);
  });

  selectedServiceType = defaultType;
  elements.serviceSelectorModal.classList.add('visible');
  elements.serviceSelectorModal.classList.remove('hidden');
  syncNativeViewVisibility();
}

function closeServiceSelector() {
  elements.serviceSelectorModal.classList.remove('visible');
  setTimeout(() => {
    elements.serviceSelectorModal.classList.add('hidden');
    syncNativeViewVisibility();
  }, 200);
}

function selectServiceType(serviceTypeId) {
  selectedServiceType = serviceTypeId;
  const serviceType = serviceTypes.find(st => st.id === serviceTypeId);
  
  elements.addNameTitle.textContent = `Agregar ${serviceType.name}`;
  elements.instanceNameInput.value = '';
  elements.instanceNameInput.placeholder = `ej: Trabajo, Personal, Familia`;
  
  closeServiceSelector();
  setTimeout(() => {
    elements.addNameModal.classList.add('visible');
    elements.addNameModal.classList.remove('hidden');
    elements.instanceNameInput.focus();
    syncNativeViewVisibility();
  }, 200);
}

function closeAddName() {
  elements.addNameModal.classList.remove('visible');
  setTimeout(() => {
    elements.addNameModal.classList.add('hidden');
    syncNativeViewVisibility();
  }, 200);
  selectedServiceType = null;
}

async function confirmAddInstance() {
  const name = elements.instanceNameInput.value.trim() || null;
  
  if (selectedServiceType) {
    const newInstance = await window.api.addInstance(selectedServiceType, name);
    instances = await window.api.getInstances();
    sidebarOrder = await window.api.getSidebarOrder();
    settingsOrder = await window.api.getSettingsOrder();
    closeAddName();
    renderSidebar();
    renderSettingsPanel();
    if (newInstance?.id) {
      switchToInstance(newInstance.id);
    }
  }
}

function showConfirmDelete(instanceId) {
  const instance = instances.find(i => i.id === instanceId);
  if (!instance) return;

  elements.deleteInstanceName.textContent = instance.name;
  elements.confirmDeleteModal.setAttribute('data-delete-instance-id', instanceId);
  elements.confirmDeleteModal.classList.add('visible');
  elements.confirmDeleteModal.classList.remove('hidden');
  syncNativeViewVisibility();
}

function closeConfirmDelete() {
  elements.confirmDeleteModal.classList.remove('visible');
  setTimeout(() => {
    elements.confirmDeleteModal.classList.add('hidden');
    syncNativeViewVisibility();
  }, 200);
  elements.confirmDeleteModal.removeAttribute('data-delete-instance-id');
}

async function confirmDeleteInstance() {
  const instanceId = elements.confirmDeleteModal.getAttribute('data-delete-instance-id');
  if (instanceId) {
    await window.api.deleteInstance(instanceId);
    instances = await window.api.getInstances();
    sidebarOrder = await window.api.getSidebarOrder();
    settingsOrder = await window.api.getSettingsOrder();
    activeInstanceId = await window.api.getActiveInstance();
    closeConfirmDelete();
    renderSidebar();
    renderSettingsPanel();
  }
}

function applyTheme() {
  const resolvedTheme = preferences.theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : preferences.theme;

  document.body.setAttribute('data-theme', resolvedTheme);
}

function setupThemeListener() {
  themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  themeMediaQuery.addEventListener('change', () => {
    if (preferences.theme === 'system') {
      applyTheme();
    }
  });
}

init();
