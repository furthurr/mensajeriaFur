# SEC-0004: Handlers IPC sin validar el emisor

- Estado: Pendiente
- Severidad: 🟡 Media
- Referencia: Electron Security — validar sender de IPC · CWE-862 Missing Authorization
- Ubicación: `src/main.js:1297-1447`; API en `src/preload.js:1-45`
- Fecha detección: 2026-10-14

## Evidencia y riesgo

Los handlers `ipcMain.handle/on` permiten leer o modificar estado, abrir enlaces externos y consultar fuentes de pantalla, pero no verifican `event.sender` ni `senderFrame` contra la ventana/renderer local. La API preload solo se conecta a la ventana principal y las vistas remotas observadas no cargan ese preload, lo que reduce la exposición directa conocida; aun así, una frame/renderer no previsto o una futura ampliación podría llegar a operaciones privilegiadas sin comprobación de origen.

## Plan de remediación propuesto

- [ ] Paso 1: inventariar canales y emisores legítimos por operación.
- [ ] Paso 2: validar `senderFrame`/origen autorizado en operaciones privilegiadas y denegar emisores desconocidos.
- [ ] Paso 3: verificar que frames hijos, popups y vistas remotas no puedan invocar handlers locales.

## Bitácora

- 2026-10-14: hallazgo estático; no se intentaron mensajes IPC desde un emisor externo.
