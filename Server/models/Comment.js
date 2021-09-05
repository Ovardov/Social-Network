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

commentSchema.virtual('likesCount', { ref: 'Like', localField: 'likes', foreignField: '_id', count: true });

commentSchema.virtual('isLikedByMe').get(function () {
  if(!this.likes) {
    return null;
  };
  
  const currentLike = this.likes.find(like => like.likedBy._id.toString() === this.author._id.toString());

  return !!currentLike;
});

commentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (model, result) {
    delete result._id;
    delete result.likes;
  }
});

module.exports = new model('Comment', commentSchema)