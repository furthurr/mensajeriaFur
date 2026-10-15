# Métricas de calidad

| Métrica | Estado actual | Fuente / límite |
|---|---|---|
| Cobertura de pruebas | No medida; no hay suite ni comando de test declarado. | `package.json:5-18`; `AGENTS.md:11,29`. |
| Duplicación | No medida. | Sin Sonar ni métrica de duplicación configurada. |
| Complejidad | No medida con herramienta. | No se ejecutó analizador estático; las observaciones estructurales están en `.architecture/arch-tech-debt.md`. |
| Deuda técnica estimada | Sin estimación de tiempo. | 1 hallazgo manual bajo en `quality-tech-debt.md`; no extrapolar a todo el repo. |
| Quality gate | No ejecutado / no verificable. | No se detectó `sonar-project.properties`, reporte Sonar o configuración de gate. |

La revisión de calidad de esta operación es estática y documental. No se instalaron herramientas ni se modificó código.
