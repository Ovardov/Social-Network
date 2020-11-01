const models = require('../models');

module.exports = {
  get: {
    getAllMessages: async (req, res, next) => {
      const { room } = req.params;

      try {
        const conversationRes = await models.Conversation.find({ room })
          .populate({ path: 'messages', options: { sort: { 'createdAt': 1 } } });

        res.status(200).send(conversationRes);
      } catch (e) {
        console.log(e)
        next(e);
      }
    }
  },

  post: {},

  put: {},

  delete: {}
};