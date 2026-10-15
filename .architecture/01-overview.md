# 1. Resumen y alcance

## Objetivo y alcance

MensajeriaFur centraliza servicios de mensajería web en una aplicación de escritorio Electron para macOS, Linux y Windows. El alcance incluye la aplicación local, el acceso autenticado a proveedores externos, la persistencia local, la experiencia de usuario y el proceso de empaquetado/publicación. No existe un backend propio en el árbol de aplicación revisado.

El catálogo define 18 servicios con URL y propiedades de presentación en `src/main.js:65-94`; el índice funcional está en `specs/servicios.md`.

## Restricciones técnicas y organizativas

- Node.js 20 y Electron 41.2.1; JavaScript sin TypeScript, transpilación o bundler (`package.json`, `AGENTS.md`).
- HTML, JavaScript y CSS se sirven directamente desde `src/` (`src/main.js:520-536`, `src/index.html:1-8,273`).
- Persistencia local mediante `electron-store` y una sesión persistente Electron por instancia (`src/main.js:479-501,766-842`).
- Los builds se producen con `electron-builder`; las releases automatizadas cubren macOS, Linux y Windows (`package.json:28-150`, `.github/workflows/release.yml:12-158`).
- `specs/` es una fuente de comportamiento separada y está sujeta al gate CI descrito en `AGENTS.md` y `.github/workflows/specs-check.yml`.

## Solución en una frase

Un shell Electron local conserva la configuración y la UI; el proceso principal orquesta sesiones/vistas remotas aisladas y expone operaciones nativas por un puente preload/IPC explícito.

## Atributos arquitectónicos relevantes

- **Aislamiento de perfiles:** cada instancia tiene su propia partición persistente, para permitir cuentas múltiples.
- **Separación de privilegios:** `nodeIntegration: false` y `contextIsolation: true` en ventanas/vistas; el renderer local obtiene la API nativa mediante `contextBridge`.
- **Disponibilidad de sesiones web:** vistas no activas pueden mantenerse vivas en memoria; la vista activa se separa temporalmente cuando hay paneles superpuestos.
- **Compatibilidad:** decisiones de GPU, menús, permisos multimedia, proxy y App Nap varían por plataforma.
- **Distribución independiente:** el producto empaqueta recursos locales y depende de conectividad y disponibilidad de cada proveedor remoto.

Fuentes principales: `src/main.js:1-94,479-536,766-842,985-1082,1600-1652`; `src/preload.js:1-45`; `package.json:28-150`.
