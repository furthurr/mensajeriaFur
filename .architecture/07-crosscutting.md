# 7. Conceptos transversales

## Seguridad de procesos y límites de confianza

- La ventana principal configura `nodeIntegration: false` y `contextIsolation: true` y carga `src/preload.js` (`src/main.js:612`). Las vistas de servicio se crean con las mismas dos opciones y sesión por instancia (`src/main.js:864`).
- El preload publica métodos puntuales con `contextBridge`; la UI no recibe directamente `ipcRenderer` (`src/preload.js:1-47`).
- Los handlers de producto comprueban origen local exacto, frame principal y ventana principal, además de `appLocked=false`. Los canales de protección también validan origen, serializan las operaciones y aplican sus condiciones de estado (`src/main.js:117-205,1398-1414`). Esto no sustituye validar cada payload.
- La vista remota de cada proveedor es un límite distinto del DOM local. Las reglas de navegación, ventanas emergentes, autenticación y permisos residen en el proceso principal (`src/main.js:694,774,864`).
- El detalle de los riesgos de permisos y validación de IPC queda en `.security/`; esta descripción no equivale a una aprobación de seguridad.

## Persistencia y ciclo de vida

- `electron-store` conserva instancias, órdenes, instancia activa, preferencias y el registro opcional `appLock` (`src/main.js:164-205,575-598`).
- Cookies/almacenamiento del proveedor se aíslan en `persist:<instance.id>`; deshabilitar una instancia destruye la vista pero conserva la partición, mientras eliminarla limpia sus datos (`src/main.js:864,1285,1339`; `specs/persistencia.md`).
- La forma canónica y detalles de los datos se documentan en `.data/` y `specs/persistencia.md`.

## Protección local al iniciar

Touch ID solo se integra directamente en macOS; en otras plataformas o cuando no está disponible al configurar se crea una contraseña propia. El SO conserva la biometría; la app guarda únicamente el modo o un hash scrypt con salt. No se guardan contraseñas en claro (`src/main.js:124-205`; `src/app-lock.js:10-22`).

El bloqueo controla el acceso en este proceso, no cifra cookies, mensajes ni el store. No protege contra manipulación de archivos por la misma cuenta del SO. No hay recuperación de contraseña, fallback posterior desde Touch ID ni bloqueo al suspender/inactivar; los intentos fallidos no persisten entre procesos. Estos límites están también en `specs/funcionalidades.md`.

## Vistas nativas y composición visual

`WebContentsView` no se renderiza en el DOM HTML de la ventana. El renderer detecta paneles/modal y solicita ocultar la vista nativa; el proceso principal la quita/añade al `contentView` y actualiza bounds (`src/renderer.js`, `syncNativeViewVisibility`; `src/main.js:1143-1183`). Esta coordinación es un invariante: cambiarla requiere revisar conjuntamente UI y proceso principal. El bloqueo de inicio no es otra superposición: usa una página separada antes de crear las vistas.

## Integración con el sistema operativo

- macOS: menú nativo, icono, permisos multimedia y bloqueo de App Nap (`src/main.js:1600-1610`; `package.json:31-47`).
- Linux: hint X11 y switches para mitigación GPU; recursos AppArmor/iconos/post-install están asociados al empaquetado (`src/main.js:7-16`; `package.json:50-105`).
- Windows: AppUserModelId, ANGLE D3D11, manejo proxy/NTLM y recuperación de proceso GPU (`src/main.js:18-28,1590-1598,1643-1652`).
- Cámara, micrófono y captura de pantalla usan los handlers Electron por sesión; permisos y política exacta deben revisarse en `.security/` (`src/main.js:773-825`).

## Conectividad, identidad e internacionalización

- La app depende de sitios web de terceros y sus flujos de autenticación; URLs y excepciones particulares están en `src/main.js:65-94` y `specs/servicios.md`.
- User-agents especiales, migración de Teams y popups de auth son adaptaciones de compatibilidad, no contratos controlados por MensajeriaFur (`src/main.js:43-53,596-764,827-860,880-980`).
- Menús y UI están principalmente en español; el idioma de spellcheck se conserva como preferencia (`src/main.js:40,55-63`; `src/renderer.js`; `src/index.html:2`).
- El proyecto parsea títulos de páginas remotas para badges; los formatos de título pertenecen al proveedor y pueden variar (`src/main.js:452-467`).

## Errores y observabilidad

Los errores del updater y de captura multimedia se convierten a estados visibles o logs; algunos fallos de carga de ventana se registran en consola (`src/main.js:591-594,814-820,1544-1585`). No se identificó plataforma central de telemetría en el alcance revisado.
