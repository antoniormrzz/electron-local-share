import { getStore } from '../store';
const path = require('path');
const fs = require('fs');
import bend from 'callback-bender';
import { getProperFileSize } from '../utils/filesize';
const querystring = require('querystring');

const { saveSettings, getSettings } = getStore();

export function registerRoutes(exapp) {
  exapp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'remote', 'index.html'));
  });
  exapp.get('/api/filelist', async (req, res) => {
    try {
      const files = await bend.efc.single(fs.readdir)(
        path.normalize(getSettings().filesPath[0].path)
      );
      let filestats = [];
      for await (let f of files) {
        const stats = await bend.efc.single(fs.stat)(
          path.join(path.normalize(getSettings().filesPath[0].path), f),
          { bigint: true }
        );
        if (!stats.isDirectory()) {
          filestats.push({
            size: getProperFileSize(stats.size),
            name: f,
            mtime: stats.mtimeMs
          });
        }
      }
      filestats = filestats.sort(function (
        a: { size: string; name: string; mtime: bigint },
        b: { size: string; name: string; mtime: bigint }
      ) {
        return b.mtime < a.mtime ? -1 : b.mtime > a.mtime ? 1 : 0;
      });
      filestats = filestats.map(e => {
        return { size: e.size, name: e.name, url: encodeURIComponent(e.name) };
      });
      res.json(filestats);
    } catch (error) {
      res.json([]);
    }
  });
  exapp.get('/api/file/:filename', (req, res) => {
    res.sendFile(
      path.join(
        path.normalize(getSettings().filesPath[0].path),
        decodeURIComponent(req.params.filename)
      )
    );
  });
  exapp.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'remote', 'index.html'));
  });
}
