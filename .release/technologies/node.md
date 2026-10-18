# Perfil de release — Node / Electron

- **Señales de detección:** `package.json`, `package-lock.json` y dependencia Electron.
- **Archivos de versión:** `package.json` → `version`; `package-lock.json` → `version` y `packages[""].version`.
- **Formato:** SemVer `MAJOR.MINOR.PATCH`, sin contador de build independiente.
- **Bump:** actualizar los tres valores de forma consistente; para automatizar se puede usar `npm version <version> --no-git-tag-version`.
- **Tag:** anotado `vX.Y.Z`, sobre el commit de release en `main`.
- **CHANGELOG:** `CHANGELOG.md`, entradas en español con versión, fecha y secciones por tipo de cambio.
- **Distribución:** GitHub Releases de `furthurr/mensajeriaFur`, mediante `.github/workflows/release.yml` al subir el tag. No se publica en el registro npm.
- **Verificación:** `node --test`; comprobar que las versiones coinciden, generar instaladores y contrastar los archivos y SHA-512 con `latest*.yml`.
- **Windows:** no fijar `win.publisherName` sin certificado; electron-builder infiere el titular si hay certificado. Las instalaciones con la configuracion anterior bloqueada requieren una instalacion manual de la version corregida.
- **Gates:** confirmar versión, notas, commits, creación del tag y push antes de ejecutar cada operación autorizada.
- **Fuentes:** https://docs.npmjs.com/cli/v11/commands/npm-version y `.github/workflows/release.yml` — consultadas el 2026-10-18.
