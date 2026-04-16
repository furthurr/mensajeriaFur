# UI

## Estructura general

La interfaz HTML se compone de:

- sidebar fija a la izquierda
- zona principal ocupada por el servicio activo o la bienvenida
- modales para seleccion, nombre, confirmacion, acerca de y actualizaciones
- panel de ajustes

## Sidebar

- muestra iconos por servicio
- resalta la instancia activa con el color del servicio
- incluye badges de conteo o punto simple
- tiene accesos inferiores para agregar servicio y abrir ajustes

## Pantalla de bienvenida

Se muestra cuando no hay instancias habilitadas en la sidebar. Explica el producto y da acceso directo al flujo de alta de servicios.

## Panel de ajustes

El panel agrupa:

- apariencia
- preferencias generales
- notificaciones y sonido
- idioma de correccion
- actualizaciones
- informacion de la app

Tambien contiene la lista de instancias para reorganizar, habilitar o eliminar.

## Modales

Modales actuales:

- selector de servicio
- captura de nombre para nueva instancia
- confirmacion de borrado
- acerca de la aplicacion
- flujo de actualizaciones

### Acerca de la aplicacion

- muestra nombre y version de la app
- muestra la tarjeta del autor
- incluye una rejilla de accesos externos para GitHub, YouTube, Telegram, Messenger, X, Facebook, Pinterest y correo
- el contenido del modal permite scroll interno cuando la altura disponible no alcanza

### Flujo de actualizaciones

- cuando hay una nueva version, la UI ofrece `Descargar y actualizar`
- durante la descarga se muestra progreso en porcentaje
- al terminar la descarga, la app instala la actualizacion automaticamente si el usuario inicio ese flujo

## Regla de visibilidad importante

La UI HTML y el servicio activo no comparten el mismo plano visual. Cuando se abre cualquier modal o panel superpuesto, la vista nativa del servicio se oculta temporalmente para evitar que tape elementos de la interfaz.

## Tema

La UI soporta tema claro, oscuro o basado en el sistema. El renderer aplica la clase o atributos correspondientes en tiempo de ejecucion segun la preferencia actual.
