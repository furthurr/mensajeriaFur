# Specs de MensajeriaFur

Esta carpeta documenta el comportamiento funcional y tecnico de MensajeriaFur.

## Objetivo

- Tener una referencia corta y mantenible de como esta construida la app.
- Dejar registradas decisiones de arquitectura y comportamiento relevantes.
- Obligar a actualizar la documentacion cuando cambie el producto.

## Indice

- `arquitectura.md`: separacion entre proceso principal, preload y renderer.
- `funcionalidades.md`: capacidades actuales de la app vistas desde producto.
- `ui.md`: comportamiento de sidebar, modales, ajustes y estados visuales.
- `persistencia.md`: datos guardados en `electron-store` y sesiones aisladas.
- `servicios.md`: servicios soportados y particularidades por servicio.
- `releases.md`: build, release, firma y notarizacion.

## Regla de mantenimiento

Actualiza esta carpeta cuando cambie alguno de estos puntos:

- comportamiento de `src/main.js`, `src/preload.js` o `src/renderer.js`
- nuevas preferencias, flujos o modales
- cambios en persistencia o estructura de datos
- alta o baja de servicios compatibles
- cambios en build, actualizaciones o releases

## Alcance

Las specs no sustituyen el codigo. Deben explicar el sistema y sus decisiones clave sin duplicar cada detalle de implementacion.
