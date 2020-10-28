import registerListeners from './listeners';
import remote from './remote';

export function setup() {
  registerListeners();
}

export const selectPath = remote.selectPath;

export const openRemoteLink = remote.openRemoteLink;



