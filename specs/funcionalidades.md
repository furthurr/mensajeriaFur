# Funcionalidades

## Capacidad principal

La app centraliza 18 servicios de mensajeria dentro de una sola ventana de escritorio multiplataforma (macOS, Linux, Windows).

## Gestion de instancias

- se pueden crear multiples instancias por servicio
- cada instancia tiene `id`, `serviceType`, `name` y `enabled`
- una instancia puede habilitarse o deshabilitarse sin borrarse ni perder su sesion
- al eliminar una instancia tambien se elimina su sesion persistente (cookies, localStorage, IndexedDB)

## Servicios disponibles

Actualmente se soportan 18 servicios, entre ellos WhatsApp, Telegram, Slack, Discord, Teams, Instagram Direct, LinkedIn Messaging e Intercom.

El detalle completo vive en `servicios.md`.

## Barra lateral

- muestra solo instancias habilitadas
- permite cambiar de servicio activo
- soporta reordenamiento manual por drag and drop
- muestra badges de no leidos cuando el servicio los expone en el titulo de la pagina
- si la app esta fuera de primer plano, los no leidos mantienen la alerta aunque pertenezcan a la instancia activa
- al volver la app al primer plano, la instancia activa limpia su badge; otras instancias con no leidos conservan el suyo
- las alertas globales de app usan badge del sistema y solicitud de atencion de ventana cuando hay no leidos fuera de foco
- las instancias deshabilitadas no participan en el conteo global de alertas ni conservan una vista activa visible
- el parser de badges reconoce formatos comunes de titulo como `(3)`, `[3]`, `【3】`, `3 unread`, `new`, `mentions` y variantes equivalentes en espanol

## Ajustes y preferencias

Preferencias globales actuales:

- tema: `system`, `dark`, `light`
- abrir al iniciar sesion
- restaurar ultima instancia activa
- confirmar antes de eliminar
- permitir notificaciones
- permitir sonidos
- idioma de correccion ortografica (soporta: es-MX, es-ES, en-US, en-GB, pt-BR, fr-FR, de-DE, it-IT)

## Protección del inicio

- Ajustes → Seguridad muestra un switch que refleja si la autenticación al iniciar está activada; por defecto está desactivada.
- Cambiar el switch solicita el método configurado y solo actualiza su estado visual/persistido tras completar la autenticación; si se cancela o falla, conserva el estado anterior.
- En macOS con Touch ID disponible, la activación exige una autenticación nativa correcta. No se guardan datos biométricos en la app.
- Sin Touch ID disponible (incluidos Windows y Linux), se configura una contraseña propia de entre 8 y 1024 caracteres y se exige confirmarla.
- En cada nuevo arranque se muestra una pantalla bloqueada antes de cargar los servicios o exponer sus datos por IPC.
- Touch ID se solicita automáticamente al entrar a la pantalla bloqueada; la contraseña se introduce en el formulario. Cancelar o fallar permite reintentar, nunca omitir el bloqueo.
- Cinco contraseñas incorrectas imponen una espera de 30 segundos dentro del proceso actual.
- Desactivar la protección exige autenticar con el método configurado.
- Si Touch ID deja de estar disponible tras configurarlo, se mantiene el bloqueo y se indica habilitarlo de nuevo en el sistema; no hay cambio automático a contraseña ni recuperación de contraseña olvidada.
- El bloqueo no cifra las sesiones ni impide manipular archivos desde la misma cuenta del sistema operativo. No incluye bloqueo por inactividad, suspensión ni vuelta del segundo plano.
- Cerrar y volver a crear la ventana en macOS sin terminar el proceso no cuenta como un nuevo arranque.

## Menus y acciones contextuales

- menu nativo de aplicacion con accesos a servicios habilitados
- menu contextual sobre cada instancia para recargar o eliminar
- enlaces externos abiertos con el navegador del sistema
- modal `Acerca de la aplicacion` con accesos de contacto y reporte por redes sociales y correo

## Actualizaciones

- la app consulta actualizaciones usando `electron-updater`
- la descarga no es automatica; el usuario la dispara desde la UI
- la UI ofrece la accion `Descargar y actualizar`
- si el usuario inicia esa accion, la instalacion se lanza automaticamente al completar la descarga
- funciona en todas las plataformas: macOS, Linux y Windows

## Permisos y medios

La app permite permisos necesarios para mensajeria y videollamadas, como notificaciones, media y screen capture. Las notificaciones pueden bloquearse globalmente desde preferencias.

En macOS, cuando un servicio solicita camara o microfono via `getUserMedia`, la app consulta el estado nativo del sistema y dispara el prompt de permiso del sistema si el acceso aun no fue decidido.

## Screen sharing

La app puede capturar fuentes de escritorio (ventanas y pantallas) via `desktopCapturer` para compartir pantalla en videollamadas. Los permisos de screen capture se gestionan via el handler de permisos de sesion y el flujo de `getDisplayMedia` del proceso principal.

## Audio

Los webviews pueden estar silenciados o no segun la preferencia `soundsEnabled`. Cuando un servicio esta activo, su audio sigue las preferencias globales de sonido.

## Spellcheck

La app configura el diccionario de spellcheck segun la preferencia `spellcheckLanguage`. Esto se aplica a cada webview de instancia.
