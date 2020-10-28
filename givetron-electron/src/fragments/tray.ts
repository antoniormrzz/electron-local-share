const { app, Tray, Menu } = require('electron');
const path = require('path');

let tray = null;

export function initTray(mainWindow) {
  app.whenReady().then(() => {
    tray = new Tray(path.join(__dirname,'..', 'assets', 'img', 'givetron.png'));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Givetron',
        click: function () {
          mainWindow.show();
        }
      },
      {
        label: 'Quit',
        type: 'normal',
        click: function () {
          app.isQuiting = true;
          app.quit();
        }
      }
    ]);
    tray.setToolTip('Givetron');
    tray.setContextMenu(contextMenu);
  });

  mainWindow.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}
