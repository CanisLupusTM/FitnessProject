import http from 'http';

// our packages
import app from './app';
import {logger} from './util';
import {thinky} from './db';
import realtime from './realtime';

// wait for DB to initialize
thinky.dbReady().then(() => {
  logger.info('Database ready, starting server...');
  // start server
  const httpServer = http.createServer(app);
  realtime(httpServer);
  httpServer.listen(8080, function() {
    const host = this.address().address;
    const port = this.address().port;
    logger.info(`FitRun-server is listening at http://${host}:${port}`);
  });
});

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('uncaught exception:', err));
process.on('unhandledRejection', error => logger.error('unhandled rejection:', error));
