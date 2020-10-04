const router = require('../routes');
const { authController } = require('../controllers')

module.exports = (app) => {

  app.get('/auth', authController.get);

  app.use('/api/user', router.user);

  app.use('/api/post', router.post);

  app.use('/api/comment', router.comment);

  app.use('*', (req, res, next) => res.send('Server Error'));
};