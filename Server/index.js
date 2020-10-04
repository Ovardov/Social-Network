require('dotenv').config();

const config = require('./config/config');
const dbConnection = require('./config/database');
const expressConfig = require('./config/express');
const routes = require('./config/routes');

const app = require('express')();

dbConnection().then(() => {

    expressConfig(app);
    routes(app);

    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send(err.message);
    });

    app.listen(config.port, console.log(`Listening on port ${config.port}!`))

}).catch(console.error);