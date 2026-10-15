# ADR 0002: Aislar la sesión persistente de cada instancia

- Estado: Aceptada (registro retrospectivo del diseño actual; la motivación histórica no está documentada).
- Fecha: 2026-10-14

## Contexto

Un mismo servicio puede tener varias cuentas. Cookies y almacenamiento compartidos mezclarían identidades entre instancias.

## Decisión observada

El proceso principal crea/reutiliza una partición Electron `persist:<instance.id>` por instancia y asigna la sesión a su vista (`src/main.js:766-842`). Eliminar una instancia limpia los datos de esa partición; deshabilitarla destruye la vista pero conserva sus datos (`src/main.js:1205-1210,1238-1265`; `specs/releases.md:87-92`).

Este ADR describe el comportamiento actual; no presenta su racional histórico como hecho verificado.

## Alternativas

- Compartir una sesión por tipo de servicio — no implementada; no preservaría separación entre cuentas del mismo tipo.
- Sesión persistente independiente por instancia — opción implementada.

## Consecuencias

- Positivas: permite varias cuentas por proveedor y limita la mezcla accidental de cookies/storage.
- Trade-offs: cada partición conserva datos locales hasta la eliminación; deben mantenerse coherentes el UUID, la instancia y las operaciones de borrado.
