# SEC-0005: Renderer local sin Content Security Policy

- Estado: Pendiente
- Severidad: 🟡 Media
- Referencia: Electron Security — definir CSP · CWE-693 (clasificación general; no mapping CVE)
- Ubicación: `src/index.html:1-8`; carga en `src/main.js:520-536`
- Fecha detección: 2026-10-14

## Evidencia y riesgo

La página local se carga con `loadFile`; el `<head>` define charset, viewport, título y CSS, pero no una política CSP. No se encontraron cabeceras CSP o una política inyectada para la ventana local. Electron recomienda una CSP restrictiva como defensa adicional contra XSS e inyección de datos.

No se verificó un sink de XSS explotable durante esta auditoría; el hallazgo es un control de hardening ausente, no una afirmación de que ya exista una XSS.

## Plan de remediación propuesto

- [ ] Paso 1: inventariar scripts, estilos, recursos y templates dinámicos para definir una política compatible con el renderer vanilla.
- [ ] Paso 2: añadir CSP restrictiva en el mecanismo elegido y retirar excepciones innecesarias.
- [ ] Paso 3: probar navegación, iconos, estilos, modales y rechazo de recursos no permitidos.

## Bitácora

- 2026-10-14: ausencia confirmada en las fuentes revisadas; no se cambió HTML ni configuración.
