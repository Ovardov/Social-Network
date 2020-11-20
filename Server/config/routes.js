const router = require('../routes');

module.exports = (app) => {
  app.use('/api/auth', router.auth);

  app.use('/api/user', router.user);

  app.use('/api/post', router.post);

  app.use('/api/comment', router.comment);

  app.use('/api/conversation', router.conversation)

  app.use('*', (req, res, next) => res.status(404).end());
};