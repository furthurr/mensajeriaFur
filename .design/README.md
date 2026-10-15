# Sistema visual — MensajeriaFur

Documentación canónica del sistema visual existente. No añade tokens al producto ni copia assets.

## Estado de sincronización

- Tecnología: HTML/CSS/JavaScript vanilla dentro de Electron.
- Fuentes visuales: `src/styles.css`, `src/index.html`, `src/renderer.js`, `src/lock.html`, `src/lock.js` y recursos gráficos de raíz.
- Commit de referencia: `6234f3b8ccc3f2e667fe3aab875738950cafa3da` (HEAD; no incluye el bloqueo de inicio).
- Última actualización: 2026-10-15.
- Alcance actualizado: pantalla de bloqueo, sección Seguridad, switch accesible de protección, estados de autenticación y estilos compartidos, contrastados con el código local.
- Estado: actualizado para ese alcance local; pendiente de baseline Git verificable. No acredita validación en ventana renderizada, lector de pantalla ni Touch ID físico.

## Contexto para IA

La UI está hecha con HTML/CSS y JavaScript sin framework ni compilación. Los tokens viven parcialmente en `src/styles.css:1-22,68-81`; `src/renderer.js:1013` selecciona tema `system`, `dark` o `light` y asigna `body[data-theme]`. Hay variables CSS de color/dimensiones, pero gran parte de colores, spacing, radios y tipografía sigue hardcodeada por componente. Los iconos de servicios son SVG inline en `src/renderer.js`; los iconos funcionales están inline en HTML; imágenes de marca viven en la raíz.

- **Temas:** oscuro por defecto, claro y sistema en la UI principal. `lock.html` usa los valores oscuros por defecto: `lock.js` no aplica la preferencia ni añade `data-theme`.
- **Puntos de entrada:** shell principal en `src/index.html` / `src/renderer.js`; inicio protegido en `src/lock.html` / `src/lock.js`; estilos compartidos en `src/styles.css`. Seguridad se renderiza dentro de ajustes, no como un nuevo modal.
- **Regla visual relevante:** la UI local comparte ventana con `WebContentsView` nativo; al abrir ajustes o modales se oculta temporalmente la vista nativa (ver `.architecture/07-crosscutting.md`).
- **Estado:** no hay escala formal completa de espaciado, tipografía o elevación. Se documentan valores existentes y deuda, sin afirmar cumplimiento WCAG general.

## Índice

- Fundamentos: [colores](foundations/colors.md), [tipografía](foundations/typography.md), [espaciado](foundations/spacing.md), [formas y elevación](foundations/shape-elevation.md), [iconografía](foundations/iconography.md).
- [Componentes](components.md)
- [Deuda técnica de UI](ui-tech-debt.md)

## Mantenimiento

El CSS/HTML/renderer son fuentes de verdad. `specs/ui.md` registra comportamiento funcional; este sistema de diseño registra valores, componentes y consistencia visual, sin sustituir esa spec.
