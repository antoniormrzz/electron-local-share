import { enableShare, disableShare } from '../server';
import { getStore } from '../store';
const fs = require('fs');
const { ipcMain } = require('electron');

const { saveSettings, getSettings } = getStore();

function ensureFilesDir(dir: string) {
  if (fs.existsSync(dir)) {
    try {
      fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      return false;
    }
  } else {
    try {
      fs.mkdirSync(dir);
    } catch (e) {
      return false;
    }
  }
  return true;
}

export function registerEvents(){
  ipcMain.on('share:on', (event, arg) => {
    if (ensureFilesDir(getSettings().filesPath[0].path)) {
      enableShare(event, getSettings().port);
    } else {
      event.reply('error:directory-unavailable');
    }
  });
  
  ipcMain.on('share:off', (event, arg) => {
    disableShare(event);
  });
  
  ipcMain.on('settings:save', (event, arg) => {
    try {
      if (ensureFilesDir(arg.filesPath[0].path)) {
        saveSettings(arg);
        event.reply('settings:load', getSettings());
        event.reply('success');
      } else {
        event.reply('error:directory-unavailable');
      }
    } catch (error) {
      event.reply('error');
    }
  });
}

