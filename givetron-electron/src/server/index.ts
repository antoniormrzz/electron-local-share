const cors = require('cors');
const express = require('express');
const path = require('path');
import { portInUseWrapped } from '../utils';
import { registerRoutes } from './register';
const localIpV4Address = require('local-ipv4-address');

const exapp: any = express();
exapp.use(cors());
let exserver = null;

exapp.use(express.static(path.join(__dirname,'..', 'remote')));

export async function enableShare(event, port) {
  if (await portInUseWrapped(port)) {
    event.reply('share:portInUse');
  } else {
    registerRoutes(exapp);
    exserver = exapp.listen(port, async () => {
      const ip = 'http://' + (await localIpV4Address()) + ':' + exserver.address().port;
      event.reply('share:ip', { ip });
    });
  }
}

export function disableShare(event) {
  if (exserver) {
    exserver.close();
    event.reply('share:ip', { ip: '' });
    exserver = null;
  }
}

