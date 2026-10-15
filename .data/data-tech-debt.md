# Deuda técnica de datos y API

Ordenada por impacto de integridad del contrato. Hallazgos documentales; no se ejecutan remediaciones.

## 🔴 Crítica

_No se verificaron hallazgos críticos de datos en el alcance revisado._

## 🟠 Alta

_No se verificaron hallazgos de alta severidad según los criterios de esta skill._

## 🟡 Media

| # | Hallazgo | Ubicación | Impacto | Esfuerzo | Recomendación |
|---|---|---|---|---|---|
| D-01 | `updateInstance` mezcla un objeto `data` sin allowlist con el registro persistido; no hay esquema runtime para restringir campos ni tipos. | `src/main.js:1184-1189,1321-1323` | Cambios de UI pueden introducir propiedades/valores incompatibles en datos existentes. El impacto de seguridad se analiza aparte en `.security/`. | Bajo/medio | Definir/validar el conjunto de campos mutables y el contrato con preload antes de ampliar el modelo. |
| D-02 | Los modelos nominales siguen implícitos y no hay validación de esquema general/versionado al cargar el store. Hay pruebas Node focalizadas de contraseña y bloqueo, pero no un script test en el manifiesto. | `src/main.js:575-598`; `tests/app-lock.test.js`; `tests/app-lock-integration.test.js`; `package.json:5-18` | Las pruebas del feature no acreditan compatibilidad de todos los registros persistidos. | Medio | Mantener esquemas y pruebas focalizadas; considerar validación/versionado si crece el modelo. |

## 🟢 Baja

| # | Hallazgo | Ubicación | Impacto | Esfuerzo | Recomendación |
|---|---|---|---|---|---|
| D-03 | Las APIs web de los proveedores son dependencias opacas y no hay contratos propios para ellas. | `src/main.js:65-94,827-842`; `src/preload.js:1-45` | Cambios upstream pueden romper navegación/autenticación sin que el contrato interno de la app cambie. | Bajo/continuo | Mantener excepciones verificadas en `specs/servicios.md`; no inventar schemas para tráfico web no controlado. |

## Sin hallazgos / no aplica

- No se detectó base de datos relacional ni esquema ER.
- No se detectaron endpoints HTTP propios, GraphQL, gRPC, colas, OpenAPI o contratos de API serializados en repo.
