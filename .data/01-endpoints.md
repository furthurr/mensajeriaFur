# 1. Catálogo de interfaces y fuentes

## APIs de red de la aplicación

No se encontraron endpoints HTTP/REST, GraphQL, gRPC ni OpenAPI propios del producto en el código de aplicación revisado. La app define destinos web para proveedores y deja que Chromium gestione su contenido/autenticación; sus rutas internas y payloads no se documentan como contrato MensajeriaFur. Véanse el catálogo en `src/main.js:67` y la carga en `src/main.js:1084`, función `switchToInstance`.

`electron-updater` consulta la publicación configurada como GitHub (`package.json:132-138`); su protocolo/metadata pertenece a la dependencia y no se inventa aquí un endpoint HTTP. Flujo de producto: `src/main.js:1545,1661`.

## API local por IPC

El contrato entre renderer y proceso principal se implementa en `src/preload.js:1-47` y `src/main.js:164-205,1398-1564`. No es una API de red ni tiene versión/schema formal independiente.

Todas las llamadas exigen el frame principal de la ventana principal y una URL local exacta (`index.html` o `lock.html`). Las operaciones de producto además exigen aplicación desbloqueada: `invoke` rechaza con error si no se cumple; los comandos `send` se ignoran. Véase `src/main.js:117-122,1398-1414`.

### Protección del inicio

| Método | Canal / transporte | Entrada | Salida y condiciones |
|---|---|---|---|
| `getLockStatus()` | `get-lock-status` / invoke | Ninguna | `LockStatus`; se admite bloqueado; rechaza si el emisor no es válido. |
| `appLockAction(action, password?, confirmation?)` | `app-lock-action` / invoke | `action`: `enable`, `disable` o `unlock`; valores de contraseña solo para el método correspondiente | `{status: LockStatus}` al completar o `{error: string}`. No devuelve hash, salt ni contraseña. |

- `enable`: solo desbloqueado y sin registro; consulta Touch ID en macOS y autentica, o valida/deriva una contraseña confirmada. Guarda el registro tras éxito.
- `disable`: solo desbloqueado; verifica el método configurado y elimina `appLock`.
- `unlock`: autentica contra el registro, limpia el bloqueo del proceso, reconstruye el menú y carga `index.html`. El handler no exige explícitamente estar bloqueado; si no hay registro, `authenticateLock` no solicita credenciales. No es una API de recuperación.
- Acciones desconocidas, estados no permitidos, cancelación nativa, credenciales incorrectas o solicitudes simultáneas devuelven `{error}`.

Fuentes: `src/preload.js:4-5`; `src/main.js:124-205`. Modelos en [02-models.md](02-models.md) y errores/reintentos en [05-conventions.md](05-conventions.md).

### Operaciones de producto

| Método `window.api` | Canal | Forma de retorno observada | Fuente |
|---|---|---|---|
| `getInstances()` | `get-instances` (`invoke`) | `Instance[]` | `src/preload.js:6`; `src/main.js:1415` |
| `getSidebarOrder()` / `getSettingsOrder()` | `get-sidebar-order` / `get-settings-order` | `string[]` (IDs de instancia) | `src/preload.js:7-8`; `src/main.js:1417-1419` |
| `getServiceTypes()` | `get-service-types` | `{id, name, color}[]` | `src/preload.js:9`; `src/main.js:1421` |
| `addInstance(serviceType, name)` | `add-instance` (`invoke`) | `Instance` o `{error: string}` ante tipo inválido | `src/preload.js:10`; `src/main.js:1431` |
| `updateInstance(id, data)` | `update-instance` (`invoke`) | `Instance` actualizado o `null` si no existe | `src/preload.js:11`; `src/main.js:1438,1285` |
| `deleteInstance(id)` | `delete-instance` (`invoke`) | boolean | `src/preload.js:12`; `src/main.js:1442,1339` |
| `getActiveInstance()` | `get-active-instance` (`invoke`) | ID o `null` | `src/preload.js:19`; `src/main.js:1515` |
| `getPreferences()` / `updatePreferences(data)` | `get-preferences` / `update-preferences` (`invoke`) | preferencias; actualización devuelve el objeto normalizado | `src/preload.js:22-23`; `src/main.js:1516-1517,566` |
| `switchInstance(id)`, `reorderSidebar(ids)`, `reorderSettings(ids)` | `send` sin respuesta | sin retorno de dominio | `src/preload.js:13,17-18`; `src/main.js:1446,1507,1511` |

El proceso principal también publica eventos unidireccionales (`instances-changed`, `active-instance-changed`, `badge-state-changed`, `update-status`, entre otros). La UI los consume mediante suscripciones del preload (`src/preload.js:26-46`).

No se genera OpenAPI: IPC no es HTTP. La tabla es un catálogo equivalente y debe actualizarse si cambian métodos, canales o formas de datos.
