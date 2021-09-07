// Libraries
import 'dotenv/config'
import express from 'express'
import socketIO from 'socket.io'
// Config
import { port } from './config/config'
import { dbConnection } from './config/database'
import { initExpress } from './config/express.js'
import { initRoutes } from './config/routes'

import { initSocket } from './config/socket'
import { initPassport } from './config/passport'
import { initCloudinary } from './config/cloudinary'

const app = express();

dbConnection()
  .then(() => {
    initExpress(app);
    initRoutes(app);

    initPassport();
    initCloudinary();

    app.use(function (err, req, res, next) {
      console.error(err)
      res.status(500).send('Server Error')
    });

    const server = app.listen(
      port,
      console.log(`Listening on port ${port}!`)
    );

    const io = socketIO(server, {
      transports: ['websocket'],
      upgrade: false,
    });
    initSocket(io, app);
  })
  .catch(console.error);
