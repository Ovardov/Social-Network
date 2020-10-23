const { models } = require('mongoose');
const config = require('../config/config')
const utils = require('../utils')

module.exports = {
  get: async (req, res) => {
    const token = req.cookies[config.authCookieName];
    
    try {
      const { id } = await utils.jwt.verifyToken(token);

      const user = await models.User.findById(id)
        .select('username');

      res.send(user);
    } catch(e) {
      res.status(401).send('UNAUTHORIZED!');
    }
  }
}