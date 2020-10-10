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

module.exports = new model('Like', likeSchema);