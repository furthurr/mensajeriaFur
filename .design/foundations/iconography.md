# Iconografía y assets

Fuentes: `src/renderer.js:1-20,167-230`; `src/index.html:10-27,93-105,117-123`; recursos de raíz incluidos en `package.json:143-150`.

## Sistema observado

- Los 18 iconos del catálogo de servicios son strings SVG inline en `SERVICE_ICONS` de `src/renderer.js`; se generan con viewBox 24×24 y suelen usar `currentColor`. Algunos SVG individuales definen color/opacity en sus paths.
- Los iconos funcionales de sidebar, popup y ajustes también son SVG inline en HTML, no hay dependencia o font iconográfica.
- Los símbolos dinámicos del servicio se escalan a ~22–24px según componente; los iconos de acciones HTML se declaran normalmente a 16–20px.
- El catálogo ofrece color por servicio y el renderer usa ese color en active state y fondos (`src/main.js:65-94`; `src/renderer.js:369-393`).

## Imágenes

Se referencian recursos de raíz como `icono.png`, `mensajeriaFur_fondo.png` y `pedro.png`; `package.json:143-150` los incluye en el empaquetado. Se mantienen en su ubicación existente: esta carpeta solo documenta rutas y no copia binarios.

## Recomendaciones de consistencia

- Mantener el grid/viewBox y los tamaños por contexto; no mezclar nuevos formatos externos sin una decisión visual.
- Verificar que los SVG decorativos sean ignorados por lectores de pantalla y que cada botón tenga nombre accesible (los atributos actuales se documentan en `components.md`).
- Evitar hardcodear colores dentro de paths si el icono debe adaptarse a ambos temas.
