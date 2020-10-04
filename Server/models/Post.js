const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  date: {
    type: Date,
    required: true,
    default: Date.now
  },

  description: {
    type: Schema.Types.String,
  },

  image: {
    type: Schema.Types.String,
  },

  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Like',
    default: []
  }],

  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: []
  }]
});

module.exports = new model('Post', postSchema)