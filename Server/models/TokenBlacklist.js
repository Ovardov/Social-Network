const {Schema, model} = require('mongoose');

const tokenBlacklist = new Schema({
    token: Schema.Types.String
});

module.exports = new model('TokenBlacklist', tokenBlacklist);