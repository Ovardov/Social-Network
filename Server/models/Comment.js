const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  description: {
    type: Schema.Types.String,
    required: true
  },
  
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Like'
  }]
});

module.exports = new model('Comment', commentSchema)