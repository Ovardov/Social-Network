const { Schema, model } = require('mongoose');

const conversationSchema = Schema({
  room: {
    type: String,
    required: true,
    unique: true
  },
  messages: [{
    type: 'ObjectId',
    ref: 'Message',
  }]
});

conversationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

conversationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (model, result) { delete result._id }
});

module.exports = new model('Conversation', conversationSchema);