const { Schema, model } = require('mongoose');

const likeSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },

  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },

  likedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = new model('Like', likeSchema);