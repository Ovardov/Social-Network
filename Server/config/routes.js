const config = require('./config');
const utils = require('../utils');
const router = require('../routes');
const models = require('../models');

module.exports = (app) => {

    app.get('/auth', (req, res) => {
        const token = req.cookies[config.authCookieName];

        utils.jwt.verifyToken(token)
            .then(({ id }) => models.User.findById(id))
            .then(user => res.send(user))
            .catch(() => res.status(401).send('UNAUTHORIZED!'));
    });

    app.use('/api/user', router.user);

    app.use('/api/post', router.post);

    app.use('*', (req, res, next) => res.send('Server Error'));
};