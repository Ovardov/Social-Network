const { Schema, model } = require('mongoose');

const messageSchema = Schema({
  sender: {
    type: 'ObjectId',
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
}, { versionKey: false });

module.exports = new model('Message', messageSchema);