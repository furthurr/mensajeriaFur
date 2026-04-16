# Funcionalidades

## Capacidad principal

La app centraliza multiples servicios de mensajeria dentro de una sola ventana de escritorio.

## Gestion de instancias

- se pueden crear multiples instancias por servicio
- cada instancia tiene `id`, `serviceType`, `name` y `enabled`
- una instancia puede habilitarse o deshabilitarse sin borrarse
- al eliminar una instancia tambien se elimina su sesion persistente

## Servicios disponibles

Actualmente se soportan 18 servicios, entre ellos WhatsApp, Telegram, Slack, Discord, Teams, Instagram Direct, LinkedIn Messaging e Intercom.

El detalle completo vive en `servicios.md`.

## Barra lateral

- muestra solo instancias habilitadas
- permite cambiar de servicio activo
- soporta reordenamiento manual por drag and drop
- muestra badges de no leidos cuando el servicio los expone en el titulo de la pagina

## Ajustes y preferencias

Preferencias globales actuales:

- tema: `system`, `dark`, `light`
- abrir al iniciar sesion
- restaurar ultima instancia activa
- confirmar antes de eliminar
- permitir notificaciones
- permitir sonidos
- idioma de correccion ortografica

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

## Permisos y medios

La app permite permisos necesarios para mensajeria y videollamadas, como notificaciones, media y screen capture. Las notificaciones pueden bloquearse globalmente desde preferencias.
