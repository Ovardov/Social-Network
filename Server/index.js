require('dotenv').config();

const config = require('./config/config');
const dbConnection = require('./config/database');
const expressConfig = require('./config/express');
const routes = require('./config/routes');
const socketConfig = require('./config/socket');
const initPassport = require('./config/passport');

const app = require('express')();

dbConnection().then(() => {

    expressConfig(app);
    routes(app);
    initPassport();

    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send('Server Error');
    });

    const server = app.listen(config.port, console.log(`Listening on port ${config.port}!`));
    const io = require('socket.io')(server);

    socketConfig(io, app);

}).catch(console.error);