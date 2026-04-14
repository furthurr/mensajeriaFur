![MensajeriaFur](./mensajeriaFur_fondo.png)

# MensajeriaFur

![Release](https://img.shields.io/github/v/release/furthurr/mensajeriaFur?label=release)
![License](https://img.shields.io/github/license/furthurr/mensajeriaFur)
![Platform](https://img.shields.io/badge/platform-macOS-111827)
![Workflow](https://img.shields.io/github/actions/workflow/status/furthurr/mensajeriaFur/release.yml?label=release%20build)

Aplicacion de escritorio para centralizar multiples servicios de mensajeria en una sola ventana usando Electron.

## Descarga

- Ultima release: https://github.com/furthurr/mensajeriaFur/releases/latest

## Vista previa

![Vista previa de MensajeriaFur](./mensajeriaFur_fondo.png)

## Caracteristicas

- Acceso rapido a servicios como WhatsApp, Telegram, Slack, Discord, Messenger y mas.
- Soporte para multiples instancias por servicio.
- Barra lateral con orden manual de apps activas.
- Panel de ajustes con tema `claro`, `oscuro` y `sistema`.
- Modal de informacion de la app con datos del autor y enlace a GitHub.
- Build para macOS en formato `.app`, `.dmg` y `.zip`.

## Servicios compatibles

- WhatsApp
- Telegram
- Slack
- Messenger
- Discord
- Google Chat
- Microsoft Teams
- Signal
- Skype
- WeChat
- Line
- Viber
- Instagram Direct
- X / Twitter DM
- LinkedIn Messaging
- Zendesk
- Intercom
- Google Messages

## Requisitos

- Node.js
- npm
- macOS para generar el build `.app`

## Desarrollo

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

Los artefactos generados quedan en `dist/`.

## Releases automáticas

El repositorio incluye un workflow de GitHub Actions que:

- compila la app en macOS
- genera `.dmg` y `.zip`
- publica los archivos en una release cuando se crea un tag `v*`

Ejemplo:

```bash
git tag v1.0.1
git push origin v1.0.1
```

Nota: en GitHub Actions el build puede salir sin firma ni notarizacion si no se configuran certificados y credenciales de Apple.

## Autor

Pedro G. V. `@furthurr`

- GitHub: https://github.com/furthurr

## Licencia

MIT
