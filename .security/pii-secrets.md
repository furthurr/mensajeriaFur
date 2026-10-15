# Inventario de PII y secretos

Inventario de tipos/ubicaciones, sin valores. No se han copiado credenciales, direcciones ni contenido de usuario.

| Tipo | Ubicación | Tratamiento observado / límite |
|---|---|---|
| Credenciales/cookies y almacenamiento de cuentas externas | Particiones persistentes de `WebContentsView`, `persist:<instance UUID>` (`src/main.js:771-842`). | Lo gestionan los sitios web en perfiles Electron aislados por instancia; eliminación de instancia limpia el almacenamiento (`src/main.js:1238-1265`). No se verificó una capa de cifrado propia. |
| Mensajes/contenido de comunicaciones | Sitios de proveedores dentro de las vistas remotas. | No se modela como DTO propio ni se copia a esta documentación. El contenido pertenece a los proveedores y al usuario. |
| Alias de instancia | Entrada local y `electron-store` (`src/main.js:1159-1167`; `specs/persistencia.md`). | El usuario puede introducir información personal; evitar logs, exports o ejemplos con aliases reales. |
| Información de autor/contacto | Modal About en `src/index.html:175-245`. | Datos de perfil/contacto visibles en UI; no se reproducen en este inventario. |
| Credenciales de firma/notarización | Referencias a secrets del workflow y variables del script de notarización (`.github/workflows/release.yml`, `scripts/notarize.js:12-18`). | Se consumen desde configuración de CI/entorno; valores no están incluidos ni se registran aquí. |
| UUIDs, estado y preferencias | `electron-store` (`src/main.js:479-501`). | Metadatos de aplicación; pueden asociarse a hábitos/preferencias y deben tratarse como datos locales. |

No se inspeccionó el contenido local de perfiles Electron del usuario ni se buscaron valores de secretos fuera del código versionado; no afirmar ausencia universal de secretos/PII.
