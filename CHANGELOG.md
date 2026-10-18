# Changelog

## [v1.2.1] - 2026-10-18

### Correcciones

- Corregir el rechazo de actualizaciones de Windows sin certificado al eliminar el editor fijo de la configuracion de empaquetado.
- Mostrar un mensaje en espanol con instrucciones de recuperacion cuando no se puede verificar la firma del instalador.

### Otros

- Agregar pruebas de regresion para los errores de firma del actualizador.

### Instalacion en Windows

- Si una version anterior muestra un error de firma al actualizar, cerrar la app y ejecutar manualmente el instalador de esta version sobre la instalacion existente, sin desinstalar ni borrar sesiones o preferencias.

## [v1.2.0] - 2026-10-15

### Funcionalidades

- Proteger el inicio con Touch ID o contraseña local y controlar la opción mediante un switch autenticado.

### Seguridad

- Impedir la carga de servicios y las operaciones IPC de producto hasta completar la autenticación.

### Otros

- Alinear los metadatos del paquete con la licencia MIT del repositorio.

## [v1.1.2] - 2026-08-08

### Correcciones

- Conservar la sesion persistente al desactivar y volver a activar una instancia.
- Mantener la limpieza de cookies y almacenamiento unicamente al eliminar una instancia.
