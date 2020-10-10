const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  content: String,
  imageUrl: {
    type: 'ObjectId',
    ref: 'Image'
  },
  author: {
    type: 'ObjectId',
    ref: 'User',
    required: true,
  },
  likes: [{
    type: 'ObjectId',
    ref: 'Like',
    default: []
  }],
  comments: [{
    type: 'ObjectId',
    ref: 'Comment',
    default: []
  }]
});

module.exports = new model('Post', postSchema)