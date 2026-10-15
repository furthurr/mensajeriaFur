# Deuda técnica de UI

Evaluación documental de los estilos existentes. No se ejecutaron cambios de producto. Contraste calculado con luminancia relativa sRGB sobre pares representativos del CSS; el análisis no recorre cada combinación, estado, monitor ni captura renderizada.

## 🔴 Crítica

| # | Hallazgo | Ubicación | Impacto | Esfuerzo | Recomendación |
|---|---|---|---|---|---|
| UI-01 | Pares de texto normal quedan bajo WCAG 2.1 AA (4.5:1): texto blanco en CTA/acento `#e94560` es 3.83:1; en degradado de welcome, blanco sobre `#ff5c7a` y `#ff7d8f` es 2.97:1 y 2.45:1. `--text-muted` también es bajo sobre superficies reales: `#666` sobre `#16213e` es 2.77:1; `#7b889f` sobre fondo claro `#eef2fb` es 3.19:1. | `src/styles.css:4-10,15-36,430-433,845-870,1553-1562` | Puede dificultar lectura de texto pequeño en botones, badges/controles y etiquetas en ambos temas; los pares de texto normal no cumplen el umbral AA. | Bajo/medio | Revisar los colores de texto y fondo por tema/estado y validar todas las combinaciones afectadas con WCAG antes de modificar UI. |

## 🟠 Alta

_No se verificaron inconsistencias de severidad alta aparte del hallazgo de contraste anterior._

## 🟡 Media

| # | Hallazgo | Ubicación | Impacto | Esfuerzo | Recomendación |
|---|---|---|---|---|---|
| UI-02 | El foco de teclado no tiene regla visible común para todos los controles. La autenticación ya añade `:focus-visible`, labels y regiones de feedback; esa mejora no cubre el resto de modales ni una semántica de diálogo uniforme. | `src/styles.css:60-63`; `src/lock.html:15-20`; `src/index.html:108-173,175-275` | Usuarios de teclado/tecnología asistiva pueden perder contexto fuera del nuevo formulario. | Medio | Revisar recorrido de teclado y semántica de diálogos; extender estados focus-visible de forma consistente tras validar la UI. |
| UI-03 | Se usan animaciones/transiciones CSS sin una regla `prefers-reduced-motion` observada. | `src/styles.css:143-177,423-433,596-603,681-693,1585-1598,1639-1644` | Movimiento no configurable para usuarios que solicitan reducción de movimiento. | Bajo | Documentar y comprobar un modo reducido antes de ampliar animaciones. |
| UI-04 | No existe escala compartida de spacing y hay radios/tamaños/colores por componente; algunas variables de color de sidebar están declaradas pero sin referencias `var(...)`. | `src/styles.css:1-21,120-320,415-530,704-939` | Aumenta el costo de mantener consistencia entre componentes y temas. | Medio | Consolidar tokens semánticos únicamente al surgir cambios visuales que lo justifiquen; eliminar aliases sin uso tras validar referencias. |
| UI-06 | El inicio protegido no aplica la preferencia de tema: `lock.html` no carga el renderer principal y `lock.js` no establece `data-theme`. | `src/lock.html:8-24`; `src/lock.js:1-43`; `src/renderer.js:1013` | El acceso aparece oscuro aunque la UI principal esté configurada en claro o sistema. | Bajo/medio | Si se requiere consistencia, definir cómo aplicar apariencia antes de autenticar sin exponer datos de servicios; implementarlo por el flujo de producto. |

## 🟢 Baja

| # | Hallazgo | Ubicación | Impacto | Esfuerzo | Recomendación |
|---|---|---|---|---|---|
| UI-05 | Los tamaños tipográficos, sombras y transiciones se declaran localmente, con variación por selector y sin escala semántica completa. | `src/styles.css:110-117,361-445,596-603,1356-1472,1536-1650` | Ajustes globales requerirían revisar varios estilos. | Medio | Mantener una escala tipográfica de referencia al incorporar nuevas pantallas; no forzar un refactor sin necesidad. |

## Alcance del análisis

No se hizo auditoría visual en una ventana renderizada ni prueba de lector de pantalla. Los ratios citados son cálculos sobre valores representativos estáticos del CSS; los gradientes, transparencias y todos los estados deben volver a medirse en cualquier remediación futura.

La sincronización del bloqueo se limita a estados y estilos verificables en código. No recalcula los ratios del análisis previo ni declara resueltos sus hallazgos; las ubicaciones históricas de otros estilos pueden corresponder al baseline inicial. Las pruebas Node del feature no verifican contraste, layout ni interacción del prompt nativo.
