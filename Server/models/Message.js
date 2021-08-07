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
});

messageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

messageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (model, result) { delete result._id }
});

module.exports = new model('Message', messageSchema);