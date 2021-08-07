const {Schema, model} = require('mongoose');

const tokenBlacklist = new Schema({
    token: String
});

module.exports = new model('TokenBlacklist', tokenBlacklist);
