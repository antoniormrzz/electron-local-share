const Store = require('electron-store');
const path = require('path');
const { app } = require('electron');

const store = new Store({ name: 'givetronhome' });

export function getStore() {
  const getSettings = () => {
    return store.has('settings')
      ? store.get('settings')
      : {
          port: 3000,
          filesPath: [{ path: path.join(app.getPath('home'), 'givetronshare') }],
          version: '1.0.0'
        };
  };
  const saveSettings = settings => {
    let prev = getSettings();
    store.set('settings', { ...prev, ...settings });
  };

  return {
    saveSettings,
    getSettings
  };
}
