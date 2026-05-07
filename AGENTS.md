# AGENTS.md

## Project

MensajeriaFur — Electron desktop app that embeds 18 messaging services in isolated webviews. Cross-platform: macOS, Linux, Windows. Vanilla JS, no bundler, no transpilation.

## Tech stack

- Electron 41.2.1, electron-builder 25.0.0, electron-store 8.2.0, electron-updater 6.8.3
- Node 20, npm (lockfile v3)
- No TypeScript, no bundler, no linter, no formatter, no test framework

## Commands

```bash
npm start           # launch app in dev mode (electron .)
npm run build       # build for current platform (mac dmg, linux deb, win nsis)
npm run build:mac   # build macOS dmg only
npm run build:mac:all # build macOS dmg + zip for x64 + arm64
npm run build:dmg   # build macOS dmg only
npm run build:zip   # build macOS zip only
npm run build:linux # build Linux deb + AppImage
npm run build:linux:all # build Linux deb for x64 + arm64
npm run build:deb   # build Linux deb only
npm run build:win   # build Windows nsis + portable for x64
npm run build:win:x64 # build Windows x64 only
```

There are no `test`, `lint`, or `typecheck` commands.

## Source layout (5 files)

| File | Role |
|---|---|
| `src/main.js` | Main process: window, IPC handlers, service definitions, electron-store persistence, auto-updater |
| `src/preload.js` | Context bridge — exposes 24 methods via `window.api` |
| `src/renderer.js` | Renderer UI: sidebar, modals, settings, drag-and-drop, theme |
| `src/index.html` | Single HTML page loaded by main window |
| `src/styles.css` | All styles, CSS custom properties for dark/light theming |

## Architecture gotchas

- **Per-instance sessions:** each service instance uses `session.fromPartition('persist:<uuid>')` for isolated cookies/storage. This enables multiple accounts per service.
- **Native view visibility sync:** `WebContentsView` is detached from the window when modals/settings open and re-attached when they close (`syncNativeViewVisibility()`). Forgetting this causes overlapping UI.
- **Dual ordering:** sidebar and settings panel each have independent drag-and-drop orderings stored separately in electron-store (`sidebarOrder` / `settingsOrder`).
- **User-agent overrides:** WhatsApp, Slack, and Microsoft Teams use custom user-agent strings to avoid being blocked. Teams also has URL migration logic for `/unsupported-browser` redirects and interactive auth popup handling.
- **No build pipeline for renderer:** HTML/JS/CSS are loaded directly by Electron — no bundling step exists.
- **Badge state tracking:** instances track unread counts by parsing page titles; active instance badge is cleared automatically.

## Cross-platform compatibility

### macOS
- App Nap prevention via `powerSaveBlocker.start('prevent-app-suspension')` — keeps webviews alive when backgrounded
- Native menu bar integration
- Hardened Runtime + notarization supported

### Linux (Ubuntu 24.04+)
- X11 forced via `--ozone-platform-hint=x11` (Electron 41 has known Wayland bugs)
- NVIDIA GPU SIGTRAP mitigation: `--disable-gpu-sandbox --use-gl=angle --use-angle=vulkan`
- AppArmor profile bundled at `linux/apparmor-profile`
- Installs icons via `linux/install-icons.sh`

### Windows (10/11)
- AppUserModelId set via `app.setAppUserModelId('com.mensajeriafur.app')` for taskbar grouping and notifications
- D3D11 ANGLE backend forced: `--use-angle=d3d11`
- Software rasterizer fallback disabled: `--disable-software-rasterizer`
- Proxy/NTLM handler: `app.on('login')` prevents silent connection failures on corporate networks

### GPU crash recovery
- Linux and Windows auto-relaunch with `--disable-gpu` flag when GPU process crashes

## Build & release

- **Platforms:** macOS (dmg, zip), Linux (deb, AppImage), Windows (nsis, portable)
- **Architectures:** x64 and arm64 for macOS/Linux; x64 for Windows
- **CI:** runs on `macos-14` (mac), `ubuntu-24.04` (linux), `windows-latest` (win)
- **Triggers:** `v*` tags or `workflow_dispatch`
- **Signing:** macOS requires `CSC_LINK`, `CSC_KEY_PASSWORD`. Notarization requires `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID`.
- **Windows signing:** requires certificate configured in electron-builder
- **Scripts:**
  - `scripts/notarize.js` runs as `afterSign` hook; skips gracefully if env vars are missing
  - `scripts/linux-after-install.sh` and `scripts/linux-after-remove.sh` for .deb post-install hooks
- Build artifacts go to `dist/` (gitignored).

## Auto-update

- Uses `electron-updater` with manual trigger (no auto-download)
- Works on all platforms: macOS, Linux, Windows
- Flow: check → available → download (manual) → install on quit
- Renderer exposes `checkForUpdates`, `downloadUpdate`, `installUpdate` via `window.api`

## Conventions

- UI and menus are in **Spanish**.
- Commit messages follow **Conventional Commits** (mix of English and Spanish).
- Root PNG images (`icono.png`, `mensajeriaFur_fondo.png`, `pedro.png`) and ICO (`icono.ico`) are bundled into the app via electron-builder `files` config — do not move or rename without updating `package.json` build config.
- Specs are authoritative and must be updated when product behavior changes (`specs-check.yml` enforces this on PRs).

## Specs enforcement (CI)

The `specs-check.yml` workflow runs on every push (except `v*` tags) and PR. It requires `specs/` to be updated when these files change:

```
src/, package.json, package-lock.json, scripts/notarize.js, .github/workflows/release.yml
```

This pattern is defined in the workflow as `RELEVANT_PATTERN`. If your change touches any of these and you don't update `specs/`, the PR will fail CI.