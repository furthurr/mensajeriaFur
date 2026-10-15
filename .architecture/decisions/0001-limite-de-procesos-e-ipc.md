# ADR 0001: Mantener un límite explícito entre renderer y APIs nativas

- Estado: Aceptada (registro retrospectivo del diseño actual; la motivación histórica no está documentada).
- Fecha: 2026-10-14

## Contexto

La aplicación contiene una UI local y carga contenido web de terceros en vistas Electron. El proceso principal necesita capacidades del sistema operativo; la UI necesita solicitar operaciones como listar instancias, cambiar preferencias y controlar vistas.

## Decisión observada

La ventana se crea con `nodeIntegration: false` y `contextIsolation: true`; el preload usa `contextBridge` para exponer métodos de dominio puntuales y el proceso principal define los handlers IPC (`src/main.js:520-536,1297-1447`; `src/preload.js:1-45`).

Este ADR registra la arquitectura existente; no afirma que se haya elegido históricamente por una razón que no esté en el repositorio.

## Alternativas

- Exponer Node/Electron directamente al renderer — alternativa no utilizada; ampliaría el acceso del código UI a capacidades privilegiadas.
- Usar un puente central acotado con IPC — opción implementada.

## Consecuencias

- Positivas: privilegios explícitos y API comprensible desde la UI.
- Trade-offs: cada operación nueva exige coordinar canal, preload, handler y consumidor; la validación de entrada sigue siendo responsabilidad del proceso principal.
