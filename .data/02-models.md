# 2. Modelos y esquemas observados

Los JSON Schema siguientes describen la forma nominal observada, no una validación ejecutada en runtime. `Instance` y `Preferences` permiten propiedades adicionales porque sus actualizaciones usan spreads sin un allowlist completo.

## `Instance`

Creación: UUID, tipo válido del catálogo, nombre explícito o derivado y `enabled: true` (`src/main.js:1260`).

| Campo | Tipo | Requerido | Sensible/PII | Notas |
|---|---|---:|---|---|
| `id` | string / UUID | Sí | No por sí solo | Clave de instancia y sufijo de partición persistente. |
| `serviceType` | string enum | Sí | No | Uno de los 18 IDs del catálogo en `src/main.js:67`. |
| `name` | string | Sí | Puede ser PII | Alias indicado por el usuario o nombre derivado. |
| `enabled` | boolean | Sí | No | Controla si aparece como instancia activa. |
| otros | variable | No | Desconocido | `updateInstance` mezcla `data` con el objeto actual (`src/main.js:1285`). |

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "Instance.schema.json",
  "type": "object",
  "required": ["id", "serviceType", "name", "enabled"],
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "serviceType": {
      "type": "string",
      "enum": ["whatsapp", "telegram", "slack", "messenger", "discord", "googlechat", "teams", "signal", "skype", "wechat", "line", "viber", "instagram", "xdm", "linkedin", "zendesk", "intercom", "googlemessages"]
    },
    "name": { "type": "string" },
    "enabled": { "type": "boolean" }
  },
  "additionalProperties": true
}
```

## `Preferences`

Defaults y normalización: `src/main.js:57,207,566`.

| Campo | Tipo | Requerido tras normalizar | Valor por defecto | Notas |
|---|---|---:|---|---|
| `theme` | `system | dark | light` | Sí | `system` | Valores fuera del enum vuelven al default. |
| `openAtLogin` | boolean | Sí | `false` | Normalizado a boolean. |
| `restoreLastActiveInstance` | boolean | Sí | `true` | Normalizado a boolean. |
| `confirmBeforeDelete` | boolean | Sí | `true` | Normalizado a boolean. |
| `notificationsEnabled` | boolean | Sí | `true` | Normalizado a boolean. |
| `soundsEnabled` | boolean | Sí | `true` | Normalizado a boolean. |
| `spellcheckLanguage` | enum string | Sí | `es-MX` | Allowlist en `src/main.js:42,207`. |

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "Preferences.schema.json",
  "type": "object",
  "required": ["theme", "openAtLogin", "restoreLastActiveInstance", "confirmBeforeDelete", "notificationsEnabled", "soundsEnabled", "spellcheckLanguage"],
  "properties": {
    "theme": { "type": "string", "enum": ["system", "dark", "light"] },
    "openAtLogin": { "type": "boolean" },
    "restoreLastActiveInstance": { "type": "boolean" },
    "confirmBeforeDelete": { "type": "boolean" },
    "notificationsEnabled": { "type": "boolean" },
    "soundsEnabled": { "type": "boolean" },
    "spellcheckLanguage": { "type": "string", "enum": ["es-MX", "es-ES", "en-US", "en-GB", "pt-BR", "fr-FR", "de-DE", "it-IT"] }
  },
  "additionalProperties": true
}
```

## `AppLockRecord` (clave opcional `appLock`)

Se guarda separado de `preferences`. Si la clave está ausente, la protección está desactivada; no se crea un registro por defecto. Touch ID produce solo `{mode: 'biometric'}`. La contraseña produce los campos nominales descritos en este esquema, sin valores reales:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "AppLockRecord.schema.json",
  "oneOf": [
    {
      "type": "object",
      "required": ["mode"],
      "properties": { "mode": { "const": "biometric" } },
      "additionalProperties": false
    },
    {
      "type": "object",
      "required": ["mode", "salt", "hash"],
      "properties": {
        "mode": { "const": "password" },
        "salt": { "type": "string", "pattern": "^[a-f0-9]{64}$" },
        "hash": { "type": "string", "pattern": "^[a-f0-9]{128}$" }
      },
      "additionalProperties": false
    }
  ]
}
```

El esquema refleja lo que se escribe, no un validador de carga. La verificación de contraseña sí comprueba longitud (8–1024 unidades de longitud de string JS), modo y patrones de hash/salt. El salt es aleatorio de 32 bytes y su representación hexadecimal se pasa como entrada de scrypt; hash de 64 bytes con parámetros predeterminados de Node. Se compara con `timingSafeEqual` (`src/app-lock.js:6-22`). No hay versión de registro ni migración automática (`src/main.js:164-205,575-598`).

## `LockStatus` (público, no persistido)

| Campo | Forma nominal | Significado |
|---|---|---|
| `enabled` | boolean | `Boolean(store.get('appLock'))`. |
| `mode` | `biometric | password | null` | Método guardado o null; se proyecta desde el registro sin validar su enum en esta lectura. |
| `biometricAvailable` | boolean | Solo verdadero en macOS si `canPromptTouchID()` devuelve verdadero; las excepciones se convierten en falso. |
| `locked` | boolean | Estado `appLocked` del proceso actual, independiente del flag persistido. |

Fuente: `src/main.js:124-135`. Las acciones devuelven `{status: LockStatus}` o `{error: string}`. `password` y `confirmation` solo son entradas transitorias de IPC; nunca se incluyen en el estado público. `authBusy`, `failedAttempts` y `retryAfter` tampoco se persisten.

## Otros valores persistidos

- `sidebarOrder`, `settingsOrder`: arreglos ordenados de IDs de instancia.
- `activeInstanceId`: UUID activo o `null`.
- `BadgeState`: datos transitorios derivados del título de páginas y enviados al renderer; no se carga en `electron-store` en la inicialización observada (`src/main.js:399,447,575`).

Fuente del store y defaults: `src/main.js:575-598`. No hay JSON Schema runtime en `package.json` ni en `src/`.
