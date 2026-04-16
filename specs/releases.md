# Releases

## Desarrollo local

Comandos disponibles:

```bash
npm start
npm run build
npm run build:dmg
npm run build:zip
```

## Build

- objetivo actual: macOS
- artefactos: `.dmg` y `.zip`
- salida: `dist/`

## Workflow de release actual

Archivo:

- `.github/workflows/release.yml`

Se ejecuta en:

- `push` de tags `v*`
- `workflow_dispatch`

El workflow:

- instala dependencias con `npm ci`
- compila la app para macOS
- sube artefactos como artifact de GitHub Actions
- publica assets en la release asociada al tag

## Firma y notarizacion

La configuracion soporta firma y notarizacion de Apple mediante variables de entorno y secretos:

- `CSC_LINK`
- `CSC_KEY_PASSWORD`
- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `APPLE_TEAM_ID`

El script `scripts/notarize.js` se ejecuta como `afterSign`.

## Regla documental

Si cambian los formatos de salida, el proceso de build, la publicacion o el flujo de actualizaciones, tambien debe actualizarse esta spec.

## Version 1.0.7

Cambios visibles incluidos en esta version:

- actualizacion del modal `Acerca de la aplicacion` con menu de contacto y reporte
- nuevo enlace de correo `mailto:pedrogvas@gmail.com`
- ajuste visual del bloque de iconos y scroll interno del modal
- CTA de actualizacion `Descargar y actualizar`
