# Deuda técnica de arquitectura

Priorizada por impacto estructural. Hallazgos descriptivos; las recomendaciones no autorizan cambios de código.

## 🔴 Crítica

_No se verificaron hallazgos arquitectónicos de severidad crítica en el alcance documentado._

## 🟠 Alta

| # | Hallazgo | Ubicación | Impacto | Esfuerzo | Recomendación |
|---|---|---|---|---|---|
| A-01 | El proceso principal concentra catálogo, persistencia, vistas, permisos, proveedores, IPC, updater, SO y control de inicio protegido. La derivación/verificación de contraseña sí está separada. | `src/main.js:117,575,864,1398,1661`; `src/app-lock.js:1-25` | Mayor acoplamiento y riesgo de regresión cruzada al cambiar servicios o flujos de plataforma. | Medio/alto | Evaluar límites internos con contratos claros; preservar vistas, IPC y comportamiento por plataforma con verificaciones antes de extraer. Las pruebas del bloqueo cubren solo una parte del lifecycle. |

## 🟡 Media

| # | Hallazgo | Ubicación | Impacto | Esfuerzo | Recomendación |
|---|---|---|---|---|---|
| A-02 | El catálogo y las adaptaciones por proveedor están acoplados al proceso principal en lugar de separarse por integración. | `src/main.js:65-94,596-980` | Modificar compatibilidad de un proveedor requiere navegar un módulo que también controla lifecycle y permisos. | Medio | Mantener un inventario de reglas por proveedor y revisar el costo de cambio antes de introducir una frontera de adaptadores. |
| A-03 | La sincronización de visibilidad del contenido nativo depende de coordinación explícita entre UI, preload, IPC y `contentView`. | `src/renderer.js:258-274`; `src/main.js:1054-1082,1386-1388` | Un nuevo modal/panel que omita la señal puede dejar la vista remota encima de la UI. | Bajo/medio | Tratar la regla como invariante de aceptación en cambios de superposiciones y mantener un flujo manual de verificación. |

## 🟢 Baja

| # | Hallazgo | Ubicación | Impacto | Esfuerzo | Recomendación |
|---|---|---|---|---|---|
| A-04 | Las decisiones de arquitectura no tenían ADRs en la carpeta canónica al iniciar este bootstrap. | Código `src/main.js`, `src/preload.js`; nuevos ADRs | La intención histórica no se puede recuperar con certeza desde la implementación. | Bajo | Mantener los ADRs retrospectivos marcados como tales y registrar decisiones futuras al tomarlas. |

## Fuera de alcance

La calidad y seguridad detalladas de los handlers, permisos y validaciones corresponden a `.quality/` y `.security/`. No se recomiendan remediaciones en este registro.
