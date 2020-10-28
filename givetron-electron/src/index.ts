const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
import { getStore } from './store';
import { initTray } from './fragments/tray';
import { registerEvents } from './relay/events';

const { saveSettings, getSettings } = getStore();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'assets', 'img', 'givetron.png'),
    title: 'Givetron'
  });
  mainWindow.setTitle('Givetron');
  mainWindow.removeMenu();
  mainWindow.loadFile(path.join(__dirname, '../dist/ui/index.html'));
  initTray(mainWindow);

  // mainWindow.webContents.openDevTools();
  registerEvents();
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.send('settings:load', getSettings());
  });
};


app.on('ready', createWindow);

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
