const jwt = require('./jwt');
const config = require('../config/config');
const models = require('../models');

const auth = () => {

  return async (req, res, next) => {
    const token = req.cookies[config.authCookieName] || '';

    try {
      const [data, blacklistToken] = await Promise.all([jwt.verifyToken(token), models.TokenBlacklist.findOne({ token })]);

      if (blacklistToken) {
        throw new Error('blacklisted token');
      }

      const user = await models.User.findById(data.id);

      req.user = user;
      next();
    } catch (err) {
      if (['jwt expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
        res.status(401).send('UNAUTHORIZED!');
        return;
      }

      next(err);
    }
  }
}

module.exports = auth;