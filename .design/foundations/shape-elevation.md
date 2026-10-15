# Formas y elevación

Fuente de verdad: `src/styles.css:14,135-148,166-200,225-241,361-381,415-470,499-530,611-621,845-894,1374-1409,1449-1472`.

## Radios

`--border-radius: 12px` es el único token de radio general. Hay componentes con radios específicos: 3/4px para detalles y scrollbars, 6/8/9/10px en botones/inputs, 12px en superficies y botones, 14/16/18px en cards, 22/28px en bienvenida y `50%`/`999px` para círculos/píldoras. Los radios son intencionales por jerarquía visual, pero no se agrupan en una escala nombrada.

## Bordes

- `--border-soft` define separadores/superficies y cambia con el tema.
- Se usan bordes de 1px, ocasionalmente dashed, y bordes de 2px para drag-over/outline; varios colores son rgba directos.
- Inputs tienen borde semántico al foco; botones de contacto usan outline de foco visible.

## Elevación y movimiento

| Efecto | Valor observado | Uso |
|---|---|---|
| Hover de icono de app | `0 12px 28px rgba(0,0,0,.28)` | Logo de sidebar. |
| CTA bienvenida | `0 18px 36px rgba(233,69,96,.25)` | Botón principal. |
| Panel welcome | `0 24px 60px rgba(0,0,0,.28)` | Card de bienvenida. |
| Popup | `0 8px 24px rgba(0,0,0,.4)` | Menú de instancia. |
| Focus select | `0 0 0 3px rgba(233,69,96,.14)` | Campo de idioma. |

Las sombras y transiciones están hardcodeadas por componente; `--transition` cubre algunos pero no todos. No hay tokens de elevación ni preferencia `prefers-reduced-motion` en el CSS revisado.
