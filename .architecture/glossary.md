# Glosario

| Término | Significado en MensajeriaFur |
|---|---|
| Instancia | Configuración local de una cuenta/servicio con UUID, estado habilitado y partición persistente propia. |
| Servicio | Tipo del catálogo (p. ej., WhatsApp o Teams) con URL y propiedades de integración. |
| `WebContentsView` | Vista Chromium nativa de Electron que carga el sitio del servicio fuera del DOM del renderer local. |
| Partición persistente | Sesión de Electron identificada por `persist:<uuid>` que conserva cookies y almacenamiento de una instancia. |
| Renderer local | Interfaz HTML/CSS/JS de la ventana principal, distinta de las páginas remotas en vistas de servicio. |
| Preload | Script privilegiado aislado que expone el objeto limitado `window.api` mediante `contextBridge`. |
| IPC | Comunicación entre renderer y proceso principal mediante `ipcRenderer`/`ipcMain` y canales declarados. |
| Vista activa | `WebContentsView` de la instancia seleccionada, adjuntada a la ventana y dimensionada junto a la barra lateral. |
| Orden de sidebar / ajustes | Listas persistentes distintas (`sidebarOrder` y `settingsOrder`) para ordenar instancias en dos superficies. |
| Badge | Estado de no leídos derivado del título de la página del servicio y reflejado en la UI. |
