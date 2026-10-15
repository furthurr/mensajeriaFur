# SEC-0008: GPU sandbox desactivado en Linux

- Estado: Pendiente
- Severidad: 🟢 Baja
- Referencia: Electron Security — sandbox · CWE-693 (hardening general)
- Ubicación: `src/main.js:7-16`
- Fecha detección: 2026-10-14

## Evidencia y riesgo

El proceso añade `disable-gpu-sandbox` a todos los arranques Linux junto con switches de compatibilidad gráfica. El comentario documenta SIGTRAP de GPU como motivo; no se verificó una alternativa ni el impacto por target. Desactivar el sandbox del proceso GPU reduce una frontera de aislamiento como trade-off de compatibilidad.

## Plan de remediación propuesto

- [ ] Paso 1: revisar estabilidad y necesidad actual de cada switch por driver/plataforma.
- [ ] Paso 2: evaluar mitigación más acotada que conserve sandbox cuando sea viable.
- [ ] Paso 3: probar recuperación GPU y regresiones visuales en runners/hosts Linux objetivo.

## Bitácora

- 2026-10-14: documentado el switch; no se ejecutaron builds ni cambios de runtime.
