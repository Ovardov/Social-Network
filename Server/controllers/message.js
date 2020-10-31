const models = require('../models');

module.exports = {
  get: {
    getMessage: async (req, res, next) => {
      const { clientId } = req.query;
      const currentUser = req.user._id;

      try {
        const messageRes = await models.Message.find({ from: clientId, to: currentUser })

        res.status(200).send(messageRes);
      } catch (e) {
        next(e);
      }
    }
  },

  post: {},

  put: {},

  delete: {}
};