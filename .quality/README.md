# Calidad de código — MensajeriaFur

Estado canónico de la auditoría de calidad. Los hallazgos registran evidencia; no se modificó producto ni se ejecutó remediación.

## Estado de sincronización

- Lenguajes revisados: JavaScript (main/preload/renderer y scripts) y shell de instalación Linux.
- Commit de código analizado: `6234f3b8ccc3f2e667fe3aab875738950cafa3da` (working tree limpio antes de esta operación).
- Última actualización: 2026-10-14.
- Alcance: revisión estática documental de archivos de aplicación y scripts; no se ejecutó Sonar.
- Baseline: documentación local generada después del commit indicado; queda pendiente incluirla en Git.

## Contexto para IA

- **Stack/build:** Electron/JavaScript, npm y `electron-builder`; no hay framework de tests, linter ni typecheck declarado en `package.json`/`AGENTS.md`.
- **Quality gate:** no hay configuración/reportes Sonar detectados ni gate de calidad ejecutable; no puede declararse aprobado o fallido.
- **Métricas:** cobertura, duplicación y complejidad no están medidas. Ver [metrics.md](metrics.md).
- **Hallazgos abiertos:** 1 bajo, `QLT-0001`; ver [tablero](quality-tech-debt.md).
- **Reglas de referencia:** revisión manual de patrones Sonar para JavaScript; descarga de páginas públicas de reglas no disponible durante esta operación, por lo que no se creó una caché normativa local.

## Índice

- [Tablero de hallazgos](quality-tech-debt.md)
- [Detalle de QLT-0001](findings/QLT-0001-manejadores-de-error-silenciosos.md)
- [Métricas](metrics.md)

No se creó `.quality/standards/` al no poder verificar/recuperar reglas desde la documentación pública durante el preflight de esta auditoría.
