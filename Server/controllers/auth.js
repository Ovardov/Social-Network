// Libraries
import { models } from 'mongoose';
import { validationResult } from 'express-validator';
import { uploader as cloudinaryUploader } from 'cloudinary/lib/v2';
// Utils
import jwt from '../utils/jwt';
import { buildValidationUniqueErrors } from '../utils/errorHandling';
// Config
import {authCookieName, clientLoginSuccessRedirectUrl} from '../config/config';

module.exports = {
  get: {
    checkAuth: async (req, res) => {
      const token = req.cookies[authCookieName];

      try {
        const { id } = await jwt.verifyToken(token);

        const user = await models.User.findById(id).select('username');

        res.send(user);
      } catch (e) {
        res.status(401).send('UNAUTHORIZED!');
      }
    },
    logout: async (req, res, next) => {
      const token = req.cookies[authCookieName];

      try {
        await models.TokenBlacklist.create({ token });
        res.clearCookie(authCookieName).send('Logout successfully!');
      } catch (err) {
        next(err);
      }
    },

    socialLogin: async (req, res, next) => {
      try {
        const userId = req.user._id;

        const token = jwt.createToken({ id: userId });

        res.cookie(authCookieName, token, { httpOnly: true });
        res.redirect(clientLoginSuccessRedirectUrl);
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
          .cookie(authCookieName, token, { httpOnly: true })
          .status(200)
          .end();
      } catch (err) {
        next(err);
      }
    },
    register: async (req, res, next) => {
      const { email, username, password, firstName, lastName } = req.body;
      // Profile picture
      const { file } = req;

      try {
        const lowerCaseUsername = username.toLowerCase();
        const providers = ['email'];

        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        // Upload profile picture to cloudinary
        const uploadedProfilePicture = await cloudinaryUploader.upload(
          file.path
        );

        // Create image
        const createdImage = await models.Image.create({
          imageUrl: uploadedProfilePicture.url,
        });

        // Create user
        const createdUser = await models.User.create({
          email,
          username: lowerCaseUsername,
          providers,
          password,
          firstName,
          lastName,
          profilePicture: createdImage._id,
        });

        // Create auth token
        const token = jwt.createToken({ id: createdUser._id });

        // Send auth token
        res
          .cookie(authCookieName, token, { httpOnly: true })
          .status(201)
          .end();
      } catch (err) {
        if (err.code === 11000) {
          // Build user unique fields errors
          const errors = buildValidationUniqueErrors(err);

          res.status(401).send(errors);
        } else {
          next(err);
        }
      }
    },
  },
}
