const { app, BrowserWindow, WebContentsView, ipcMain, session, Menu, shell, desktopCapturer } = require('electron');
const path = require('path');
const crypto = require('crypto');
const Store = require('electron-store');
const { autoUpdater } = require('electron-updater');

const APP_NAME = 'MensajeriaFur';
const APP_ICON_PATH = path.join(__dirname, '..', 'icono.png');
const SUPPORTED_SPELLCHECK_LANGUAGES = ['es-MX', 'es-ES', 'en-US', 'en-GB', 'pt-BR', 'fr-FR', 'de-DE', 'it-IT'];
const DEFAULT_PREFERENCES = {
  theme: 'system',
  openAtLogin: false,
  restoreLastActiveInstance: true,
  confirmBeforeDelete: true,
  notificationsEnabled: true,
  soundsEnabled: true,
  spellcheckLanguage: 'es-MX'
};

const SERVICE_TYPES = {
  whatsapp:  { name: 'WhatsApp', url: 'https://web.whatsapp.com', color: '#25D366', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  telegram:  { name: 'Telegram', url: 'https://web.telegram.org/k/', color: '#0088cc', userAgent: null },
  slack:     { name: 'Slack', url: 'https://app.slack.com/client', color: '#4A154B', userAgent: null },
  messenger: { name: 'Messenger', url: 'https://www.messenger.com', color: '#006AFF', userAgent: null },
  discord:   { name: 'Discord', url: 'https://discord.com/app', color: '#5865F2', userAgent: null },
  googlechat: { name: 'Google Chat', url: 'https://chat.google.com', color: '#34A853', userAgent: null },
  teams: {
    name: 'Microsoft Teams',
    url: 'https://teams.microsoft.com/v2/?clientexperience=t2',
    color: '#6264A7',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0'
  },
  signal: { name: 'Signal', url: 'https://signal.org', color: '#3A76F0', userAgent: null },
  skype: { name: 'Skype', url: 'https://web.skype.com', color: '#00AFF0', userAgent: null },
  wechat: { name: 'WeChat', url: 'https://web.wechat.com', color: '#07C160', userAgent: null },
  line: { name: 'Line', url: 'https://access.line.me', color: '#00C300', userAgent: null },
  viber: { name: 'Viber', url: 'https://account.viber.com/en/login', color: '#7360F2', userAgent: null },
  instagram: { name: 'Instagram Direct', url: 'https://www.instagram.com/direct/inbox/', color: '#E4405F', userAgent: null },
  xdm: { name: 'X / Twitter DM', url: 'https://x.com/messages', color: '#111111', userAgent: null },
  linkedin: { name: 'LinkedIn Messaging', url: 'https://www.linkedin.com/messaging/', color: '#0A66C2', userAgent: null },
  zendesk: { name: 'Zendesk', url: 'https://www.zendesk.com', color: '#03363D', userAgent: null },
  intercom: { name: 'Intercom', url: 'https://app.intercom.com', color: '#1F8DED', userAgent: null },
  googlemessages: { name: 'Google Messages', url: 'https://messages.google.com/web', color: '#1A73E8', userAgent: null }
};

let mainWindow;
let activeInstanceId = null;
const instanceViews = {};
const SIDEBAR_WIDTH = 70;
const TITLEBAR_HEIGHT = 0;
let activeViewVisible = true;
let activeViewAttached = false;
let instanceBadges = {};

let store;
let instances = [];
let sidebarOrder = [];
let settingsOrder = [];
let preferences = { ...DEFAULT_PREFERENCES };

function sanitizePreferences(data = {}) {
  const next = { ...DEFAULT_PREFERENCES, ...data };
  if (!['system', 'dark', 'light'].includes(next.theme)) {
    next.theme = DEFAULT_PREFERENCES.theme;
  }
  next.openAtLogin = Boolean(next.openAtLogin);
  next.restoreLastActiveInstance = Boolean(next.restoreLastActiveInstance);
  next.confirmBeforeDelete = Boolean(next.confirmBeforeDelete);
  next.notificationsEnabled = Boolean(next.notificationsEnabled);
  next.soundsEnabled = Boolean(next.soundsEnabled);
  if (!SUPPORTED_SPELLCHECK_LANGUAGES.includes(next.spellcheckLanguage)) {
    next.spellcheckLanguage = DEFAULT_PREFERENCES.spellcheckLanguage;
  }
  return next;
}

function applyLoginItemSettings() {
  app.setLoginItemSettings({
    openAtLogin: preferences.openAtLogin
  });
}

function applySoundPreference() {
  Object.values(instanceViews).forEach(view => {
    if (view?.webContents) {
      view.webContents.setAudioMuted(!preferences.soundsEnabled);
    }
  });
}

function configureSpellChecker(ses) {
  if (!ses || process.platform === 'darwin') {
    return;
  }

  if (!ses.availableSpellCheckerLanguages.includes(preferences.spellcheckLanguage)) {
    return;
  }

  ses.setSpellCheckerLanguages([preferences.spellcheckLanguage]);
}

function applySpellcheckPreference() {
  Object.values(instanceViews).forEach(view => {
    if (view?.webContents) {
      configureSpellChecker(view.webContents.session);
    }
  });
}

function getEmptyBadgeState() {
  return { hasUnread: false, count: null };
}

function parseUnreadFromTitle(title = '') {
  const leadingCountMatch = title.match(/^\((\d+)\)/);
  if (leadingCountMatch) {
    return { hasUnread: true, count: Number(leadingCountMatch[1]) };
  }

  const trailingCountMatch = title.match(/\b(\d+)\b(?=.*(?:mensaje|mensajes|chat|chats|notification|notifications))/i);
  if (trailingCountMatch) {
    return { hasUnread: true, count: Number(trailingCountMatch[1]) };
  }

  return getEmptyBadgeState();
}

function sendBadgeState(instanceId) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send('badge-state-changed', {
    instanceId,
    ...(instanceBadges[instanceId] || getEmptyBadgeState())
  });
}

function updateBadgeState(instanceId, badge) {
  const nextBadge = badge.hasUnread ? badge : getEmptyBadgeState();
  const currentBadge = instanceBadges[instanceId] || getEmptyBadgeState();

  if (currentBadge.hasUnread === nextBadge.hasUnread && currentBadge.count === nextBadge.count) {
    return;
  }

  instanceBadges[instanceId] = nextBadge;
  sendBadgeState(instanceId);
}

function clearBadgeState(instanceId) {
  updateBadgeState(instanceId, getEmptyBadgeState());
}

function buildEditableContextMenu(webContents, params) {
  const template = [];

  if (params.misspelledWord) {
    if (params.dictionarySuggestions.length) {
      params.dictionarySuggestions.forEach((suggestion) => {
        template.push({
          label: suggestion,
          click: () => webContents.replaceMisspelling(suggestion)
        });
      });
    } else {
      template.push({
        label: 'Sin sugerencias',
        enabled: false
      });
    }

    template.push({ type: 'separator' });
    template.push({
      label: 'Agregar al diccionario',
      click: () => {
        webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord);
      }
    });
  }

  const editItems = [
    {
      label: 'Cortar',
      enabled: params.editFlags.canCut,
      click: () => webContents.cut()
    },
    {
      label: 'Copiar',
      enabled: params.editFlags.canCopy,
      click: () => webContents.copy()
    },
    {
      label: 'Pegar',
      enabled: params.editFlags.canPaste,
      click: () => webContents.paste()
    },
    {
      label: 'Seleccionar todo',
      enabled: params.editFlags.canSelectAll,
      click: () => webContents.selectAll()
    }
  ];

  if (template.length) {
    template.push({ type: 'separator' });
  }

  template.push(...editItems);
  return template;
}

function attachEditableContextMenu(view) {
  view.webContents.on('context-menu', (event, params) => {
    if (!params.isEditable) {
      return;
    }

    const template = buildEditableContextMenu(view.webContents, params);
    if (!template.length) {
      return;
    }

    Menu.buildFromTemplate(template).popup({ window: mainWindow });
  });
}

function attachBadgeTracking(view, instance) {
  view.webContents.on('page-title-updated', (event, title) => {
    const badge = parseUnreadFromTitle(title);
    if (!badge.hasUnread || instance.id === activeInstanceId) {
      clearBadgeState(instance.id);
      return;
    }

    updateBadgeState(instance.id, badge);
  });
}

function updatePreferences(data) {
  preferences = sanitizePreferences({ ...preferences, ...data });
  store.set('preferences', preferences);
  applyLoginItemSettings();
  applySoundPreference();
  applySpellcheckPreference();
  return preferences;
}

function initStore() {
  store = new Store({
    defaults: {
      instances: [],
      sidebarOrder: [],
      settingsOrder: [],
      activeInstanceId: null,
      preferences: DEFAULT_PREFERENCES
    }
  });

  instances = store.get('instances');
  sidebarOrder = store.get('sidebarOrder');
  settingsOrder = store.get('settingsOrder');
  activeInstanceId = store.get('activeInstanceId');
  preferences = sanitizePreferences(store.get('preferences'));
  store.set('preferences', preferences);

  if (activeInstanceId && !instances.some(instance => instance.id === activeInstanceId && instance.enabled)) {
    activeInstanceId = null;
    store.set('activeInstanceId', null);
  }
}

function getInstances() {
  return instances;
}

function getSidebarOrder() {
  return sidebarOrder;
}

function getSettingsOrder() {
  return settingsOrder;
}

function createWindow() {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    title: APP_NAME,
    width: Math.min(1200, width - 100),
    height: Math.min(800, height - 100),
    x: 50,
    y: 50,
    backgroundColor: '#1a1a2e',
    icon: APP_ICON_PATH,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('resize', () => {
    if (activeInstanceId && instanceViews[activeInstanceId]) {
      updateViewBounds(instanceViews[activeInstanceId]);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Window finished loading');

    const enabledInstances = getEnabledSidebarInstances();
    if (!enabledInstances.length) {
      return;
    }

    const preferredInstanceId = preferences.restoreLastActiveInstance ? activeInstanceId : null;
    const initialInstanceId = preferredInstanceId && enabledInstances.some(instance => instance.id === preferredInstanceId)
      ? preferredInstanceId
      : enabledInstances[0].id;

    switchToInstance(initialInstanceId);
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.log('Load failed:', errorCode, errorDescription);
  });
}

function isTeamsAuthPopupUrl(url) {
  if (!url || url === 'about:blank') {
    return true;
  }

  try {
    const { hostname, protocol } = new URL(url);
    const normalizedHost = hostname.toLowerCase();

    if (protocol !== 'https:') {
      return false;
    }

    return normalizedHost === 'login.microsoftonline.com' ||
      normalizedHost.endsWith('.login.microsoftonline.com') ||
      normalizedHost === 'login.live.com' ||
      normalizedHost.endsWith('.live.com') ||
      normalizedHost === 'account.microsoft.com' ||
      normalizedHost.endsWith('.microsoft.com') ||
      normalizedHost === 'teams.microsoft.com';
  } catch {
    return false;
  }
}

function getOrCreateView(instance) {
  if (instanceViews[instance.id]) {
    return instanceViews[instance.id];
  }

  const ses = session.fromPartition(`persist:${instance.id}`);

  ses.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = [
      'notifications',
      'media',
      'mediaKeySystem',
      'clipboard-read',
      'clipboard-sanitized-write',
      'display-capture',
      'screen-capture'
    ];
    if (permission === 'notifications' && !preferences.notificationsEnabled) {
      callback(false);
      return;
    }
    callback(allowed.includes(permission));
  });

  ses.setPermissionCheckHandler((webContents, permission) => {
    const allowed = [
      'media',
      'mediaKeySystem',
      'display-capture',
      'screen-capture',
      'notifications'
    ];
    if (permission === 'notifications' && !preferences.notificationsEnabled) {
      return false;
    }
    return allowed.includes(permission);
  });

  configureSpellChecker(ses);

  const serviceType = SERVICE_TYPES[instance.serviceType];
  const view = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      session: ses,
      spellcheck: true
    }
  });

  if (serviceType.userAgent) {
    view.webContents.setUserAgent(serviceType.userAgent);
  }

  view.webContents.setAudioMuted(!preferences.soundsEnabled);

  view.webContents.setWindowOpenHandler(({ url }) => {
    if (instance.serviceType === 'teams' && isTeamsAuthPopupUrl(url)) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 520,
          height: 720,
          parent: mainWindow,
          autoHideMenuBar: true,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            session: ses,
            spellcheck: true
          }
        }
      };
    }

    shell.openExternal(url);
    return { action: 'deny' };
  });

  attachEditableContextMenu(view);
  attachBadgeTracking(view, instance);

  instanceViews[instance.id] = view;
  return view;
}

function switchToInstance(instanceId) {
  const instance = instances.find(i => i.id === instanceId);
  if (!instance) return;
  const serviceType = SERVICE_TYPES[instance.serviceType];

  if (activeInstanceId && instanceViews[activeInstanceId] && activeViewAttached) {
    try {
      mainWindow.contentView.removeChildView(instanceViews[activeInstanceId]);
    } catch (e) {
    }
    activeViewAttached = false;
  }

  const view = getOrCreateView(instance);

  const currentUrl = view.webContents.getURL();
  const needsTeamsMigration = instance.serviceType === 'teams' && (
    currentUrl.includes('/unsupported-browser') ||
    /^https:\/\/teams\.microsoft\.com\/?$/.test(currentUrl)
  );

  if (!currentUrl || currentUrl === '' || currentUrl === 'about:blank' || needsTeamsMigration) {
    view.webContents.loadURL(serviceType.url);
  }

  activeInstanceId = instanceId;
  store.set('activeInstanceId', activeInstanceId);
  clearBadgeState(instanceId);
  setActiveViewVisible(activeViewVisible);

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('active-instance-changed', instanceId);
    mainWindow.webContents.send('instances-changed', instances);
  }

  rebuildMenu();
}

function updateViewBounds(view) {
  if (!view || !mainWindow || mainWindow.isDestroyed()) return;
  const [width, height] = mainWindow.getContentSize();
  view.setBounds({
    x: SIDEBAR_WIDTH,
    y: TITLEBAR_HEIGHT,
    width: Math.max(0, width - SIDEBAR_WIDTH),
    height: Math.max(0, height - TITLEBAR_HEIGHT)
  });
}

function setActiveViewVisible(visible) {
  activeViewVisible = visible;

  if (!mainWindow || mainWindow.isDestroyed() || !activeInstanceId) {
    return;
  }

  const view = instanceViews[activeInstanceId];
  if (!view) {
    return;
  }

  if (visible) {
    if (!activeViewAttached) {
      mainWindow.contentView.addChildView(view);
      activeViewAttached = true;
    }
    updateViewBounds(view);
    return;
  }

  if (activeViewAttached) {
    try {
      mainWindow.contentView.removeChildView(view);
    } catch (e) {
    }
    activeViewAttached = false;
  }
}

function getEnabledSidebarInstances() {
  return sidebarOrder
    .map(id => instances.find(i => i.id === id))
    .filter(i => i && i.enabled);
}

function rebuildMenu() {
  const enabledInstances = getEnabledSidebarInstances();

  const serviceSubmenu = enabledInstances.map((instance, index) => {
    const serviceType = SERVICE_TYPES[instance.serviceType];
    return {
      label: `${serviceType.name} - ${instance.name}`,
      accelerator: index < 9 ? `CmdOrCtrl+${index + 1}` : null,
      click: () => switchToInstance(instance.id)
    };
  });

  const template = [
    {
      label: app.name,
      submenu: [
        { role: 'about', label: 'Acerca de MensajeríaFur' },
        { type: 'separator' },
        { role: 'hide', label: 'Ocultar' },
        { role: 'hideOthers', label: 'Ocultar Otros' },
        { role: 'unhide', label: 'Mostrar Todo' },
        { type: 'separator' },
        { role: 'quit', label: 'Salir' }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Deshacer' },
        { role: 'redo', label: 'Rehacer' },
        { type: 'separator' },
        { role: 'cut', label: 'Cortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Pegar' },
        { role: 'selectAll', label: 'Seleccionar Todo' }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        { role: 'reload', label: 'Recargar' },
        { role: 'forceReload', label: 'Forzar Recarga' },
        { role: 'toggleDevTools', label: 'Herramientas de Desarrollo' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom Original' },
        { role: 'zoomIn', label: 'Acercar' },
        { role: 'zoomOut', label: 'Alejar' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Pantalla Completa' }
      ]
    },
    {
      label: 'Servicios',
      submenu: serviceSubmenu.length > 0 ? serviceSubmenu : [{ label: 'No hay servicios habilitados', enabled: false }]
    },
    {
      label: 'Ventana',
      submenu: [
        { role: 'minimize', label: 'Minimizar' },
        { role: 'zoom', label: 'Zoom' },
        { role: 'close', label: 'Cerrar' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function addInstance(serviceType, name) {
  const newInstance = {
    id: crypto.randomUUID(),
    serviceType,
    name: name || `${SERVICE_TYPES[serviceType].name} ${instances.filter(i => i.serviceType === serviceType).length + 1}`,
    enabled: true
  };
  instances.push(newInstance);
  store.set('instances', instances);

  sidebarOrder.push(newInstance.id);
  store.set('sidebarOrder', sidebarOrder);

  settingsOrder.push(newInstance.id);
  store.set('settingsOrder', settingsOrder);

  if (!activeInstanceId) {
    activeInstanceId = newInstance.id;
    store.set('activeInstanceId', activeInstanceId);
  }

  rebuildMenu();
  return newInstance;
}

function updateInstance(id, data) {
  const index = instances.findIndex(i => i.id === id);
  if (index === -1) return null;

  instances[index] = { ...instances[index], ...data };
  store.set('instances', instances);

  if (data.enabled !== undefined) {
    rebuildMenu();
  }

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('instances-changed', instances);
  }

  return instances[index];
}

function deleteInstance(id) {
  const instance = instances.find(i => i.id === id);
  if (!instance) return false;

  if (instanceViews[id]) {
    if (activeViewAttached && activeInstanceId === id) {
      try {
        mainWindow.contentView.removeChildView(instanceViews[id]);
      } catch (e) {
      }
      activeViewAttached = false;
    }
    delete instanceViews[id];
  }

  delete instanceBadges[id];

  session.fromPartition(`persist:${id}`).clearStorageData();

  instances = instances.filter(i => i.id !== id);
  store.set('instances', instances);

  sidebarOrder = sidebarOrder.filter(oid => oid !== id);
  store.set('sidebarOrder', sidebarOrder);

  settingsOrder = settingsOrder.filter(oid => oid !== id);
  store.set('settingsOrder', settingsOrder);

  if (activeInstanceId === id) {
    const enabledInstances = getEnabledSidebarInstances();
    if (enabledInstances.length > 0) {
      switchToInstance(enabledInstances[0].id);
    } else {
      activeInstanceId = null;
      store.set('activeInstanceId', null);
    }
  }

  rebuildMenu();

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('instances-changed', instances);
  }

  return true;
}

function reorderSidebar(order) {
  sidebarOrder = order;
  store.set('sidebarOrder', sidebarOrder);
  rebuildMenu();
}

function reorderSettings(order) {
  settingsOrder = order;
  store.set('settingsOrder', settingsOrder);
}

function setupIpcHandlers() {
  ipcMain.handle('get-instances', () => instances);

  ipcMain.handle('get-sidebar-order', () => sidebarOrder);

  ipcMain.handle('get-settings-order', () => settingsOrder);

  ipcMain.handle('get-service-types', () => {
    return Object.entries(SERVICE_TYPES).map(([id, data]) => ({
      id,
      name: data.name,
      color: data.color
    }));
  });

  ipcMain.handle('get-badge-state', () => instanceBadges);

  ipcMain.handle('add-instance', (event, serviceType, name) => {
    if (!SERVICE_TYPES[serviceType]) {
      return { error: 'Invalid service type' };
    }
    return addInstance(serviceType, name);
  });

  ipcMain.handle('update-instance', (event, id, data) => {
    return updateInstance(id, data);
  });

  ipcMain.handle('delete-instance', (event, id) => {
    return deleteInstance(id);
  });

  ipcMain.on('switch-instance', (event, instanceId) => {
    switchToInstance(instanceId);
  });

  ipcMain.on('reload-instance', (event, instanceId) => {
    if (instanceViews[instanceId]) {
      instanceViews[instanceId].webContents.reload();
    }
  });

  ipcMain.on('show-instance-context-menu', (event, instanceId) => {
    const instance = instances.find(item => item.id === instanceId);
    if (!instance) {
      return;
    }

    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return;
    }

    const menu = Menu.buildFromTemplate([
      {
        label: 'Recargar',
        click: () => {
          event.sender.send('instance-context-action', { action: 'reload', instanceId });
        }
      },
      {
        label: 'Eliminar',
        click: () => {
          event.sender.send('instance-context-action', { action: 'delete', instanceId });
        }
      }
    ]);

    menu.popup({ window: win });
  });

  ipcMain.on('set-active-view-visible', (event, visible) => {
    setActiveViewVisible(Boolean(visible));
  });

  ipcMain.on('reorder-sidebar', (event, order) => {
    reorderSidebar(order);
  });

  ipcMain.on('reorder-settings', (event, order) => {
    reorderSettings(order);
  });

  ipcMain.handle('get-active-instance', () => activeInstanceId);
  ipcMain.handle('get-preferences', () => preferences);
  ipcMain.handle('update-preferences', (event, data) => updatePreferences(data));

  ipcMain.handle('get-app-info', () => ({
    name: app.getName(),
    version: app.getVersion()
  }));

  ipcMain.handle('open-external', async (event, url) => {
    await shell.openExternal(url);
  });

  ipcMain.handle('get-desktop-sources', async () => {
    const sources = await desktopCapturer.getSources({
      types: ['window', 'screen'],
      thumbnailSize: { width: 150, height: 150 }
    });
    return sources.map(source => ({
      id: source.id,
      name: source.name,
      thumbnail: source.thumbnail.toDataURL()
    }));
  });

  ipcMain.on('check-for-updates', () => {
    autoUpdater.checkForUpdates().catch(() => {});
  });

  ipcMain.on('download-update', () => {
    autoUpdater.downloadUpdate().catch(() => {});
  });

  ipcMain.on('install-update', () => {
    autoUpdater.quitAndInstall();
  });
}

function sendUpdateStatus(data) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('update-status', data);
  }
}

function setupAutoUpdater() {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('checking-for-update', () => {
    sendUpdateStatus({ status: 'checking' });
  });

  autoUpdater.on('update-available', (info) => {
    sendUpdateStatus({ status: 'available', version: info.version, releaseNotes: info.releaseNotes });
  });

  autoUpdater.on('update-not-available', () => {
    sendUpdateStatus({ status: 'not-available' });
  });

  autoUpdater.on('download-progress', (progress) => {
    sendUpdateStatus({ status: 'downloading', percent: Math.round(progress.percent) });
  });

  autoUpdater.on('update-downloaded', () => {
    sendUpdateStatus({ status: 'downloaded' });
  });

  autoUpdater.on('error', (err) => {
    sendUpdateStatus({ status: 'error', message: err?.message || 'Error desconocido' });
  });
}

app.whenReady().then(() => {
  app.setName(APP_NAME);
  if (process.platform === 'darwin' && app.dock) {
    app.dock.setIcon(APP_ICON_PATH);
  }

  console.log('App ready, initializing store...');
  initStore();
  applyLoginItemSettings();
  console.log('Store initialized, setting up IPC...');
  setupIpcHandlers();
  console.log('IPC set up, creating window...');
  createWindow();
  console.log('Window created, rebuilding menu...');
  rebuildMenu();
  console.log('Setting up auto-updater...');
  setupAutoUpdater();
  console.log('All done!');

  // Auto-check for updates 5 seconds after launch
  setTimeout(() => {
    autoUpdater.checkForUpdates().catch(() => {});
  }, 5000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
