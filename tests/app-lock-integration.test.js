const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const { createPasswordRecord } = require('../src/app-lock');

function createApp(platform = 'linux', biometricAvailable = false) {
  const handles = new Map();
  const listeners = new Map();
  const values = new Map();
  const calls = { touchId: 0, loads: [] };
  const src = path.resolve(__dirname, '../src');
  const frame = { url: pathToFileURL(path.join(src, 'lock.html')).href };
  const window = {
    isDestroyed: () => false,
    webContents: { mainFrame: frame },
    loadFile: async file => { calls.loads.push(file); }
  };
  const electron = {
    app: {
      commandLine: { appendSwitch() {} },
      setAppUserModelId() {},
      on() {},
      whenReady: () => ({ then() {} })
    },
    ipcMain: {
      handle: (channel, handler) => handles.set(channel, handler),
      on: (channel, handler) => listeners.set(channel, handler)
    },
    Menu: { buildFromTemplate: template => template, setApplicationMenu() {} },
    systemPreferences: {
      canPromptTouchID: () => biometricAvailable,
      promptTouchID: async () => {
        calls.touchId++;
        if (calls.cancelTouchId) throw new Error('cancelled');
      }
    }
  };
  const context = vm.createContext({
    require: name => {
      if (name === 'electron') return electron;
      if (name === 'electron-store') return function () {};
      if (name === 'electron-updater') return { autoUpdater: {} };
      if (name === './app-lock') return require('../src/app-lock');
      return require(name);
    },
    process: { platform, argv: [], versions: {} },
    __dirname: src,
    console,
    windowStub: window,
    storeStub: {
      get: key => values.get(key),
      set: (key, value) => values.set(key, value),
      delete: key => values.delete(key)
    }
  });
  vm.runInContext(fs.readFileSync(path.join(src, 'main.js'), 'utf8'), context);
  vm.runInContext('mainWindow = windowStub; store = storeStub; setupIpcHandlers(); setupLockIpc();', context);
  const event = { sender: window.webContents, senderFrame: frame };
  return { handles, listeners, values, calls, context, event };
}

test('locked main process rejects product IPC, view creation, and untrusted senders', () => {
  const app = createApp();
  vm.runInContext('appLocked = true;', app.context);
  assert.throws(() => app.handles.get('get-instances')(app.event));
  assert.throws(() => app.handles.get('get-lock-status')({ sender: {} }));
  const subframe = { ...app.event, senderFrame: { url: app.event.senderFrame.url } };
  assert.throws(() => app.handles.get('get-lock-status')(subframe));
  assert.equal(vm.runInContext('getOrCreateView({ id: "blocked" })', app.context), null);
  app.listeners.get('switch-instance')(app.event, 'blocked');
  app.listeners.get('set-active-view-visible')(app.event, true);
  assert.equal(app.calls.loads.length, 0);
});

test('password activation, restart lock, failed unlock, successful unlock and authenticated disable', async () => {
  const app = createApp();
  const action = (...args) => app.handles.get('app-lock-action')(app.event, ...args);
  assert.ok((await action('enable', 'contraseña-local', 'distinta')).error);
  assert.equal(app.values.has('appLock'), false);
  assert.equal((await action('enable', 'contraseña-local', 'contraseña-local')).status.enabled, true);
  vm.runInContext('appLocked = true;', app.context);
  assert.ok((await action('disable', 'contraseña-local')).error);
  assert.ok((await action('unlock', 'incorrecta')).error);
  assert.equal(app.calls.loads.length, 0);
  assert.equal((await action('unlock', 'contraseña-local')).status.locked, false);
  assert.equal(app.calls.loads.length, 1);
  assert.ok((await action('disable', 'incorrecta')).error);
  assert.equal(app.values.has('appLock'), true);
  assert.equal((await action('disable', 'contraseña-local')).status.enabled, false);
});

test('five incorrect passwords throttle further attempts', async () => {
  const app = createApp();
  app.values.set('appLock', await createPasswordRecord('contraseña-local', 'contraseña-local'));
  vm.runInContext('appLocked = true;', app.context);
  const action = password => app.handles.get('app-lock-action')(app.event, 'unlock', password);
  for (let i = 0; i < 5; i++) assert.ok((await action('incorrecta')).error);
  assert.match((await action('contraseña-local')).error, /30 segundos/);
  assert.equal(app.calls.loads.length, 0);
});

test('Touch ID enrollment and unlock require successful native authentication', async () => {
  const app = createApp('darwin', true);
  const action = type => app.handles.get('app-lock-action')(app.event, type);
  app.calls.cancelTouchId = true;
  assert.ok((await action('enable')).error);
  assert.equal(app.values.has('appLock'), false);
  app.calls.cancelTouchId = false;
  assert.equal((await action('enable')).status.mode, 'biometric');
  vm.runInContext('appLocked = true;', app.context);
  app.calls.cancelTouchId = true;
  assert.ok((await action('unlock')).error);
  assert.equal(app.calls.loads.length, 0);
  app.calls.cancelTouchId = false;
  assert.equal((await action('unlock')).status.locked, false);
  assert.equal(app.calls.touchId, 4);
});

test('unavailable biometrics and corrupted records never unlock automatically', async () => {
  const app = createApp('darwin', false);
  vm.runInContext('appLocked = true;', app.context);
  for (const record of [{ mode: 'biometric' }, { mode: 'unknown' }]) {
    app.values.set('appLock', record);
    const result = await app.handles.get('app-lock-action')(app.event, 'unlock');
    assert.ok(result.error);
    assert.equal(result.status, undefined);
    assert.equal(app.calls.loads.length, 0);
  }
});

test('Windows uses password enrollment and public status never includes credentials', async () => {
  const app = createApp('win32', true);
  const result = await app.handles.get('app-lock-action')(app.event, 'enable', 'contraseña-local', 'contraseña-local');
  assert.equal(result.status.mode, 'password');
  assert.equal(result.status.biometricAvailable, false);
  assert.equal(app.calls.touchId, 0);
  const status = app.handles.get('get-lock-status')(app.event);
  assert.equal(status.hash, undefined);
  assert.equal(status.salt, undefined);
  assert.equal(app.handles.get('get-instances')(app.event).length, 0);
});

test('concurrent enrollment is rejected and cancelled auth can be retried', async () => {
  const app = createApp('darwin', true);
  const action = () => app.handles.get('app-lock-action')(app.event, 'enable');
  app.calls.cancelTouchId = true;
  const pending = action();
  assert.match((await action()).error, /en curso/);
  assert.ok((await pending).error);
  app.calls.cancelTouchId = false;
  assert.equal((await action()).status.enabled, true);
});
