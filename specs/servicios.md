# Servicios

## Catalogo actual

Servicios soportados en el codigo (18 total):

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

Usa un user agent especifico para mejorar compatibilidad con la version web embebida. Aplica en todas las plataformas.

### Microsoft Teams

Usa un user agent especial y logica de migracion de URL. Si la vista cae en `/unsupported-browser` o en la raiz antigua (`teams.microsoft.com`), la app vuelve a cargar la URL moderna esperada (`/v2/?clientexperience=t2`).

Teams también tiene manejo interactivo de autenticacion:
- Detecta URLs de `login.microsoftonline.com` y `login.live.com`
- Abre una ventana de autenticacion interactiva cuando `error=interaction_required` aparece
- El popup de auth puede abrir popups anidados que также se manejan

### Google Auth popups

Cuando un servicio usa user agent override (WhatsApp, Slack, Teams), los popups de Google Auth usan el user agent por defecto para evitar bloqueos de Google.

## Multiples cuentas

Todos los servicios pueden tener multiples instancias gracias al aislamiento por particion persistente (`persist:<uuid>`).

## Compatibilidad

Los user agents especiales y la logica de migracion aplican a todas las plataformas (macOS, Linux, Windows) ya que los servicios web pueden behave differently segun el browser signature.