const models = require('../models');

module.exports = {
  post: {
    create: async (req, res, next) => {
      const { content, postId } = req.body;
      const authorId = req.user._id

      try {
        const createdComment = await models.Comment.create({ author: authorId, post: postId, content })
        await models.Post.findOneAndUpdate({ _id: postId }, { $push: { comments: createdComment._id } });

        res.status(201).send('Added comment successfully!');
      } catch (e) {
        next(e)
      }
    }
  },

  put: {
    edit: async (req, res, next) => {
      const commentId = req.params.id;
      const { content } = req.body;

      try {
        await models.Comment.updateOne({ _id: commentId }, { content });

        res.status(200).send('Updated Successfully!');
      } catch (e) {
        next(e)
      }
    },

    likeComment: async (req, res, next) => {
      const { id } = req.params;
      const authorId = req.user._id;

      try {
        const createdLike = await models.Like.create({ comment: id, likedBy: authorId });

        await models.Comment.updateOne({ _id: id }, { $push: { likes: createdLike._id } });

        res.status(200).send('Liked Successfully!');
      } catch (e) {
        next(e);
      }
    },

    unlikeComment: async (req, res, next) => {
      const { id } = req.params;
      const authorId = req.user._id;

      try {
        const removedLike = await models.Like.findOneAndDelete({ comment: id, likedBy: authorId });

        await models.Comment.updateOne({ _id: id }, { $pull: { likes: removedLike._id } });

        res.status(200).send('Unliked Successfully!');
      } catch (e) {
        next(e);
      }
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    try {
      const removedComment = await models.Comment.findOneAndDelete({ _id: id })
      await models.Post.updateOne({ _id: removedComment.post }, { $pull: { comments: removedComment._id } })

      res.status(200).send('Removed Successfully!');
    } catch (e) {
      next(e);
    }
  }
};