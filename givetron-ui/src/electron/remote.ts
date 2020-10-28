const { dialog, shell } = window.require('electron').remote;

function selectPath() {
  return dialog.showOpenDialogSync({
    properties: ['openDirectory']
  });
}

function openRemoteLink(url) {
  shell.openExternal(url);
}

export default {
  selectPath,
  openRemoteLink
};
