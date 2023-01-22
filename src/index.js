const mongoose = require('mongoose');
const socketIo = require('socket.io');
const { randomUUID } = require('crypto');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });

  server.on('upgrade', (req, socket, head) => {
    req.id = randomUUID();
    logger.info(`${req.id} Upgrade request`);
  });
  const io = socketIo(server);
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      const { message } = msg;

      /*

      */
      io.emit('receive-message', msg);

      let response = { message: 'hello', id: '12', sender: 'sagar' };

      switch (message) {
        case 'namaste sir':
          response.message = 'namaste';
          break;

        default:
          response.message = 'https://farm9.staticflickr.com/8160/7670060656_d43f660e2e_c.jpg';
      }
      console.log('received message', msg);
      setTimeout(() => {
        io.emit('receive-message', response);
      }, 1000);
    });
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
