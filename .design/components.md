# Catálogo de componentes

La estructura funcional permanece en `specs/ui.md`; este documento resume componentes visuales, estilos y estados.

## Shell y sidebar

- **Propósito:** navegación persistente entre instancias y acceso a añadir/ajustes.
- **Partes:** sidebar de 70px; logo, lista desplazable, botón de instancia y acciones inferiores.
- **Estados:** normal, hover, activa (acento), deshabilitada (opacidad/grayscale), arrastrando y destino de drag.
- **Tokens/medidas:** `--bg-surface`, `--bg-surface-hover`, `--accent`, `--border-soft`; servicio 46px, icono 22px.
- **Fuente:** `src/index.html:10-28`; `src/styles.css:120-320`; `src/renderer.js:167-230,276-340`.

## Badge de servicio

- **Propósito:** número de mensajes no leídos o punto simple.
- **Estados:** conteo y punto; se asocia al servicio, ocultándose/limpiándose según estado recibido.
- **Estilo:** píldora acento, texto blanco 10px bold; `src/styles.css:225-249`.

## Bienvenida y chips de servicio

- **Propósito:** orientación inicial y acceso a alta cuando no hay servicio habilitado.
- **Variantes:** dos columnas escritorio; una columna bajo 960px; botones apilados bajo 640px.
- **Tokens:** gradientes y colors mayormente directos, card de 28px con sombra; servicio chip 46px.
- **Fuente:** `src/index.html:31-70`; `src/styles.css:324-576`.

## Panel de ajustes

- **Propósito:** preferencias generales, tema, seguridad de inicio, spellcheck, actualizaciones e información de la app.
- **Controles:** segmentos de tema, toggles de preferencia, switch accesible de protección al iniciar, campos de autenticación, select de idioma y botones de acción.
- **Estados:** switch marcado/no marcado, foco visible, deshabilitado durante autenticación, error/cancelación sin cambiar estado y confirmación; `src/renderer.js:439-464,589-652`; `src/styles.css:1132-1205`.

### Switch de protección al iniciar

- **Propósito:** mostrar y cambiar el estado de autenticación al iniciar.
- **Semántica:** checkbox nativo con `role="switch"`, nombre accesible enlazado a “Protección al iniciar” y descripción de método/feedback.
- **Interacción:** activar/desactivar reutiliza `appLockAction`; el switch refleja el estado previo hasta completar autenticación. En la activación con contraseña, los campos de creación/confirmación aparecen antes del switch; al desactivar con contraseña se solicita la actual.
- **Estados visuales:** seleccionado con acento y thumb desplazado; no seleccionado con superficie neutral; foco con `:focus-visible`; pendiente deshabilitado con opacidad reducida.
- **Fuente:** `src/renderer.js:452-464,589-652`; `src/styles.css:1132-1205`.

## Pantalla de bloqueo y formulario de Seguridad

| Componente | Propósito / variantes | Tokens y medidas observadas | Fuente |
|---|---|---|---|
| `.lock-screen` | Pantalla independiente, centrada; no overlay de las vistas nativas. | Flex, mínimo `100vh`, overflow auto; `--bg-body`, `--text-primary`. | `src/styles.css:25-33`; `src/lock.html:10-23` |
| `.auth-card` | Tarjeta de acceso con marca, título, explicación y formulario. | Ancho `min(440px, calc(100vw - 48px))`, margen 24px, padding 28px, borde 1px `--border-soft`, radio `--border-radius` (12px), fondo `--bg-elevated`; logo 72×72px. | `src/styles.css:35-45`; `src/lock.html:11-14` |
| `.auth-form` | Formulario compartido entre bloqueo y Seguridad. | Columna flex, gap 10px, margen superior 16px; labels 14px. | `src/styles.css:46-47` |
| Input de contraseña | Captura actual o nueva/confirmación según acción. | Ancho 100%, alto mínimo 42px, padding 10×12px, margen superior 4px, radio 10px; `--text-primary`, `--bg-elevated-soft`, `--border-soft`. | `src/styles.css:48-59`; `src/renderer.js:444-450` |
| Acción de autenticación | Reutiliza `.settings-link-btn`; disponible o pendiente. | Deshabilitado: opacidad 0.55, cursor `wait`; foco visible de input/botón: outline 2px `--accent`, offset 3px. | `src/styles.css:60-64` |
| `.auth-error` / `.auth-hint` | Feedback de operación y explicación/advertencias. | 13px, line-height 1.5; feedback `--accent` y alto mínimo 20px; hint `--text-secondary`, margen superior 12px. El feedback de éxito en ajustes reutiliza el color de error. | `src/styles.css:65-66`; `src/renderer.js:596-599` |

### Estados y accesibilidad de autenticación

- **Carga inicial:** acción deshabilitada hasta resolver el estado. Si falla la consulta, se muestra un error y se mantiene sin acceso (`src/lock.js:30-43`).
- **Contraseña:** label visible, `type=password`, autocompletado `current-password`, campo requerido y foco inicial; en ajustes la creación añade confirmación y `new-password` (`src/lock.html:16-18`; `src/lock.js:35-40`; `src/renderer.js:444-450`).
- **Biometría:** campo oculto; botón con texto específico y solicitud automática una vez. Cancelar/fallar devuelve feedback y permite reintentar con el botón (`src/lock.js:7-43`). El prompt nativo lo presenta macOS, no HTML.
- **En curso:** tanto la UI como main impiden solicitudes concurrentes; el botón queda deshabilitado. Al finalizar se vacían los campos (`src/lock.js:7-22`; `src/renderer.js:577-610`).
- **Feedback:** bloqueo usa `role=alert`; ajustes usa `role=status` con `aria-live=polite`, y la sección tiene `aria-labelledby`. El formulario puede enviarse con Enter; no se verificó la experiencia con lector de pantalla.
- **Temas:** la sección Seguridad hereda el tema de la UI principal. La pantalla independiente usa el oscuro predeterminado y no consulta la preferencia (ver UI-06 en [deuda técnica](ui-tech-debt.md)).
- **Cierre:** cerrar ajustes limpia los campos; cerrar la ventana bloqueada no autentica. En macOS puede seguir ejecutándose el proceso, aunque el texto de la pantalla diga «salir» (`src/renderer.js:897`; `src/lock.html:22`; `specs/funcionalidades.md`).

## Selector, alta y confirmación de baja

- **Propósito:** elegir un proveedor, asignar alias y confirmar eliminación.
- **Estados visuales:** modal oculto/visible; acciones primaria y cancelación; eliminación diferenciada con botón de peligro.
- **Fuente:** `src/index.html:128-173`; `src/styles.css:1180-1349,1530-1583`.

## Menú contextual de instancia

- **Propósito:** recargar o borrar; también permite habilitar/deshabilitar según el contexto del menú nativo.
- **Estados:** hover y opción activa disponible; menu HTML contiene botones estándar.
- **Fuente:** `src/index.html:88-106`; `src/styles.css:611-679`; handlers en `src/main.js:1339-1384`.

## Acerca de y actualización

- **Acerca de:** cover, tarjeta de autor y accesos; imágenes usan `alt`, botones de contacto usan `aria-label` y `focus-visible`.
- **Actualización:** modal de estado/progreso con acciones de descargar más tarde/descargar; barra de progreso acento.
- **Fuente:** `src/index.html:175-245,245-275`; `src/styles.css:1350-1528,1618-1655`.

## Accesibilidad observada

Los documentos HTML declaran idioma español, las imágenes relevantes tienen `alt`, algunas acciones icon-only poseen `aria-label` y el grupo de tema tiene nombre accesible (`src/index.html:2,12-27`; `src/renderer.js:416`). La autenticación añade labels, regiones de feedback y foco visible para sus campos/botones (`src/lock.html:15-20`; `src/styles.css:60-63`). Esto no resuelve por sí solo la semántica/foco del resto de modales ni certifica accesibilidad global. El análisis previo de contraste/reducción de movimiento se registra en [deuda técnica](ui-tech-debt.md).
