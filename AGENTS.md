# AGENTS.md

## Project

MensajeriaFur — Electron desktop app (macOS-only) that embeds 18 messaging services in isolated webviews. Vanilla JS, no bundler, no transpilation.

## Tech stack

- Electron 32, electron-builder 25, electron-store 8
- Node 20, npm (lockfile v3)
- No TypeScript, no bundler, no linter, no formatter, no test framework

## Commands

```bash
npm start          # launch app in dev mode (electron .)
npm run build      # build macOS .dmg + .zip → dist/
npm run build:dmg  # build .dmg only
npm run build:zip  # build .zip only
```

There are no `test`, `lint`, or `typecheck` commands.

## Source layout (5 files)

| File | Role |
|---|---|
| `src/main.js` | Main process: window, IPC handlers, service definitions, electron-store persistence |
| `src/preload.js` | Context bridge — exposes 16 methods via `window.api` |
| `src/renderer.js` | Renderer UI: sidebar, modals, settings, drag-and-drop, theme |
| `src/index.html` | Single HTML page loaded by main window |
| `src/styles.css` | All styles, CSS custom properties for dark/light theming |

## Architecture gotchas

- **Per-instance sessions:** each service instance uses `session.fromPartition('persist:<uuid>')` for isolated cookies/storage. This enables multiple accounts per service.
- **Native view visibility sync:** `WebContentsView` is detached from the window when modals/settings open and re-attached when they close (`syncNativeViewVisibility()`). Forgetting this causes overlapping UI.
- **Dual ordering:** sidebar and settings panel each have independent drag-and-drop orderings stored separately in electron-store (`sidebarOrder` / `settingsOrder`).
- **User-agent overrides:** WhatsApp and Microsoft Teams use custom user-agent strings to avoid being blocked. Teams also has URL migration logic for `/unsupported-browser` redirects.
- **No build pipeline for renderer:** HTML/JS/CSS are loaded directly by Electron — no bundling step exists.

## Build & release

- macOS-only targets (dmg, zip). No Windows/Linux config.
- CI runs on `macos-14` (`.github/workflows/release.yml`), triggered by `v*` tags or `workflow_dispatch`.
- Signing requires `CSC_LINK`, `CSC_KEY_PASSWORD`. Notarization requires `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID`.
- `scripts/notarize.js` runs as `afterSign` hook; skips gracefully if env vars are missing.
- Build artifacts go to `dist/` (gitignored).

## Conventions

- UI and menus are in **Spanish**.
- Commit messages follow **Conventional Commits** (mix of English and Spanish).
- Root PNG images (`icono.png`, `mensajeriaFur_fondo.png`, `pedro.png`) are bundled into the app via electron-builder `files` config — do not move or rename without updating `package.json` build config.
