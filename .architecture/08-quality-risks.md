# 8. Atributos de calidad y riesgos

| Atributo | Mecanismo observado | Riesgo / límite |
|---|---|---|
| Aislamiento de cuentas | Partición persistente por UUID de instancia. | Cada servicio mantiene su propio almacenamiento y puede cambiar su política de autenticación. |
| Separación de privilegios | Context isolation, node integration deshabilitado y API preload explícita. | El proceso principal sigue siendo un módulo amplio; cada handler/API requiere validación de entrada. |
| Usabilidad en múltiples servicios | Sidebar, dos órdenes independientes, tema y actualizaciones manuales. | Los cambios de DOM/UI y `WebContentsView` deben mantenerse coordinados. |
| Compatibilidad multiplataforma | Ajustes por plataforma, runners CI y targets separados. | Diferencias de permisos, GPU, firma, formatos de update y comportamiento de servicios externos amplían la matriz de validación. |
| Resiliencia | Recuperación GPU; updater reporta estados; pruebas Node focalizadas en `tests/app-lock*.test.js`. | No hay scripts test/lint en `package.json`. Las pruebas del bloqueo simulan Electron y Touch ID; no prueban UI real ni compatibilidad física por plataforma. |
| Mantenibilidad | Separación en main/preload/renderer y specs funcionales. | `src/main.js` concentra catálogo, ciclo de vistas, persistencia, IPC, compatibilidad y updater; el acoplamiento aumenta el riesgo de regresión al cambiar servicios. |
| Disponibilidad | Las sesiones de proveedor permanecen persistentes; varias vistas pueden conservar contenido. | Disponibilidad y API web son externas y fuera del control del proyecto. |
| Acceso local | Pantalla independiente y controles en main/IPC antes de cargar servicios; contraseña con hash o Touch ID nativo. | No cifra sesiones. Contraseña olvidada o Touch ID configurado pero no disponible pueden impedir el acceso; no hay recuperación automática (`src/main.js:137-205`; `src/app-lock.js:10-22`). |

La sesión de implementación registró 10 pruebas aprobadas con `node --test tests/*.test.js`, comprobaciones de sintaxis y `git diff --check`. Esta sincronización documental no las ha vuelto a ejecutar ni acredita pruebas físicas de Touch ID o builds de distribución.

Los hallazgos de mantenibilidad se priorizan en [deuda técnica](arch-tech-debt.md). La evaluación de calidad y seguridad de código se desarrolla en `.quality/` y `.security/`, sin convertir esta sección arquitectónica en un reporte de findings duplicado.
