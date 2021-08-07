const { Schema, model } = require('mongoose');

const likeSchema = new Schema({
  post: {
    type: 'ObjectId',
    ref: 'Post'
  },
  comment: {
    type: 'ObjectId',
    ref: 'Comment'
  },
  likedBy: {
    type: 'ObjectId',
    ref: 'User',
    required: true
  }
});

likeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

likeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (model, result) { delete result._id }
});

module.exports = new model('Like', likeSchema);