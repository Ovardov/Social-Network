// Libraries
import { validationResult } from 'express-validator';
// Models
import models from '../models';

module.exports = {
  get: {
    getAllRoomMessages: async (req, res, next) => {
      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const { room } = req.params;

        const conversationRes = await models.Conversation.findOne({ room })
          .select('messages')
          .populate({ path: 'messages', options: { sort: { 'createdAt': 1 } } });

        res.status(200).send(conversationRes);
      } catch (e) {
        console.log(e)
        next(e);
      }
    },
    getAllUsersFromMyChat: async (req, res, next) => {
      try {
        // Logged user
        const { username } = req.user;

        const allConversations = await models.Conversation.find({ room: { $regex: username, $options: 'i' } })
          .select('room');

        const allUsernamesFromMyChat = allConversations.map(({ room }) => {
          // One room is represented like 'john-doe' -> It's like "username"-"username"
          return room
            .split('-')
            .find(usernameFromChatRoom => usernameFromChatRoom !== username);
        });

        const allUsersFromMyChat = await models.User.find({username: allUsernamesFromMyChat})
          .select('firstName lastName username')
          .populate('profilePicture')


        res.status(200).send(allUsersFromMyChat);
      } catch (e) {
        console.log(e)
        next(e);
      }
    },
  },

  post: {},

  put: {},

  delete: {}
};