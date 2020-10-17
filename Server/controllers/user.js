const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');

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

    myProfile: async (req, res, next) => {
      const token = req.cookies[config.authCookieName];

      try {
        const { id } = await utils.jwt.verifyToken(token);

        // To Do -> Last 9 friends, last 9 photos
        const userRes = await models.User.findOne({ _id: id })
          .select('-password')
          .populate('posts');

        res.send(userRes);
      } catch(err) {
        next(err);
      }
    },

    suggested: async (req, res, next) => {
      const token = req.cookies[config.authCookieName];

      try {
        const { id } = await utils.jwt.verifyToken(token);

        const myFriendsRes = await models.User.findOne({ _id: id })
          .select('friends');

        const excludedUsers = [id, ...myFriendsRes.friends];

        // To Do -> select profile image
        const suggestedUserRes = await models.User.find({ _id: { $nin: excludedUsers } })
          .select('firstName lastName home');

        res.send(suggestedUserRes);
      } catch (err) {
        next(err);
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
  },

  put: {
    addFriend: async (req, res, next) => {
      const friendId = req.params.id;
      const authorId = req.user._id;

      try {
        const friendRes = await models.User.findOneAndUpdate({ _id: friendId, friends: { $ne: authorId } }, { $push: { friends: authorId } }, { new: true })
          .select('firstName lastName');

        if (!friendRes) {
          res.status(404).end();
          return;
        }

        await models.User.updateOne({ _id: authorId, friends: { $ne: friendId } }, { $push: { friends: friendId } })

        res.status(200).send(`Now, you are friend with ${friendRes.firstName} ${friendRes.lastName}.`);
      } catch (e) {
        next(e)
      }
    },
    removeFriend: async (req, res, next) => {
      const friendId = req.params.id;
      const authorId = req.user._id;

      try {
        const friendRes = await models.User.findOneAndUpdate({ _id: friendId, friends: authorId }, { $pull: { friends: authorId } }, { new: true })
          .select('firstName lastName');

        if (!friendRes) {
          res.status(404).end();
          return;
        }

        await models.User.updateOne({ _id: authorId, friends: friendId }, { $pull: { friends: friendId } })

        res.status(200).send(`Now, you are not friend with ${friendRes.firstName} ${friendRes.lastName}.`);
      } catch (e) {
        next(e)
      }
    },
    // To Do with new models
    update: (req, res, next) => {
      const data = req.body;

      models.User.updateOne({ username: data.username }, data)
        .then(() => res.status(200).send('Updated Successfully'))
        .catch(next);
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