const { models } = require('mongoose');
const config = require('../config/config')
const utils = require('../utils')

module.exports = {
  get: {
    checkAuth: async (req, res) => {
      const token = req.cookies[config.authCookieName];

      try {
        const { id } = await utils.jwt.verifyToken(token);

        const user = await models.User.findById(id)
          .select('username');

        res.send(user);
      } catch (e) {
        res.status(401).send('UNAUTHORIZED!');
      }
    },
    logout: async (req, res, next) => {
      const token = req.cookies[config.authCookieName];

      try {
        await models.TokenBlacklist.create({ token });
        res.clearCookie(config.authCookieName).send('Logout successfully!');
      } catch (err) {
        next(err);
      }
    }
  },

  post: {
    login: async (req, res, next) => {
      const { emailOrUsername, password } = req.body;

      try {
        const user = await models.User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });

        if (!user) {
          res.status(401).send('Invalid username or password. wrong email');
          return;
        }

        const isMatched = await user.matchPassword(password);

        if (!isMatched) {
          res.status(401).send('Invalid username or password, isMatched');
          return;
        }

        const token = utils.jwt.createToken({ id: user._id });
        res.cookie(config.authCookieName, token, { httpOnly: true })
          .status(200)
          .end();
      } catch (err) {
        next(err)
      }
    },
    register: async (req, res, next) => {
      const { email, username, password, firstName, lastName } = req.body;

      try {
        const createdUser = await models.User.create({ email, username, password, firstName, lastName });

        const token = utils.jwt.createToken({ id: createdUser._id });

        res.cookie(config.authCookieName, token, { httpOnly: true })
          .status(201)
          .end();
      } catch (err) {
        if (err.code === 11000) {
          // keyPattern: { username: 1 }
          const errorField = Object.keys(err.keyPattern)[0]
          const capitalizedErrorField = errorField.charAt(0).toUpperCase() + errorField.slice(1);

          res.status(401).send(`${capitalizedErrorField} is already taken!`);
        } else {
          next(err)
        }
      }
    },
  }
}