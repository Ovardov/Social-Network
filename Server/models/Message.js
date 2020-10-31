const { Schema, model } = require('mongoose');

const messageSchema = Schema({
  from: {
    type: 'ObjectId',
    ref: 'User',
    required: true
  },
  to: {
    type: 'ObjectId',
    ref: 'User',
    required: true
  },
  message: {
    type: 'String',
    required: true
  }
}, { timestamps: true, versionKey: false });

module.exports = new model('Message', messageSchema);