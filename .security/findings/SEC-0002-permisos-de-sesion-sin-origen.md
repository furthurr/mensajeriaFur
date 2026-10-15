# SEC-0002: Permisos de sesión no restringidos por origen

- Estado: Pendiente
- Severidad: 🟠 Alta
- Referencia: ASVS — control de acceso · CWE-862 Missing Authorization
- Ubicación: `src/main.js:773-823`
- Fecha detección: 2026-10-14

## Evidencia y riesgo

Los handlers de cada sesión deciden principalmente por tipo de permiso. La allowlist incluye `clipboard-read`, `media`, `display-capture` y otros; no se compara el origen solicitante con el servicio esperado. `setPermissionCheckHandler` tampoco valida origen y `setDevicePermissionHandler` retorna `true` para todos los detalles. `ensureMacMediaAccess` retorna `true` fuera de macOS (`src/main.js:183-186`). Las vistas pueden navegar; no se encontró un filtro global de navegación para restringir cada sesión a un origen aprobado.

Esto concede capacidades sensibles a cualquier contenido que llegue a usar esa partición, en lugar de atarlas al proveedor y a consentimiento contextual. La disponibilidad y los prompts OS/browser pueden cambiar por plataforma; no se afirma que todos los permisos se exploten silenciosamente.

## Plan de remediación propuesto

- [ ] Paso 1: inventariar los orígenes y permisos realmente necesarios por proveedor.
- [ ] Paso 2: aplicar decisión de mínimo privilegio con origen comprobado y política por usuario; denegar lo demás.
- [ ] Paso 3: validar el comportamiento multimedia/clipboard en cada sistema operativo y cubrir navegación entre orígenes.

## Bitácora

- 2026-10-14: registrado desde `src/main.js`; no se modificó la política de permisos.
