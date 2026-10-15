# 7. Entornos y orígenes de datos

## Aplicación

No se identificó configuración de backend propio ni perfiles `dev/staging/prod` para una API de MensajeriaFur. Los metadatos de servicios se definen en `src/main.js:65-94`; esta documentación usa placeholders y no replica dominios de producción.

| Tipo de origen | Representación segura | Propietario / configuración |
|---|---|---|
| Sitio de mensajería | `<PROVIDER_ORIGIN>` | Servicio de terceros; URL en catálogo fuente, sesión autenticada en webview. |
| Publicación de updates | `<GITHUB_RELEASE_PROVIDER>` | `electron-builder` con proveedor GitHub; metadatos validados por updater (`package.json:132-138`; `src/main.js:1492-1527`). |
| Persistencia app | `<ELECTRON_USER_DATA>` (ubicación conceptual; ruta exacta en runtime no verificada) | Archivo gestionado por `electron-store` (`src/main.js:479-501`). |
| Perfil web de instancia | `<ELECTRON_PARTITION>/persist:<INSTANCE_UUID>` | Session partition de Electron (`src/main.js:771`). |

## Release/firmado

Las variables y secretos de firma están descritos en `AGENTS.md` y `specs/releases.md`. `.data/` no guarda valores ni nombres de credenciales; para no duplicar configuración de release, consultar esas fuentes con permisos apropiados.

No se publican aquí dominios reales, tokens, certificados ni rutas personales.
