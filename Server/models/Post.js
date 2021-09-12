const { Schema, model, models } = require('mongoose');

const postSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  content: String,
  image: {
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

postSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

postSchema.virtual('likesCount').get(function () {
  return this.likes.length;
});

postSchema.virtual('commentsCount').get(function () {
  return this.comments.length;
});

postSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (model, result) {
    delete result._id;
    delete result.comments;
   }
});

module.exports = new model('Post', postSchema)