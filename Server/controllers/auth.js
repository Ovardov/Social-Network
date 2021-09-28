// Libraries
import { models } from 'mongoose';
import { validationResult } from 'express-validator';
import { uploader as cloudinaryUploader } from 'cloudinary/lib/v2';
// Utils
import { jwt } from '../utils';
import { buildCustomError, buildValidationUniqueErrors } from '../utils/errorHandling';
// Config
import { authCookieName, clientLoginSuccessRedirectUrl, authCookieDomain } from '../config/config';

module.exports = {
  get: {
    checkAuth: async (req, res) => {
      const token = req.cookies[authCookieName];

      try {
        const { id } = await jwt.verifyToken(token);

        const user = await models.User.findById(id).select(['firstName', 'lastName', 'username'])
          .populate('profilePicture')
          .populate('coverPicture')
          .populate({ path: 'friends', select: 'firstName lastName username' });

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
      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await models.User.findOne({ email })
          .select(['firstName', 'lastName', 'username', 'providers', 'password'])
          .populate('profilePicture')
          .populate('coverPicture')
          .populate({ path: 'friends', select: 'firstName lastName username' });

        if (!user) {
          const errors = buildCustomError('Invalid email or password!');

          res.status(401).send(errors);
          return;
        }

        //  If user do not have email account
        if (user.providers.indexOf('email') === -1) {
          const errors = buildCustomError('Invalid login provider!');

          res.status(401).send(errors);
          return;
        }

        const isMatched = await user.matchPassword(password);

        if (!isMatched) {
          const errors = buildCustomError('Invalid email or password!');

          res.status(401).send(errors);
          return;
        }

        const token = jwt.createToken({ id: user._id });

        const responseData = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          profilePicture: user.profilePicture,
          username: user.username
        }

        res
          .cookie(authCookieName, token, { httpOnly: true, domain: authCookieDomain, sameSite: 'none' })
          .status(200)
          .send(responseData);
      } catch (err) {
        next(err);
      }
    },
    register: async (req, res, next) => {
      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const { email, username, password, firstName, lastName } = req.body;
        // Profile picture
        const { file } = req;

        const lowerCaseUsername = username.toLowerCase();
        const providers = ['email'];

        // Upload profile picture to cloudinary
        let uploadedProfilePicture;

        if (file) {
          uploadedProfilePicture = await cloudinaryUploader.upload(
            file.path,
            { quality: 'auto:best', }
          );
        }

        // Create image
        const createdProfilePicture = await models.Image.create({
          imageUrl: uploadedProfilePicture ? uploadedProfilePicture.url : process.env.DEFAULT_PROFILE_PICTURE
        });

        const createdDefaultCoverPicture = await models.Image.create({
          imageUrl: process.env.DEFAULT_COVER_PICTURE,
        });

        // Create user
        const createdUser = await models.User.create({
          email,
          username: lowerCaseUsername,
          providers,
          password,
          firstName,
          lastName,
          profilePicture: createdProfilePicture._id,
          coverPicture: createdDefaultCoverPicture._id
        });

        // Create auth token
        const token = jwt.createToken({ id: createdUser._id });

        const responseData = {
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          fullName: createdUser.fullName,
          profilePicture: { id: createdProfilePicture.id, imageUrl: createdProfilePicture.imageUrl },
          username: createdUser.username
        }

        // Send auth token
        res
          .cookie(authCookieName, token, { httpOnly: true })
          .status(201)
          .send(responseData);
      } catch (err) {
        if (err.code === 11000) {
          // Build user unique fields errors
          const errors = buildValidationUniqueErrors(err, models.User);

          res.status(401).send(errors);
        } else {
          next(err);
        }
      }
    },
  },
}
