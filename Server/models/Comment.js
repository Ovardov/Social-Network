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
});

commentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

commentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (model, result) { delete result._id }
});

module.exports = new model('Comment', commentSchema)