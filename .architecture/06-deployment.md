# 6. Despliegue y distribución

## Desarrollo local

- Entrada de desarrollo: `npm start` → `electron .` → `src/main.js` (`package.json:5-18`).
- No hay build de renderer; Electron carga `src/index.html` directamente (`src/main.js:520-536`).
- La configuración del empaquetador incluye `src/**/*`, iconos y recursos gráficos; output `dist/` (`package.json:140-150`).

## Empaquetado

| Plataforma | Targets configurados | Arquitecturas documentadas en CI |
|---|---|---|
| macOS | DMG y ZIP | x64 y arm64 |
| Linux | DEB y AppImage | x64 y arm64 |
| Windows | NSIS y portable | x64 |

Targets y recursos: `package.json:28-150`. Las variantes de comandos para desarrollo local están en `AGENTS.md` y `specs/releases.md`.

## Release CI

`.github/workflows/release.yml` se ejecuta en tags `v*` o `workflow_dispatch`, con jobs independientes para macOS (`macos-14`), Linux (`ubuntu-24.04`, matriz x64/arm64) y Windows (`windows-latest`). Instala dependencias con `npm ci`, construye y sube artefactos; al tratarse de un tag publica los assets en GitHub Release (`.github/workflows/release.yml:1-158`).

La firma/notarización de macOS depende de secretos de entorno y `scripts/notarize.js`; la política actual y requisitos están registrados en `specs/releases.md` y `AGENTS.md`. No reproducir aquí valores de secretos.

En Windows no se fija `win.publisherName`: electron-builder infiere el editor del certificado cuando existe y omite ese campo de `resources/app-update.yml` cuando no hay certificado. Así, el updater no exige una firma inexistente en los builds sin firma y conserva la verificación en los builds firmados. La recuperación manual de instalaciones con el editor fijo anterior se documenta en `specs/releases.md`.

## Auto-update

El `publish` provider de `electron-builder` está configurado como GitHub (`package.json:132-138`). El updater comprueba metadatos, valida extensiones esperadas por plataforma y habilita descarga explícita (`src/main.js:1455-1527,1544-1585`). Los nombres de artefactos y metadatos se coordinan con el workflow de release; los contratos de publicación detallados permanecen en `specs/releases.md`.

## Límites operativos

- Los artefactos se escriben en `dist/` y están fuera del contexto versionado de fuentes.
- No hay comandos de pruebas, lint o typecheck declarados en `package.json`; no se afirma una validación automatizada de esas categorías.
- La construcción y publicación real por plataforma depende de los runners y credenciales configurados; esta documentación no certifica builds ejecutados.
