# SEC-0003: Apertura externa de URLs no acotada

- Estado: Pendiente
- Severidad: 🟠 Alta
- Referencia: Electron Security — no usar `shell.openExternal` con contenido no confiable · CWE-862 Missing Authorization (contextual)
- Ubicación: `src/main.js:733-735,880-921,951-952,1407-1409`
- Fecha detección: 2026-10-14

## Evidencia y riesgo

Los handlers de ventanas de `WebContentsView` y de popups de Teams envían el `url` recibido a `shell.openExternal` cuando no aceptan el popup como flujo de autenticación. No verifican esquema/origen antes de delegar la URL a las asociaciones del sistema. Además, el handler IPC `open-external` pasa directamente el argumento a `shell.openExternal`; el emisor y la URL no se validan. Electron advierte que usar `shell.openExternal` con contenido no confiable puede permitir abuso de protocolos/handlers del sistema.

El About UI actual usa enlaces estáticos, pero las URLs que llegan desde ventanas de contenido remoto no son una lista estática controlada por el renderer.

## Plan de remediación propuesto

- [ ] Paso 1: acordar protocolos/orígenes permitidos y cuáles deben abrirse dentro de la app.
- [ ] Paso 2: centralizar una allowlist parseada con `URL`, rechazar protocolos peligrosos y validar la política antes de llamar al shell.
- [ ] Paso 3: probar URLs malformadas, protocolos no permitidos y flujos legítimos de login/enlaces externos.

## Bitácora

- 2026-10-14: registrado por inspección estática; no se llamó a `shell.openExternal` durante la auditoría.
