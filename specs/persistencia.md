# Persistencia

## Store principal

La app usa `electron-store` como almacenamiento local para preferencias y metadatos de instancias.

## Claves persistidas

- `instances`: lista completa de instancias creadas
- `sidebarOrder`: orden de la barra lateral
- `settingsOrder`: orden del panel de ajustes
- `activeInstanceId`: ultima instancia activa
- `preferences`: preferencias globales de la app

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
