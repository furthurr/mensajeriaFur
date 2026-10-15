# SEC-0001: Captura de pantalla sin selector explícito fuera de macOS

- Estado: Pendiente
- Severidad: 🟠 Alta
- Referencia: ASVS — control de acceso/consentimiento · CWE-862 (mapping contextual)
- Ubicación: `src/main.js:214-228,814-823`
- Fecha detección: 2026-10-14

## Evidencia y riesgo

`selectDisplayMediaStreams` elige como preferida la primera fuente `screen:` (o la primera fuente) y la devuelve a Electron directamente. `setDisplayMediaRequestHandler` usa `useSystemPicker` únicamente en macOS; en Linux/Windows no hay selector del sistema configurado en este código. Una petición de captura de un sitio remoto puede recibir la fuente elegida automáticamente, sin que esta lógica presente una pantalla para elegir monitor/ventana.

El disparo de `getDisplayMedia` puede depender de las reglas de gesto de usuario del proveedor/Chromium; no se ejecutó una prueba dinámica. El hallazgo se limita a la selección automática una vez que Electron llama al handler.

## Plan de remediación propuesto

- [ ] Paso 1: definir consentimiento y UX esperado para cada plataforma y para screen/window/audio.
- [ ] Paso 2: presentar un selector explícito o denegar por defecto hasta recibir una selección válida.
- [ ] Paso 3: probar con origen local controlado en macOS, Windows y Linux; confirmar cancelación y fuente seleccionada.

## Bitácora

- 2026-10-14: registrado mediante análisis estático; sin cambios de código ni pruebas runtime.
