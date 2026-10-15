# Arquitectura — MensajeriaFur

Documentación canónica de la arquitectura actual. Describe el código y los flujos observados; `specs/` sigue siendo la referencia de comportamiento que exige CI.

## Estado de sincronización

- Tecnología: Electron 41, JavaScript sin bundler, renderer HTML/CSS cargado directamente.
- Modo: `full` — un proceso principal, un renderer local, un puente preload, vistas nativas por instancia, 18 integraciones web y empaquetado multiplataforma.
- Commit de referencia: `6234f3b8ccc3f2e667fe3aab875738950cafa3da` (HEAD; no contiene el bloqueo de inicio).
- Última actualización documental: 2026-10-14.
- Alcance de esta sincronización: bloqueo de inicio y sus impactos en componentes, ejecución y límites de confianza, contrastados con `src/`, `specs/` y `tests/` locales.
- Estado: actualizado para ese alcance local; pendiente de baseline Git verificable. El hash anterior no incluye los cambios de producto ni estos documentos. No acredita una auditoría ni verificación física de Touch ID.

## Contexto para IA

MensajeriaFur es una aplicación Electron de escritorio que reúne 18 servicios de mensajería web en una ventana. El proceso principal de `src/main.js` controla servicios, vistas `WebContentsView`, sesiones por instancia, almacenamiento local, IPC, integración con el SO y actualizaciones. `src/preload.js` expone una API de capacidad limitada; el renderer local (`src/index.html`, `src/renderer.js`, `src/styles.css`) la consume mediante `window.api`. Cada instancia usa una partición persistente separada; preferencias y metadatos viven en `electron-store`.

- **Límites:** el renderer de la aplicación no debe acceder directamente a módulos Electron; toda operación nativa pasa por preload/IPC. Las páginas de los proveedores se ejecutan en `WebContentsView` y no son parte del DOM local.
- **Dependencias:** UI → API preload → handlers del proceso principal; el proceso principal configura la ventana, carga el preload y crea las vistas de proveedores. La configuración de empaquetado selecciona el entrypoint `src/main.js` y los recursos de distribución.
- **Invariante visual:** al cubrir la vista nativa con ajustes o un modal, el renderer notifica al proceso principal para desasociar el `WebContentsView`; se vuelve a adjuntar cuando la vista debe mostrarse.
- **Inicio protegido:** `src/main.js` decide entre `lock.html` y `index.html` según `appLock`. La pantalla `lock.js` solo solicita autenticación; `src/app-lock.js` deriva/verifica hashes y el proceso principal controla Touch ID, persistencia y autorización IPC. No se cargan vistas de servicios mientras `appLocked` sea verdadero.
- **Decisiones registradas:** [ADR 0001 — límite de procesos e IPC](decisions/0001-limite-de-procesos-e-ipc.md), [ADR 0002 — sesiones persistentes por instancia](decisions/0002-sesiones-por-instancia.md).
- **Fuentes de verdad:** código en `src/`, manifiesto `package.json`, workflows `.github/workflows/` y contratos funcionales en `specs/`. Esta carpeta analiza estructura y riesgos; no reemplaza esas fuentes.

## Índice

1. [Resumen y alcance](01-overview.md)
2. [Contexto C4 (C1)](02-context.md)
3. [Contenedores C4 (C2)](03-containers.md)
4. [Componentes C4 (C3)](04-components.md)
5. [Flujos de ejecución](05-runtime.md)
6. [Despliegue y distribución](06-deployment.md)
7. [Conceptos transversales](07-crosscutting.md)
8. [Atributos y riesgos](08-quality-risks.md)
9. [Glosario](glossary.md)
10. [Deuda técnica arquitectónica](arch-tech-debt.md)
