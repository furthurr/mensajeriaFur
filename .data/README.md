# Datos y API — MensajeriaFur

Contrato canónico de persistencia local e interfaces de datos de la aplicación. No describe ni pretende reproducir las APIs privadas de los sitios de mensajería.

## Estado de sincronización

- Tecnología: JavaScript/Electron, `electron-store` y sesiones persistentes `session.fromPartition`.
- Modo: `full` (persistencia local y múltiples orígenes web externos; sin esquema relacional).
- ¿BD interna?: no. Hay almacenamiento key-value local y particiones de sesión Electron.
- Commit de referencia: `6234f3b8ccc3f2e667fe3aab875738950cafa3da` (HEAD; no incluye el bloqueo de inicio).
- Última actualización documental: 2026-10-14.
- Alcance actualizado: registro `appLock`, credenciales locales, estado público, acciones IPC y su autorización, contrastados con los archivos locales de producto y specs.
- Estado: actualizado para ese alcance local; pendiente de baseline Git verificable. El código y la documentación del feature aún no están incluidos en el commit de referencia.

## Contexto para IA

- **Qué consume/expone:** no hay cliente HTTP propio ni endpoints REST/GraphQL del producto observados; el renderer usa una API IPC expuesta por preload y las vistas Chromium cargan sitios de terceros cuyas APIs internas no son contrato de la app.
- **Auth:** el acceso local puede exigir Touch ID en macOS o contraseña propia antes de cargar servicios. Es independiente de la autenticación de proveedores, cuyas sesiones siguen en particiones persistentes. MensajeriaFur no define tokens de proveedor propios.
- **Modelos clave:** `Instance`, `Preferences`, `AppLockRecord`, `LockStatus`, tipos de servicio y listas ordenadas de IDs. Los detalles están en [modelos](02-models.md).
- **Fuentes de datos:** `electron-store` para estado de app; particiones `persist:<uuid>` para cookies/almacenamiento web de proveedores; catálogo local en `src/main.js`.
- **Convenciones:** IPC en `src/preload.js` ↔ handlers `ipcMain` en `src/main.js`; el esquema de datos runtime no está centralizado en JSON Schema ni validado completamente.
- **Campos sensibles/PII:** sesiones y alias; contraseña/confirmación transitorias y hash con salt en `appLock`. No se almacena biometría ni se expone hash/salt por IPC. Nunca registrar ni copiar valores.

## Índice

1. [Catálogo de interfaces y fuentes](01-endpoints.md)
2. [Modelos y esquemas observados](02-models.md)
3. [Mapeo entre almacenamiento e interfaz](03-mapping.md)
4. [Convenciones y errores](05-conventions.md)
5. [Datos sensibles y almacenamiento](06-sensitive-data.md)
6. [Entornos y orígenes](07-environments.md)
7. [Deuda técnica](data-tech-debt.md)

No hay sección ER: no se detectó una base de datos relacional/interna con entidades y relaciones.
