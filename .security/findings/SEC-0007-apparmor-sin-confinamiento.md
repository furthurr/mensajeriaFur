# SEC-0007: Perfil AppArmor instalado como `unconfined`

- Estado: Pendiente
- Severidad: 🟡 Media
- Referencia: ASVS — configuración segura · CWE-693 (hardening general)
- Ubicación: `linux/apparmor-profile:4-7`; instalación `scripts/linux-after-install.sh:12-20`
- Fecha detección: 2026-10-14

## Evidencia y riesgo

El perfil identifica el ejecutable con `flags=(unconfined)` y solo incluye `userns` además de una política local opcional. El post-install lo copia y llama a `apparmor_parser`, pero el perfil resultante no aplica un conjunto restrictivo de rutas/capacidades. El empaquetado no debe describirse como confinamiento efectivo mientras ese perfil permanezca así.

## Plan de remediación propuesto

- [ ] Paso 1: definir las rutas y capacidades necesarias de Electron/Chromium para cada target Linux.
- [ ] Paso 2: validar una política restrictiva con el flujo de usuario real y fallback documentado.
- [ ] Paso 3: verificar carga/denegaciones del perfil en la plataforma objetivo.

## Bitácora

- 2026-10-14: analizado el perfil fuente; no se ejecutó AppArmor ni se cambió el paquete.
