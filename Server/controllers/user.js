import { uploader as cloudinaryUploader } from 'cloudinary/lib/v2';
import { buildValidationUniqueErrors } from '../utils/errorHandling';
import { isNullOrUndefined } from '../utils/helper';

const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
const { validationResult } = require('express-validator');

module.exports = {
  get: {
    // To Do with new models
    home: (req, res, next) => {
      const { username, limit, name } = req.query;
      let query = {};

      if (username) {
        query = { username }
      }

      if (name) {
        query = { ...query, name: { $regex: name, $options: 'i' } };
      }

      if (limit) {
        models.User.find(query).populate('friends').populate('posts').limit(+limit)
          .then((users) => res.send(users))
          .catch(next)
      } else {
        models.User.find(query)
          .populate('friends')
          .populate([{ path: 'posts', populate: { path: 'author', populate: { path: 'friends' } } }])
          .populate([{ path: 'posts', populate: { path: 'comments', populate: { path: 'author' } } }])
          .populate([{ path: 'posts', populate: { path: 'likes', populate: { path: 'author' } } }])
          .sort({ _id: -1 })
          .then((users) => res.send(users))
          .catch(next)
      }
    },

    friends: async (req, res, next) => {
      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const { username } = req.params;
        const query = { username };

        const user = await models.User.findOne(query)
          .select('friends')
          .populate({
            path: 'friends',
            select: 'firstName lastName username about work education home',
            populate: [
              'profilePicture',
            ],
            options: {
              sort: { fullName: 'asc' },
            },
          })

        res.status(200).send(user.friends)
      }
      catch (err) {
        next(err);
      }
    },

    profile: async (req, res, next) => {
      try {
        const { username } = req.params;

        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const query = { username };

        const userData = await models.User.findOne(query)
          .select('firstName lastName username home work education about',)
          .populate('coverPicture')
          .populate('profilePicture')
          .populate('friendsCount')
          .populate({
            path: 'friends',
            select: 'firstName lastName username',
            populate: [
              'profilePicture',
            ],
            options: {
              limit: 9,
              sort: 'desc',
            },
          })
          .populate('postsCount')
          .populate(
            {
              path: 'posts',
              populate: [
                'likes',
                'comments',
                'image',
                { path: 'author', select: 'firstName lastName fullName', populate: 'profilePicture' }
              ],
              options: {
                sort: { createdAt: 'desc' },
              },
            }
          )
          .populate({
            path: 'interests',
            select: 'name',
            options: {
              sort: { name: 'asc' }
            }
          })

        res.send(userData)
      }
      catch (err) {
        next(err);
      }
    },

    suggestedNewFriends: async (req, res, next) => {
      try {
        const authorId = req.user._id;

        const myFriendsRes = await models.User.findById(authorId)
          .select('friends');

        const excludedUsers = [authorId, ...myFriendsRes.friends];

        const suggestedUserRes = await models.User.find({ _id: { $nin: excludedUsers } })
          .select('firstName lastName username home')
          .populate('profilePicture');

        res.send(suggestedUserRes);
      } catch (err) {
        next(err);
      }
    }
  },

  post: {},

  put: {
    addFriend: async (req, res, next) => {
      const friendUsername = req.params.username;
      const authorId = req.user._id;

      try {
        const friendRes = await models.User.findOneAndUpdate({ username: friendUsername, friends: { $ne: authorId } }, { $push: { friends: authorId } }, { new: true })
          .select('firstName lastName username')
          .populate('profilePicture')

        if (!friendRes) {
          res.status(404).end();
          return;
        }

        const friendId = friendRes._id;
        await models.User.updateOne({ _id: authorId, friends: { $ne: friendId } }, { $push: { friends: friendId } })

        const result = {
          message: `Now, you are friend with ${friendRes.firstName} ${friendRes.lastName}.`,
          user: friendRes,
        }

        res.status(200).send(result);
      } catch (e) {
        next(e)
      }
    },
    removeFriend: async (req, res, next) => {
      const friendUsername = req.params.username;
      const authorId = req.user._id;

      try {
        const friendRes = await models.User.findOneAndUpdate({ username: friendUsername, friends: authorId }, { $pull: { friends: authorId } })
          .select('firstName lastName username');

        if (!friendRes) {
          res.status(404).end();
          return;
        }

        const friendId = friendRes._id;
        await models.User.updateOne({ _id: authorId, friends: friendId }, { $pull: { friends: friendId } })

        const result = {
          message: `Now, you are not friend with ${friendRes.firstName} ${friendRes.lastName}.`,
          user: friendRes,
        }
        res.status(200).send(result);
      } catch (e) {
        next(e)
      }
    },
    updateInfo: async (req, res, next) => {
      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const authorId = req.user._id;
        const { home, education, work, about } = req.body;

        const dataToSave = {
          home,
          education,
          work,
          about
        };

        const validFields = Object.entries(dataToSave)
          .filter(([key, value]) => !isNullOrUndefined(value))
          .map(([key, value]) => {
            return {
              [key]: value
            };
          });

        const fieldToSave = validFields.length > 0 ? validFields[0] : {};

        const updatedUserData = await models.User.findOneAndUpdate(
          { _id: authorId },
          { ...fieldToSave },
        );

        if (updatedUserData._id.toString() === authorId.toString()) {
          return res.status(200).send(fieldToSave);
        }

        res.status(500).send('Server Error');
      } catch (err) {
        next(err);
      }
    },
    updatePicture: async (req, res, next) => {
      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const { oldImageUrl } = req.body;
        const { file } = req;

        let createdImage;

        // Upload profile picture to cloudinary
        const uploadedImage = await cloudinaryUploader.upload(file.path, {
          quality: 'auto',
          width: 1024,
          height: 1024,
          crop: 'limit',
        });

        // ToDo -> Delete old image
        createdImage = await models.Image.findOneAndUpdate(
          { imageUrl: oldImageUrl },
          { imageUrl: uploadedImage.url },
          { new: true },
        );

        res.status(200).send(createdImage);
      } catch (e) {
        next(e);
      }
    },
    addInterest: async (req, res, next) => {
      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const { name: interestName } = req.body;
        const authorId = req.user._id;

        const interestRes = await models.Interest
          .findOneAndUpdate({ name: interestName, users: { $ne: authorId } }, { name: interestName, $push: { users: authorId } }, { upsert: true, returnOriginal: false })
          .select('name')

        if (!interestRes) {
          res.status(404).end();
          return;
        }

        const { _id: interestId } = interestRes;
        await models.User.updateOne({ _id: authorId, interests: { $ne: interestId } }, { $push: { interests: interestId } });

        const result = {
          message: `Added ${interestName} interest successfully!`,
          interest: interestRes,
        }

        res.status(200).send(result);
      } catch (err) {
        if (err.code === 11000) {
          // Build interest unique fields errors
          const errors = buildValidationUniqueErrors(err, models.Interest);

          res.status(401).send(errors);
        } else {
          next(err);
        }
      }
    },
    removeInterest: async (req, res, next) => {
      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const { interestId, } = req.params;
        const authorId = req.user._id;

        const userRes = await models.User.findOneAndUpdate({ _id: authorId, interests: interestId }, { $pull: { interests: interestId } });

        if (!userRes) {
          res.status(404).end();
          return;
        }

        const interestRes = await models.Interest
          .findOneAndUpdate({ _id: interestId, users: authorId }, { $pull: { users: authorId } },  { returnOriginal: false })
          .select('name users');

        if (interestRes.users.length === 0) {
          await models.Interest.deleteOne({ _id: interestId });
        }

        const result = {
          message: `You have been deleted ${interestRes.name} from your interests successfully!`,
          interest: interestRes,
        }

        res.status(200).send(result);
      } catch (e) {
        next(e)
      }
    },
  },

  delete: {
    removeMyAccount: async (req, res, next) => {
      const token = req.cookies[config.authCookieName];

      try {
        const { id } = await utils.jwt.verifyToken(token);

        await models.User.deleteOne({ _id: id })
        await models.TokenBlacklist.create({ token });

        res.clearCookie(config.authCookieName).send('Deleted successfully!');
      } catch (err) {
        next(err);
      }
    }
  }
};