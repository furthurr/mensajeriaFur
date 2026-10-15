const form = document.getElementById('unlock-form');
const button = document.getElementById('unlock-button');
const password = document.getElementById('lock-password');
const error = document.getElementById('lock-error');
let busy = false;

async function unlock() {
  if (busy) return;
  busy = true;
  button.disabled = true;
  error.textContent = '';
  try {
    const result = await window.api.appLockAction('unlock', password.value);
    if (result?.error) error.textContent = result.error;
  } catch {
    error.textContent = 'No se pudo desbloquear. Intenta de nuevo.';
  } finally {
    password.value = '';
    busy = false;
    button.disabled = false;
    password.focus();
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  unlock();
});

window.api.getLockStatus().then(status => {
  const biometric = status.mode === 'biometric';
  document.getElementById('lock-description').textContent = biometric
    ? 'Usa Touch ID para acceder a tus servicios.'
    : 'Escribe tu contraseña para acceder a tus servicios.';
  document.getElementById('lock-password-label').hidden = biometric;
  password.required = !biometric;
  button.textContent = biometric ? 'Desbloquear con Touch ID' : 'Desbloquear';
  button.disabled = false;
  if (biometric) unlock();
  else password.focus();
}).catch(() => {
  error.textContent = 'No se pudo consultar la protección. Cierra y vuelve a abrir la aplicación.';
});
