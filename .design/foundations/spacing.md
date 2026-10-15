# Espaciado y dimensiones

Fuente de verdad: `src/styles.css:1-3,120-160,166-223,284-293,324-350,408-418,461-527,544-575,718-810`.

## Tokens y medidas de estructura

| Medida | Valor | Uso |
|---|---:|---|
| `--sidebar-width` | 70px | Ancho de sidebar; también se refleja en el layout de vistas. |
| `--titlebar-height` | 0px | Offset reservado arriba del contenido local. |
| Botón de servicio | 46 × 46px | Acceso de sidebar; SVG a 22 × 22px. |
| Acción inferior de sidebar | 36 × 36px | Botón de ajustes/agregar. |
| Icono de servicio | 28px contenedor / 22px SVG | Centrado dentro del botón. |
| Welcome content | `min(1120px, 100%)` | Ancho máximo. |

No se declara escala `--space-*`. Los gaps observados incluyen 4, 6, 8, 10, 12, 14, 16, 18, 24 y 32px; paddings representativos incluyen 4, 8, 10, 12, 14, 16, 18, 20, 24, 28 y 40px. Se documentan como valores vigentes, no como tokens existentes.

## Breakpoints

- `max-width: 960px`: welcome cambia de dos columnas a una y reduce padding (`src/styles.css:544-556`).
- `max-width: 640px`: welcome y enlaces de contacto compactan; filas de ajustes pasan a alinear arriba (`src/styles.css:558-576,1506-1528`).

## Candidatos a estandarización

Un pequeño conjunto de spacing tokens semánticos (compacto/normal/amplio) ayudaría a reducir las numerosas medidas por componente sin alterar el layout intencional. Ver [deuda técnica](../ui-tech-debt.md).
