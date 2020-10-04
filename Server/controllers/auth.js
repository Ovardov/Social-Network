const config = require('../config/config')

module.exports = {
  get: (req, res) => {
    const token = req.cookies[config.authCookieName];

    utils.jwt.verifyToken(token)
      .then(({ id }) => models.User.findById(id))
      .then(user => res.send(user))
      .catch(() => res.status(401).send('UNAUTHORIZED!'));
  }
}