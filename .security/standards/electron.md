# Referencias de seguridad — Electron desktop

Resumen de estándares públicos consultados el 2026-10-14 para esta auditoría. Se usa como checklist adaptado, no como certificación.

## Guía oficial de seguridad de Electron

Fuente: [Electron Security](https://www.electronjs.org/docs/latest/tutorial/security).

Principios aplicables al proyecto:

1. Tratar el contenido remoto como no confiable; cargarlo por HTTPS y mantener `nodeIntegration` desactivado y `contextIsolation` habilitado.
2. Activar el sandbox de renderers y revisar explícitamente permisos de cada sesión; validar el origen antes de conceder capacidades.
3. Definir CSP, limitar navegación y ventanas nuevas, y validar el emisor de cada mensaje IPC.
4. No pasar contenido no confiable a `shell.openExternal`; restringir protocolo/origen antes de delegar en el sistema operativo.
5. Mantener Electron y sus dependencias actualizados y no exponer APIs Electron a contenido web no confiable.
6. Usar un protocolo local controlado en vez de `file://` cuando sea viable; revisar fuses y otras defensas del empaquetado.

El tutorial advierte que Electron no es un navegador de propósito general y que el uso de contenido remoto aumenta la responsabilidad del producto. Esta aplicación necesita servicios web externos; por eso debe limitar sus permisos y capacidades a lo mínimo necesario.

## OWASP ASVS

Fuente: [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/), versión estable 5.0.0 indicada por el proyecto ASVS al momento de consulta.

Se usa como marco de verificación adaptable para:

- control de acceso/permisos y autorización por origen;
- validación de entrada y fronteras IPC;
- configuración segura del cliente y controles de contenido;
- protección de datos sensibles y operación de dependencias.

ASVS está orientado a aplicaciones web; aquí se adapta a la UI local y a sus límites con Electron. No se declara cumplimiento ASVS.

## CWE seleccionados

| CWE | Aplicación en este repositorio | Referencia |
|---|---|---|
| CWE-862 Missing Authorization | Permisos de sesión/IPC sin comprobar el emisor u origen del contenido solicitante. | [MITRE CWE-862](https://cwe.mitre.org/data/definitions/862.html) |
| CWE-939 Improper Authorization in Handler for Custom URL Scheme | Referencia de frontera para handlers URL; solo aplicable cuando el patrón concreto corresponda. No se asigna automáticamente a `shell.openExternal`. | [MITRE CWE-939](https://cwe.mitre.org/data/definitions/939.html) |
| CWE-250 Execution with Unnecessary Privileges | Uso de entitlements/capacidades más amplios de lo que se haya justificado. | [MITRE CWE-250](https://cwe.mitre.org/data/definitions/250.html) |
| CWE-693 Protection Mechanism Failure | Clasificación genérica para controles de hardening ausentes; la página MITRE advierte que es demasiado abstracta para mapping de vulnerabilidad concreto. | [MITRE CWE-693](https://cwe.mitre.org/data/definitions/693.html) |
| CWE-20 Improper Input Validation | Concepto de validación; MITRE desaconseja usar este CWE genérico para mapear una vulnerabilidad concreta. | [MITRE CWE-20](https://cwe.mitre.org/data/definitions/20.html) |

## Límites

No se usó MASVS como estándar principal porque este proyecto es Electron de escritorio, no una app móvil nativa. No se analizó la seguridad interna de los proveedores, el tráfico TLS real, binarios empaquetados ni CVEs de dependencias. Las guías pueden cambiar: volver a consultarlas al revisar hallazgos en otra operación.
