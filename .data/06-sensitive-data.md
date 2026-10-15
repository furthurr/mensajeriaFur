# 6. Datos sensibles y PII

Documenta tipos y ubicación; no copiar valores, credenciales, cookies ni mensajes.

| Dato | Dónde aparece | Sensibilidad | Cifrado verificado | Almacenamiento / tratamiento |
|---|---|---|---|---|
| Cookies, tokens de sesión y almacenamiento del proveedor | Perfil web de `WebContentsView` por instancia | Alta | No se afirma cifrado adicional controlado por la app; revisar capacidades del SO/Electron por separado | Partición persistente `persist:<uuid>` (`src/main.js:771-842`). Se borra al eliminar la instancia (`src/main.js:1256`). |
| Mensajes y contenido de cuenta | Páginas web remotas del proveedor | Alta | No determinado por este repo | El contenido se carga/renderiza en la vista del proveedor; la app no lo modela como DTO propio. |
| Alias de instancia (`name`) | `instances` en `electron-store` y UI | Puede contener PII | No configurado/verificado en código de app | Valor introducido por usuario o nombre derivado (`src/main.js:1159-1167`). |
| IDs UUID, tipo y estado de instancia | `instances`, órdenes y `activeInstanceId` | Baja / metadatos | No configurado/verificado en código de app | `electron-store` (`src/main.js:479-501,1159-1178`). |
| Preferencias | `preferences` | Baja, salvo inferencias de uso | No configurado/verificado en código de app | `electron-store`; tema, arranque, notificaciones, sonido, idioma (`src/main.js:55-63`). |
| Contraseña propia y confirmación | Campos de formularios, preload/IPC y memoria de main | Alta; credencial | No aplica como cifrado persistente: no se guardan en claro | Se validan/derivan en main; los formularios limpian valores tras solicitar la operación y al cerrar ajustes (`src/app-lock.js:6-22`; `src/renderer.js`, `setupSettingsEventListeners` y `closeSettings`; `src/lock.js:7-26`). |
| Hash y salt de contraseña | `appLock` en `electron-store` | Verificador sensible; el salt no es secreto | Hash scrypt, no cifrado reversible | Salt aleatorio de 32 bytes, hash de 64 bytes; no se retornan por IPC. Se borran al desactivar la protección (`src/main.js:132-205`; `src/app-lock.js:10-22`). |
| Datos biométricos | Gestionados por macOS, no leídos por la app | No se recopilan por la app | A cargo del SO, sin afirmación de implementación interna | Solo se consulta disponibilidad y se solicita autenticación; el registro propio guarda `mode: biometric` (`src/main.js:124-147,181-187`). |

La protección local no cifra perfiles de proveedores ni el store, y no impide manipulación de archivos por la misma cuenta del sistema. No se copiarán valores reales de `appLock` a ejemplos o documentación. Esta actualización registra el inventario de datos y su tratamiento; no ejecuta auditoría ni cierra findings en `.security/`.

## Reglas de documentación

- No incluir nombres reales de usuario, valores de alias, archivos locales de Electron, cookies, tokens o mensajes.
- No afirmar que `electron-store` o `persist:` cifran datos; el código revisado no configura una capa de cifrado propia.
- Retener y borrar los perfiles de proveedores según el ciclo de vida de instancia. La baja de instancia limpia su partición; deshabilitarla la conserva (`src/main.js:1205-1210,1238-1265`).
- El manejo de permisos, exposición de webviews y riesgos de seguridad se evalúa en `.security/`, no aquí.
