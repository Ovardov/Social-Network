const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: 'ObjectId',
    ref: 'User',
    required: true
  },
  post: {
    type: 'ObjectId',
    ref: 'Post'
  },
  likes: [{
    type: 'ObjectId',
    ref: 'Like',
    default: []
  }]
}, { versionKey: false });

module.exports = new model('Comment', commentSchema)