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
}, { versionKey: false });

module.exports = new model('Conversation', conversationSchema);