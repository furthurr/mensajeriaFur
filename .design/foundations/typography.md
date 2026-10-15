# Tipografía

Fuente de verdad: `src/styles.css:110-117,166-240,361-445,480-541,793-908,1383-1428,1536-1578`.

## Familias

| Familia | Pesos disponibles | Uso |
|---|---|---|
| `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, `Helvetica`, `Arial`, `sans-serif` | Heredados del sistema; no se descargan fuentes ni se declara `@font-face`. | `body` completo. |

## Estilos representativos observados

| Estilo | Tamaño | Peso | Línea / espaciado | Uso |
|---|---|---|---|---|
| Título de bienvenida | `clamp(44px, 6vw, 68px)` | 800 | `line-height: .96`, `letter-spacing: -.04em` | Hero principal. |
| Lead de bienvenida | 18px | No fijado | `line-height: 1.7` | Texto de introducción. |
| Título de panel | 18px | 700 | No fijado | Cabecera de panel de bienvenida. |
| Título de bloque de ajustes | 16px | No fijado | No fijado | Secciones de preferencias. |
| Texto de ajuste | 14px | 500/600 en variantes | Secundario a 13px y `line-height: 1.5` | Etiqueta y descripción. |
| Etiqueta/caption | 12px | 600 | `letter-spacing: .06em` o `.08em`, uppercase | Chips y captions. |
| Badge | 10px | 700 | `line-height: 1` | Conteo de no leídos. |
| Botón estándar | 14px | 500/600 | No fijado | Acciones/modales. |

También aparecen tamaños directos de 13, 15, 22, 24 y 28px. No existe una escala tipográfica nombrada ni un `line-height` base global; los valores se declaran localmente por selector.
