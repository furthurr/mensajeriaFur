# Persistencia

## Store principal

La app usa `electron-store` como almacenamiento local para preferencias y metadatos de instancias.

## Claves persistidas

- `instances`: lista completa de instancias creadas
- `sidebarOrder`: orden de la barra lateral
- `settingsOrder`: orden del panel de ajustes
- `activeInstanceId`: ultima instancia activa
- `preferences`: preferencias globales de la app
- `appLock`: registro opcional de protección de inicio, separado de las preferencias generales; su ausencia significa protección desactivada.

## Credenciales del bloqueo

- Touch ID: `{ mode: 'biometric' }`; la biometría permanece bajo control de macOS.
- Contraseña: `{ mode: 'password', salt, hash }`; salt aleatorio de 32 bytes y hash scrypt de 64 bytes, codificados en hexadecimal. Se utiliza el salt hexadecimal como entrada de scrypt con los parámetros predeterminados de Node (`N=16384`, `r=8`, `p=1`).
- La contraseña y su confirmación no se persisten ni se registran; la verificación usa comparación de tiempo constante.
- La API IPC solo devuelve estado y capacidades de protección, nunca salt ni hash.
- Al desactivar la protección se elimina `appLock`; las sesiones y preferencias existentes no cambian.
- Los contadores y la espera por intentos incorrectos son transitorios por proceso, no un mecanismo contra ataques offline.

## Preferencias por defecto

Valores por defecto actuales:

- `theme: system`
- `openAtLogin: false`
- `restoreLastActiveInstance: true`
- `confirmBeforeDelete: true`
- `notificationsEnabled: true`
- `soundsEnabled: true`
- `spellcheckLanguage: es-MX`

## Sesiones de servicios

Los datos de login y navegacion de cada servicio no viven en `electron-store`, sino en una particion persistente independiente de Electron por cada instancia.

Formato actual:

- `persist:<uuid>`

## Regla al eliminar

Cuando una instancia se elimina:

- se remueve de `instances`
- se remueve de `sidebarOrder` y `settingsOrder`
- se limpia la particion persistente asociada
- se actualiza `activeInstanceId` si hacia falta
