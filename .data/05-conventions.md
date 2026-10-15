# 5. Convenciones, validación y errores

## IPC

- Lecturas y operaciones que devuelven valor usan `ipcRenderer.invoke` / `ipcMain.handle`.
- Comandos sin resultado inmediato y notificaciones usan `send` / `on`.
- El preload expone nombres de método estables y no pasa `ipcRenderer` a la UI (`src/preload.js:1-47`).
- Los handlers de producto rechazan `invoke` o ignoran `send` si el emisor no es la ventana/frame principal local o si la app está bloqueada. Los canales de protección admiten consulta/desbloqueo en ese estado y validan su propio flujo (`src/main.js:117-205,1398-1414`).
- Los estados son objetos serializables de JavaScript; no hay versionado formal del contrato IPC.

## Validación observada

- `add-instance` comprueba que `serviceType` exista en `SERVICE_TYPES`; si no, retorna `{error: 'Invalid service type'}` (`src/main.js:1431`).
- `sanitizePreferences` limita tema e idioma y normaliza flags a boolean (`src/main.js:207`).
- `updateInstance` comprueba que el ID exista, pero combina `data` sin lista de campos permitidos; ver [deuda técnica](data-tech-debt.md).
- No se encontró un validador de esquemas, librería DTO o contrato IPC generado.
- La creación de contraseña valida tipo string, longitud de 8 a 1024 y coincidencia de confirmación; el verificador exige modo y patrones de hash/salt. No se aplica trim ni normalización de la contraseña (`src/app-lock.js:6-22`).

## Errores y resultados

| Operación | Resultado observado |
|---|---|
| Alta de tipo inválido | `{error: 'Invalid service type'}` |
| Actualizar instancia inexistente | `null` |
| Eliminar instancia inexistente | `false` |
| Fallo de captura de fuentes | log y lista vacía |
| Error updater | evento `update-status` con estado `error` y mensaje normalizado |
| Acción de protección correcta | `{status: LockStatus}` sin credenciales |
| Cancelación Touch ID, contraseña incorrecta, confirmación distinta o acción no permitida | `{error: string}`; no se omite la autenticación |
| Protección con solicitud ya en curso | `{error}`; `authBusy` se restablece en `finally` |
| `getLockStatus` con emisor inválido | Rechazo de la promesa IPC |

Fuentes: `src/main.js:164-205,1431-1444,1528,1661`.

### Reintentos de autenticación

Cinco contraseñas incorrectas fijan `retryAfter` a la hora actual más 30 segundos y reinician el contador; las solicitudes anteriores a ese plazo devuelven error de espera. El éxito limpia contador/plazo. El estado solo vive en el proceso; reiniciar no conserva la limitación. Un registro con modo desconocido o una biometría configurada pero no disponible produce error, no un fallback silencioso (`src/main.js:137-162`).

## Retención y eliminación

- Desactivar una instancia no equivale a borrar sus datos de sesión.
- Eliminar una instancia limpia la partición persistente y actualiza estado/listas.
- Las preferencias se guardan bajo una clave y se normalizan al inicializar/actualizar.
- Desactivar la protección elimina únicamente `appLock`, tras autenticar; no es lo mismo que desactivar una instancia. No hay recuperación de contraseña ni migración desde biometría no disponible.

No se documentan reintentos, paginación ni timeouts para APIs del producto porque no se encontraron clientes HTTP propios.
