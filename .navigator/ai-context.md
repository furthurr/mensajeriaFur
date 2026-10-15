# Contexto para IA — MensajeriaFur

## Propósito y stack

Aplicación de escritorio Electron que reúne 18 servicios de mensajería web con sesiones persistentes aisladas por instancia. Usa JavaScript/HTML/CSS sin TypeScript, bundler ni transpilación; empaqueta para macOS, Linux y Windows.

## Mapa rápido

- `src/main.js`: proceso principal, inicio protegido, servicios, `WebContentsView`, autorización IPC, persistencia, permisos, SO y updater.
- `src/preload.js`: API acotada `window.api` a través de `contextBridge`.
- `src/renderer.js`, `src/index.html`, `src/styles.css`: UI local.
- `src/lock.html`, `src/lock.js`: pantalla previa de autenticación; `src/app-lock.js`: derivación/verificación de contraseña local. Contratos en `.data/`, flujo en `.architecture/` y componentes en `.design/`.
- `tests/app-lock*.test.js`: pruebas Node del bloqueo con Electron/Touch ID simulados.
- `package.json`, `build/`, `linux/`, `scripts/`, `.github/workflows/`: build, empaquetado y releases.

## Fuentes y autoridad

- `AGENTS.md`: instrucciones operativas del proyecto.
- `README.md`: uso y desarrollo.
- `specs/`: comportamiento funcional/técnico requerido por CI; mantenerla ante cambios relevantes.
- `.architecture/`, `.data/`, `.design/`, `.quality/` y `.security/`: referencias especializadas complementarias; cada README indica alcance y límites.
- `.navigator/`: índice auxiliar para localizar responsabilidades; no sustituye código, manifiestos, workflows ni specs.

## Límites

No hay scripts npm de test, lint o typecheck; las pruebas focalizadas se invocan con `node --test tests/*.test.js`. No sustituyen pruebas físicas o visuales. El renderer se carga sin compilación. No indexar dependencias descargadas, outputs de build, secretos ni datos personales.

## Baseline

- Referencia Git histórica: `6234f3b8ccc3f2e667fe3aab875738950cafa3da` (HEAD, anterior al feature).
- Actualización: 2026-10-14 (local), para el bloqueo de inicio en el working tree. Pendiente de baseline Git verificable: se omite `source_commit` del mapa porque no hay un commit que contenga los nuevos módulos.
- Capas 0 y 1 presentes. Symbols y grafo siguen deshabilitados por `config.yaml`; no se han generado ni se ha cambiado la configuración.
