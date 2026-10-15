# QLT-0001: Manejadores de error silenciosos

- Estado: Pendiente
- Severidad: 🟢 Low
- Regla Sonar: `javascript:S108` · Cualidad: Maintainability
- Ubicación: `src/main.js:964-975,993-995,1078-1080,1200-1208,1246-1248,1429,1441`
- Fecha detección: 2026-10-14

## Descripción

Varios bloques `catch` vacíos y dos callbacks de rechazo vacíos descartan errores durante navegación de popups de Teams, cambios/desasociación de vistas y comprobación/descarga del updater. Algunas condiciones pueden ser esperadas por lifecycle, pero el código no registra el error ni explica dentro del handler cuándo se ignora intencionalmente. Esto reduce diagnósticos ante regresiones.

La detección fue una revisión documental estática, no un resultado ejecutado del analizador Sonar. Las páginas oficiales de reglas no pudieron recuperarse durante esta operación; no se crea cache local de reglas.

## Plan de remediación (micro-pasos; no autorizado por este registro)

- [ ] Paso 1: determinar para cada sitio qué fallos son esperados y cuáles deben registrarse.
- [ ] Paso 2: proponer el tratamiento mínimo por flujo y verificarlo con pruebas focalizadas.

## Bitácora

- 2026-10-14: hallazgo documentado desde revisión estática; no se modificó código.
