const { ipcRenderer } = window.require("electron");
import store from '../store';

export default function registerListeners() {
  ipcRenderer.on('share:ip', (event, arg) => {
    store.dispatch('changeShareIP', { ip: arg.ip })
  })

  ipcRenderer.on('share:portInUse', (event, arg) => {
    store.dispatch('sharePortInUse');
  })

  ipcRenderer.on('success', (event, arg) => {
    store.dispatch('success');
  })

  ipcRenderer.on('error', (event, arg) => {
    store.dispatch('error');
  })  

  ipcRenderer.on('error:directory-unavailable', (event, arg) => {
    store.dispatch('errorDirectoryUnavailable');
  })

  ipcRenderer.on('settings:load', (event, arg) => {
    store.dispatch('loadSettings', arg);
  })
}
