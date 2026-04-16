# Servicios

## Catalogo actual

Servicios soportados en el codigo:

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

## Propiedades por servicio

Cada servicio define al menos:

- nombre visible
- URL de entrada
- color de marca usado en UI
- user agent especial si el servicio lo necesita

## Casos especiales

### WhatsApp

Usa un user agent especifico para mejorar compatibilidad con la version web embebida.

### Microsoft Teams

Usa un user agent especial y una regla de migracion de URL. Si la vista cae en `/unsupported-browser` o en la raiz antigua, la app vuelve a cargar la URL moderna esperada.

## Multiples cuentas

Todos los servicios pueden tener multiples instancias gracias al aislamiento por particion persistente.
