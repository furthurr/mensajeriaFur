# Arquitectura

## Tipo de aplicacion

MensajeriaFur es una aplicacion de escritorio Electron para macOS que centraliza multiples servicios de mensajeria dentro de una sola ventana.

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
