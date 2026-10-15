# Seguridad — Tablero de hallazgos

Auditoría documental estática. Estado `Pendiente` significa pendiente de evaluación/remediación; este documento no concede autorización de código.

| ID | Severidad | Referencia | Hallazgo | Ubicación | Estado |
|---|---|---|---|---|---|
| SEC-0001 | 🟠 Alta | ASVS Control de acceso · CWE-862 | Captura de pantalla asigna automáticamente una fuente en plataformas sin selector del sistema. | `src/main.js:214-228,814-823` | Pendiente |
| SEC-0002 | 🟠 Alta | ASVS Control de acceso · CWE-862 | Permisos multimedia/clipboard por sesión se otorgan por tipo sin comprobar origen solicitante; el permiso de dispositivo acepta todo. | `src/main.js:773-823` | Pendiente |
| SEC-0003 | 🟠 Alta | Electron Security: `shell.openExternal` · CWE-862 | URLs procedentes de popups remotos se envían directamente al manejador del sistema; el IPC `openExternal` tampoco aplica allowlist. | `src/main.js:733-735,880-921,951-952,1407-1409` | Pendiente |
| SEC-0004 | 🟡 Media | Electron Security: validar sender · CWE-862 | Handlers IPC privilegiados no validan que `event.sender`/frame sea la ventana local autorizada. | `src/main.js:1297-1447` | Pendiente |
| SEC-0005 | 🟡 Media | Electron Security: CSP · CWE-693* | No se encontró Content Security Policy en el renderer local. | `src/index.html:1-8`; carga en `src/main.js:520-536` | Pendiente |
| SEC-0006 | 🟢 Baja | Electron Security: protocolo local · CWE-693* | El renderer local se carga mediante `file://` (`loadFile`) en vez de un protocolo controlado. | `src/main.js:536` | Pendiente |
| SEC-0007 | 🟡 Media | ASVS configuración segura · CWE-693* | El perfil AppArmor instalado marca el ejecutable como `unconfined`, por lo que no aplica confinamiento efectivo. | `linux/apparmor-profile:4-7`; instalación `scripts/linux-after-install.sh:12-20` | Pendiente |
| SEC-0008 | 🟢 Baja | Electron Security: sandbox · CWE-693* | Linux desactiva el GPU sandbox incondicionalmente como mitigación de compatibilidad. | `src/main.js:7-16` | Pendiente |
\* CWE-693 se usa solo como clasificación general de hardening, no como mapping de una vulnerabilidad concreta; CWE-20 tampoco se asigna por la advertencia de MITRE. Evidencia y límites están en los [hallazgos](findings/).
