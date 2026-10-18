# Releases

## Desarrollo local

Comandos disponibles:

```bash
npm start              # launch app in dev mode
npm run build          # build for current platform
npm run build:mac      # build macOS dmg
npm run build:mac:all  # build macOS dmg + zip (x64 + arm64)
npm run build:dmg      # build macOS dmg only
npm run build:zip      # build macOS zip only
npm run build:linux    # build Linux deb + AppImage
npm run build:linux:all # build Linux deb (x64 + arm64)
npm run build:deb      # build Linux deb only
npm run build:win      # build Windows nsis + portable
npm run build:win:x64  # build Windows x64 only
```

## Build

- **Objetivo:** multiplataforma (macOS, Linux, Windows)
- **Artefactos:**
  - macOS: `.dmg`, `.zip` (x64 + arm64)
  - Linux: `.deb`, `.AppImage` (x64 + arm64)
  - Windows: `setup.exe` (NSIS), `portable.exe`
- **Salida:** `dist/`

## Workflow de release actual

Archivo:

- `.github/workflows/release.yml`

Se ejecuta en tres jobs parallelos:

| Job | Runner | Artefactos |
|-----|--------|------------|
| `build-macos` | `macos-14` | dmg + zip (x64 + arm64), latest-mac.yml |
| `build-linux` | `ubuntu-24.04` | deb, AppImage (amd64 + arm64), latest-linux.yml |
| `build-windows` | `windows-latest` | setup.exe, portable.exe, latest.yml |

Se ejecuta en:

- `push` de tags `v*`
- `workflow_dispatch`

El workflow:

- instala dependencias con `npm ci`
- compila la app para cada plataforma
- sube artefactos como artifacts de GitHub Actions
- publica assets en la release asociada al tag cuando es un tag

## Firma y notarizacion

La configuracion soporta firma y notarizacion de Apple mediante variables de entorno y secretos:

- `CSC_LINK`
- `CSC_KEY_PASSWORD`
- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `APPLE_TEAM_ID`

El script `scripts/notarize.js` se ejecuta como `afterSign`. Si las variables no estan configuradas, el script skip gracefully.

En Windows, se puede configurar un certificado de firma en electron-builder.

- No se fija `win.publisherName` al nombre del autor: ese campo identifica al titular de un certificado, no los metadatos de autoria.
- Sin certificado, electron-builder debe generar `resources/app-update.yml` sin `publisherName`, de modo que el updater no exija una firma Authenticode inexistente.
- Con certificado, electron-builder obtiene automaticamente el editor desde el certificado y el updater verifica la firma. No se desactiva globalmente `verifyUpdateCodeSignature` ni se reemplaza el verificador en runtime.
- Las descargas siguen verificando su integridad con el SHA-512 publicado en `latest.yml`; esto no sustituye la autenticacion del editor mediante una firma digital.

## Auto-update

El auto-update funciona en todas las plataformas (macOS, Linux, Windows) usando `electron-updater` con GitHub como provider.

Reglas de publicacion para que no se rompa el updater:

- macOS debe publicar `.zip` y `.dmg` para `x64` y `arm64`; `latest-mac.yml` debe apuntar a los nombres exactos generados por electron-builder
- no se deben renombrar artefactos despues del build si tambien se publica metadata `latest*.yml`, porque eso desincroniza el feed
- Linux debe publicar el `.AppImage` referenciado por `latest-linux*.yml`
- Windows debe publicar el instalador NSIS referenciado por `latest.yml`

El flujo es manual: el usuario dispara la descarga desde la UI, y la instalacion ocurre al cerrar la app.

### Recuperacion de instalaciones Windows con editor fijo

Las versiones instaladas que contienen `publisherName: PedroGomez` rechazan los instaladores sin firma con `ERR_UPDATER_INVALID_SIGNATURE`, incluso tras completar la descarga. Cambiar solo el nuevo instalador o `latest.yml` no repara la configuracion de la app que ya esta ejecutandose.

- Se debe cerrar la app y ejecutar manualmente un `MensajeriaFur-windows-setup.exe` construido con la configuracion corregida, sobre la instalacion existente.
- No es necesario desinstalar ni borrar las sesiones o preferencias.
- Si el error vuelve a producirse, la UI muestra un mensaje en espanol con la indicacion de instalar manualmente la version corregida desde la pagina oficial de releases, en lugar del volcado tecnico de PowerShell.
- Antes de publicar, comprobar que `dist/win-unpacked/resources/app-update.yml` no contiene `publisherName` en un build sin certificado y que `latest.yml` referencia el instalador NSIS y su SHA-512 correcto.

## Regla documental

Si cambian los formatos de salida, el proceso de build, la publicacion o el flujo de actualizaciones, tambien debe actualizarse esta spec.

## Version 1.1.2

Cambios incluidos en esta version:

- conservar la sesion persistente al desactivar y volver a activar una instancia
- mantener la limpieza de cookies y almacenamiento unicamente al eliminar una instancia

## Version 1.1.1

Cambios incluidos en esta version:

- soporte para deshabilitar/habilitar instancias de servicio individualmente
- vista dedicada cuando un servicio esta deshabilitado
- sincronizacion de badge y estado de atencion cuando hay servicios deshabilitados
- conversion de toggles a checkboxes en preferencias y configuraciones de instancia
- destruccion de views al deshabilitar un servicio para liberar recursos

## Version 1.0.18

Cambios incluidos en esta version:

- correccion de permisos nativos para camara y microfono en macOS
- soporte explicito del flujo `getDisplayMedia` para compartir pantalla en servicios como Teams

## Version 1.0.16

Cambios incluidos en esta version:

- soporte multiplataforma completo (macOS, Linux, Windows)
- auto-update funcional en todas las plataformas
- App Nap prevention para macOS
- compatibilidad con NVIDIA GPUs en Linux
- D3D11 ANGLE backend para Windows
- proxy/NTLM handler para redes corporativas
- recovery de GPU process crashes en Linux y Windows
