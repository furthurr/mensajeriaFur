const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getInstances: () => ipcRenderer.invoke('get-instances'),
  getSidebarOrder: () => ipcRenderer.invoke('get-sidebar-order'),
  getSettingsOrder: () => ipcRenderer.invoke('get-settings-order'),
  getServiceTypes: () => ipcRenderer.invoke('get-service-types'),
  addInstance: (serviceType, name) => ipcRenderer.invoke('add-instance', serviceType, name),
  updateInstance: (id, data) => ipcRenderer.invoke('update-instance', id, data),
  deleteInstance: (id) => ipcRenderer.invoke('delete-instance', id),
  switchInstance: (id) => ipcRenderer.send('switch-instance', id),
  reloadInstance: (id) => ipcRenderer.send('reload-instance', id),
  setActiveViewVisible: (visible) => ipcRenderer.send('set-active-view-visible', visible),
  reorderSidebar: (order) => ipcRenderer.send('reorder-sidebar', order),
  reorderSettings: (order) => ipcRenderer.send('reorder-settings', order),
  getActiveInstance: () => ipcRenderer.invoke('get-active-instance'),
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  getPreferences: () => ipcRenderer.invoke('get-preferences'),
  updatePreferences: (data) => ipcRenderer.invoke('update-preferences', data),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  getDesktopSources: () => ipcRenderer.invoke('get-desktop-sources'),
  onInstancesChanged: (callback) => {
    ipcRenderer.on('instances-changed', (event, instances) => callback(instances));
  },
  onActiveInstanceChanged: (callback) => {
    ipcRenderer.on('active-instance-changed', (event, instanceId) => callback(instanceId));
  },
  checkForUpdates: () => ipcRenderer.send('check-for-updates'),
  downloadUpdate: () => ipcRenderer.send('download-update'),
  installUpdate: () => ipcRenderer.send('install-update'),
  onUpdateStatus: (callback) => {
    ipcRenderer.on('update-status', (event, data) => callback(data));
  }
});
