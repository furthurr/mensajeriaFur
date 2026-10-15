# Colores

Fuente de verdad: `src/styles.css:1-101`.

## Tokens base (tema oscuro)

| Token | Valor | Uso observado |
|---|---|---|
| `--bg-dark` | `#1a1a2e` | Fondo de carga. |
| `--bg-body` | `#1a1a2e` | Fondo general de la ventana HTML. |
| `--bg-surface` | `#16213e` | Sidebar y superficie. |
| `--bg-surface-hover` | `#0f3460` | Hover de botones de servicio. |
| `--accent` | `#e94560` | Activo, badges, progreso y CTA. |
| `--text-primary` | `#eee` | Texto principal. |
| `--text-secondary` | `#aaa` | Texto de apoyo. |
| `--text-muted` | `#666` | Texto/íconos atenuados. |
| `--text-heading` | `#f3f5ff` | Títulos de ajustes. |
| `--popup-bg` | `#2a2a3e` | Menú contextual. |
| `--modal-bg` | `#1e1e30` | Fondo de modales. |
| `--bg-elevated-soft` | `rgba(255,255,255,0.04)` | Superficies discretas. |
| `--border-soft` | `rgba(255,255,255,0.1)` | Bordes divisorios. |

`--bg-sidebar` (`#16213e`) y `--bg-sidebar-hover` (`#0f3460`) están declarados en `:root`, pero no se encontraron usos `var(...)`; existen aliases equivalentes de superficie que sí se consumen.

## Overrides de tema claro

| Token | Valor claro |
|---|---|
| `--bg-body` | `#eef2fb` |
| `--bg-surface` | `#ffffff` |
| `--bg-surface-hover` | `#eef3ff` |
| `--bg-elevated` / `--popup-bg` / `--modal-bg` | `#ffffff` |
| `--bg-elevated-soft` | `rgba(15,23,42,0.04)` |
| `--text-primary` | `#162033` |
| `--text-secondary` | `#52607a` |
| `--text-muted` | `#7b889f` |
| `--text-heading` | `#0f172a` |
| `--border-soft` | `rgba(15,23,42,0.1)` |

El acento no cambia por tema. `body[data-theme='light']` añade overrides puntuales en welcome, surfaces, inputs y botones (`src/styles.css:24-101`). Los colores de los servicios vienen del catálogo y se aplican dinámicamente a elementos de UI (`src/main.js:65-94`; `src/renderer.js:369-393`).

## Colores directos importantes

La bienvenida usa gradientes literales; los botones primario/daño tienen valores propios y hover separados; otros componentes mezclan rgba directos con tokens (`src/styles.css:39-101,324-439,918-938,1536-1583`). Deben consultarse en la fuente antes de reutilizarlos.

## Notas de contraste

Con cálculo de luminancia sRGB de los valores de CSS y criterio WCAG 2.1 AA para texto normal (4.5:1): `#fff` sobre acento `#e94560` da 3.83:1; `--text-muted` (`#666`) sobre superficie oscura `#16213e` da 2.77:1; `#7b889f` sobre el fondo claro `#eef2fb` da 3.19:1. La deuda, superficies observadas y límites del cálculo están en [ui-tech-debt.md](../ui-tech-debt.md). No es una auditoría completa de cada par/estado.
