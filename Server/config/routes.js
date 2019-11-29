const router = require('../routes');

module.exports = (app) => {

    app.use('/api/user', router.user);

    app.use('/api/post', router.post);

    app.use('*', (req, res, next) => res.send('Server Error'));
};