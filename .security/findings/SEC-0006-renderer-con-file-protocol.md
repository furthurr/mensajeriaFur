# SEC-0006: Renderer local servido mediante `file://`

- Estado: Pendiente
- Severidad: 🟢 Baja
- Referencia: Electron Security — preferir protocolo local controlado · CWE-693 (hardening general)
- Ubicación: `src/main.js:536`
- Fecha detección: 2026-10-14

## Evidencia y riesgo

La ventana local se carga con `mainWindow.loadFile(path.join(__dirname, 'index.html'))`, que usa el protocolo `file://`. La guía oficial de Electron recomienda valorar un protocolo local personalizado para restringir mejor los recursos alcanzables por el renderer si ocurre una inyección.

La aplicación mantiene `nodeIntegration: false` y `contextIsolation: true`; esta recomendación es defensa en profundidad y no implica que el renderer tenga integración Node.

## Plan de remediación propuesto

- [ ] Paso 1: comprobar compatibilidad del empaquetado, rutas de recursos y CSP con un protocolo controlado.
- [ ] Paso 2: migrar solo con pruebas de recursos y de comportamiento en plataformas soportadas.

## Bitácora

- 2026-10-14: documentado como mejora opcional; sin cambios de protocolo.
