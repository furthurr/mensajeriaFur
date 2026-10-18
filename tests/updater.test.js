const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { EventEmitter } = require('node:events');

function createUpdater() {
  const autoUpdater = new EventEmitter();
  const statuses = [];
  const src = path.resolve(__dirname, '../src');
  const context = vm.createContext({
    require: name => {
      if (name === 'electron') return {
        app: {
          commandLine: { appendSwitch() {} },
          setAppUserModelId() {},
          on() {},
          whenReady: () => ({ then() {} })
        }
      };
      if (name === 'electron-store') return function () {};
      if (name === 'electron-updater') return { autoUpdater };
      if (name === './app-lock') return require('../src/app-lock');
      return require(name);
    },
    process: { platform: 'win32', argv: [], versions: {} },
    __dirname: src,
    console,
    windowStub: {
      isDestroyed: () => false,
      webContents: { send: (channel, data) => statuses.push(data) }
    }
  });
  vm.runInContext(fs.readFileSync(path.join(src, 'main.js'), 'utf8'), context);
  vm.runInContext('mainWindow = windowStub; setupAutoUpdater();', context);
  return { autoUpdater, statuses, context };
}

test('signature failures report manual recovery and prevent another download', () => {
  const { autoUpdater, statuses, context } = createUpdater();
  autoUpdater.emit('update-available', { version: '1.2.0', files: [{ url: 'setup.exe' }] });
  assert.equal(vm.runInContext('canDownloadUpdate', context), true);

  const error = new Error('Firma no valida; detalle tecnico privado');
  error.code = 'ERR_UPDATER_INVALID_SIGNATURE';
  autoUpdater.emit('error', error);

  const status = statuses.at(-1);
  assert.equal(status.status, 'error');
  assert.match(status.message, /firma del instalador de Windows/);
  assert.match(status.message, /instala manualmente la version corregida/);
  assert.match(status.message, /https:\/\/github\.com\/furthurr\/mensajeriaFur\/releases\/latest/);
  assert.equal(status.message.includes(error.message), false);
  assert.equal(vm.runInContext('canDownloadUpdate', context), false);
});

test('signature failures without an error code also hide the PowerShell details', () => {
  const { autoUpdater, statuses } = createUpdater();
  autoUpdater.emit('error', new Error('New version 1.2.0 is not signed by the application owner: publisherNames: PedroGomez, raw info: PowerShell'));
  assert.match(statuses.at(-1).message, /instala manualmente/);
  assert.doesNotMatch(statuses.at(-1).message, /publisherNames|PowerShell/);
});

test('unrelated update errors keep their original diagnostic message', () => {
  const { autoUpdater, statuses } = createUpdater();
  autoUpdater.emit('error', new Error('SHA-512 checksum mismatch'));
  assert.equal(statuses.at(-1).message, 'SHA-512 checksum mismatch');
});
