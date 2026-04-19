# Arquitectura

## Tipo de aplicacion

MensajeriaFur es una aplicacion de escritorio Electron multiplataforma (macOS, Linux, Windows) que centraliza multiples servicios de mensajeria dentro de una sola ventana.

La arquitectura sigue el modelo multiproceso tipico de Electron:

- `src/main.js`: proceso principal y orquestacion de la app.
- `src/preload.js`: puente seguro entre renderer y proceso principal.
- `src/renderer.js`: interfaz, estado visual y eventos de usuario.
- `src/index.html` y `src/styles.css`: estructura y estilos de la UI.

## Responsabilidades por capa

### Proceso principal

`src/main.js` concentra la logica nativa:

- crea la ventana principal
- define el catalogo de servicios soportados
- crea y recicla `WebContentsView` por instancia
- gestiona permisos, audio, spellcheck y user agents especiales
- persiste datos con `electron-store`
- expone IPC para el renderer
- integra `electron-updater`
- maneja compatibilidad cross-platform (macOS App Nap, Linux X11/NVIDIA, Windows D3D11/Proxy)

### Preload

`src/preload.js` expone una API controlada en `window.api` usando `contextBridge`.

El renderer no accede directamente a modulos de Electron ni a APIs sensibles. Toda operacion pasa por un contrato explicito de IPC.

### Renderer

`src/renderer.js` gestiona:

- sidebar de servicios activos
- pantallas de bienvenida y carga
- modal de seleccion de servicio
- ajustes y preferencias
- modales de eliminar, acerca de y actualizaciones
- drag and drop del orden visual
- aplicacion del tema en la UI

## Flujo principal

1. Electron arranca en `src/main.js`.
2. El proceso principal inicializa store, IPC, ventana y auto-updater.
3. La ventana carga `src/index.html`.
4. El preload expone `window.api`.
5. El renderer solicita estado inicial por IPC y renderiza la UI.
6. Al seleccionar una instancia, el proceso principal monta el `WebContentsView` correspondiente.

## Aislamiento por instancia

Cada instancia usa su propia particion persistente de Electron:

- `session.fromPartition('persist:<uuid>')`

Esto permite multiples cuentas del mismo servicio sin mezclar cookies, storage o sesiones.

## Vistas nativas y modales

La app usa `WebContentsView` en vez de incrustar la web directamente dentro del DOM del renderer.

Cuando se abre un modal o panel que debe quedar por encima, el renderer avisa al proceso principal para desmontar temporalmente la vista nativa. Esto evita solapamientos visuales entre la UI HTML y la vista nativa del servicio activo.

## Orden dual

La app guarda dos ordenes independientes:

- `sidebarOrder`: orden visual de accesos activos en la barra lateral
- `settingsOrder`: orden visual usado dentro del panel de ajustes

Ambos se persisten por separado para no acoplar dos vistas con necesidades distintas.

## Compatibilidad cross-platform

### macOS

- `powerSaveBlocker.start('prevent-app-suspension')` evita que App Nap suspenda webviews en background
- Menu bar nativa integrada
- Soporte para Hardened Runtime y notarizacion

### Linux (Ubuntu 24.04+)

- Forza X11 via `--ozone-platform-hint=x11` (Electron 41 tiene bugs conocidos en Wayland)
- Mitigacion de crashes NVIDIA GPU: `--disable-gpu-sandbox --use-gl=angle --use-angle=vulkan`
- AppArmor profile bundled para restricciones de seguridad
- Script `linux/install-icons.sh` para instalar iconos

### Windows (10/11)

- `app.setAppUserModelId('com.mensajeriafur.app')` para agrupacion en taskbar y notificaciones
- Backend ANGLE D3D11 forzado: `--use-angle=d3d11`
- Software rasterizer fallback deshabilitado: `--disable-software-rasterizer`
- Handler para autenticacion proxy/NTLM en redes corporativas

### Recuperacion de GPU

Linux y Windows relanzan automaticamente con `--disable-gpu` cuando el proceso de GPU crashea.

## Auto-update

La app usa `electron-updater` con trigger manual (sin descarga automatica):

1. `checkForUpdates` → consulta si hay nueva version
2. Si hay disponible, `downloadUpdate` → descarga manual
3. `installUpdate` → instala al salir de la app

Funciona en todas las plataformas: macOS, Linux y Windows.

## Badge state tracking

Las instancias trackean mensajes no leidos parseando el titulo de la pagina del servicio activo. Cuando una instancia pasa a ser activa, su badge se limpia automaticamente. El renderer recibe actualizaciones via `badge-state-changed` IPC event.