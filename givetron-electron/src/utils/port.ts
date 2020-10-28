import * as net from 'net';
import bend from 'callback-bender';

const portInUse = function (port, callback) {
  let server = net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
  });
  try {
    server.listen(port, '127.0.0.1');
    process.on('uncaughtException', function (err) {
      if ((err as any).errno === 'EADDRINUSE') {
        callback(true);
      } else {
        process.exit(1);
      }
    });
    server.on('error', function (e) {
      callback(true);
    });
    server.on('listening', function (e) {
      server.close();
      callback(false);
    });
  } catch (e) {
    callback(true);
  }
};

export default { portInUseWrapped: bend.cp.single(portInUse) };
