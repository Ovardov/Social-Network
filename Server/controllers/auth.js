const { models } = require('mongoose');
const config = require('../config/config');
const jwt = require('../utils/jwt');
const { buildValidationModelErrors, buildValidationUniqueErrors } = require('../utils/errorHandling');

module.exports = {
  get: {
    checkAuth: async (req, res) => {
      const token = req.cookies[config.authCookieName];

      try {
        const { id } = await jwt.verifyToken(token);

        const user = await models.User.findById(id).select('username');

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
    },

    socialLogin: async (req, res, next) => {
      try {
        const userId = req.user._id;

        const token = jwt.createToken({ id: userId });

        res.cookie(config.authCookieName, token, { httpOnly: true });
        res.redirect(config.clientLoginSuccessRedirectUrl);
      } catch (err) {
        next(err);
      }
    },
  },

  post: {
    login: async (req, res, next) => {
      const { emailOrUsername, password } = req.body;

      try {
        const user = await models.User.findOne({
          $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });

        if (!user) {
          res.status(401).send('Invalid email or password');
          return;
        }

        //  If user do not have email account
        if (user.providers.indexOf('email') === -1) {
          res.status(401).send('Invalid login provider');
          return;
        }

        const isMatched = await user.matchPassword(password);

        if (!isMatched) {
          res.status(401).send('Invalid email or password');
          return;
        }

        const token = jwt.createToken({ id: user._id });
        res
          .cookie(config.authCookieName, token, { httpOnly: true })
          .status(200)
          .end();
      } catch (err) {
        next(err);
      }
    },
    register: async (req, res, next) => {
      const { email, username, password, firstName, lastName } = req.body;

      try {
        const lowerCaseUsername = username.toLowerCase();
        const providers = ['email'];

        const createdUser = await models.User.create({
          email,
          username: lowerCaseUsername,
          providers,
          password,
          firstName,
          lastName,
        });

        const token = jwt.createToken({ id: createdUser._id });

        res
          .cookie(config.authCookieName, token, { httpOnly: true })
          .status(201)
          .end();
      } catch (err) {
          if (err.code === 11000) {
            // Build user unique fields errors
            const errors = buildValidationUniqueErrors(err);

            res.status(401).send(errors);

          } else if (err.name === 'ValidationError') {
            // Build user fields errors
            const errors = buildValidationModelErrors(err);

            // Send all user fields errors
            res.status(401).send(errors);
          } else {
            next(err)
          }
      } 
    },
  },
}
