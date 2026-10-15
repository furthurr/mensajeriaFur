# Seguridad — MensajeriaFur

Estado canónico de los riesgos de seguridad verificados. La auditoría de esta operación es estática y documental; no se modificó código ni se ejecutó una prueba dinámica.

## Estado de sincronización

- Tecnología: Electron 41 / JavaScript, contenido local y 18 servicios web externos dentro de `WebContentsView`.
- Perfil: aplicación de escritorio con acceso a sesiones web persistentes, permisos multimedia, captura de pantalla y apertura de enlaces del sistema.
- Commit de código analizado: `6234f3b8ccc3f2e667fe3aab875738950cafa3da` (working tree limpio antes de este bootstrap).
- Última actualización: 2026-10-14.
- Baseline: estos documentos se generan localmente después del commit indicado; no forman parte del commit.
- Hallazgos abiertos: 8 — 3 altos, 3 medios y 2 bajos. Ver [tablero](security-tech-debt.md).
- Límite: no se ejecutaron pruebas dinámicas, SCA/SBOM, revisión de secretos automatizada ni validación de permisos por SO.

## Contexto para IA

La aplicación carga sitios de terceros por HTTPS en sesiones persistentes separadas y mantiene una UI local con `contextIsolation` y `nodeIntegration: false`. El proceso principal expone una API IPC y habilita capacidades como clipboard, media y captura de pantalla. Los riesgos principales son el alcance de permisos por origen, selección automática de fuente de pantalla y apertura de URLs externas. No se afirma que las sesiones estén cifradas por una capa propia ni que el paquete esté libre de CVEs.

## Índice

- [Tablero de seguridad](security-tech-debt.md)
- [Hallazgos](findings/)
- [Inventario de PII/secretos](pii-secrets.md)
- [Dependencias y límites SCA](dependencies.md)
- [Estándares de Electron, ASVS y CWE](standards/electron.md)

## Controles observados

- Las URLs iniciales declaradas para los servicios usan HTTPS (`src/main.js:65-94`).
- La ventana principal y las vistas remotas configuran `nodeIntegration: false` y `contextIsolation: true` (`src/main.js:520-536,835-842`).
- El preload expone métodos específicos en vez de publicar directamente `ipcRenderer` (`src/preload.js:1-45`).
- Las sesiones registran handlers de permisos, pero no restringen por origen; los hallazgos documentan esa diferencia.

## Revisión pendiente, no hallazgo confirmado

Los entitlements de `build/entitlements.mac.plist:5-22` incluyen capacidades sensibles. Su necesidad por entitlement no se pudo determinar desde el repositorio; deben justificarse durante la próxima revisión de firma macOS. No se clasifican como vulnerabilidad confirmada.
