# Dependencias y estado SCA

## Inventario declarado

| Componente | Rango declarado | Tipo | Fuente |
|---|---|---|---|
| Electron | `^41.2.1` | Runtime / plataforma Chromium + Node | `package.json:24-27` |
| electron-builder | `^25.0.0` | Build/empaquetado | `package.json:24-27` |
| electron-store | `^8.2.0` | Persistencia local | `package.json:152-155` |
| electron-updater | `^6.8.3` | Actualizaciones | `package.json:152-155` |

El repositorio contiene `package-lock.json` (lockfile v3 indicado por `AGENTS.md`), que fija el árbol resuelto para instalaciones reproducibles. El rango declarado de Electron es una línea 41.x; la guía de Electron consultada recomienda mantener el runtime actualizado, pero no se comparó contra el ciclo de soporte ni se asoció a un CVE concreto.

## Estado de evaluación

- SCA/npm audit: no ejecutado.
- SBOM: no detectado ni generado.
- CVEs: sin resultado verificable en esta operación; **no equivale a “sin vulnerabilidades conocidas”**.
- Sonar/escáner de dependencias: no se encontró configuración/reporte en el repo.

Próxima revisión: ejecutar SCA como operación aprobada con acceso a fuentes de advisory, revisar la versión resuelta en lockfile y registrar advisories verificables antes de afirmar estado de vulnerabilidad.
