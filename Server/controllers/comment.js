// Libraries
import { validationResult } from 'express-validator';
const models = require('../models');

module.exports = {
  post: {
    create: async (req, res, next) => {
      const { content, postId } = req.body;
      const authorId = req.user._id

      try {
        const createdComment = await models.Comment.create({ author: authorId, post: postId, content })
        const commentedPost = await models.Post.findOneAndUpdate({ _id: postId }, { $push: { comments: createdComment._id } }, { new: true })
          .populate('image')
          .populate([
            {
              path: 'author',
              select: [
                'firstName',
                'lastName',
                'fullName',
                'username',
                'profilePicture',
              ],
              populate: 'profilePicture',
            },
          ])
          .populate([
            {
              path: 'comments',
              populate: {
                path: 'author',
                select: ['firstName', 'lastName', 'fullName', 'username'],
              },
            },
          ])
          .populate([
            {
              path: 'likes',
              select: 'likedBy',
              populate: {
                path: 'likedBy',
                select: '_id'
              },
            },
          ])

        res.status(201).send(commentedPost);
      } catch (e) {
        next(e)
      }
    }
  },

  put: {
    edit: async (req, res, next) => {
      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const commentId = req.params.id;
        const { content } = req.body;

        const updatedComment = await models.Comment.findOneAndUpdate({ _id: commentId }, { content }, { new: true, })
          .select('content')
          .populate({
            path: 'author',
            select: 'firstName lastName username',
            populate: 'profilePicture'
          });

        res.status(200).send(updatedComment);
      } catch (e) {
        next(e)
      }
    },

    likeComment: async (req, res, next) => {
      try {
        const { id } = req.params;
        const authorId = req.user._id;

        const createdLike = await models.Like.create({ comment: id, likedBy: authorId });

        const likedComment = await models.Comment.findOneAndUpdate({ _id: id }, { $push: { likes: createdLike._id } }, { new: true })
          .select('content likesCount isLikedByMe')
          .populate({
            path: 'author',
            select: 'firstName lastName username',
            populate: 'profilePicture'
          })
          .populate('likesCount')
          .populate([
            {
              path: 'likes',
              select: 'likedBy',
              populate: {
                path: 'likedBy',
                select: '_id'
              },
            },
          ]);

        res.status(200).send(likedComment);
      } catch (e) {
        next(e);
      }
    },

    unlikeComment: async (req, res, next) => {
      const { id } = req.params;
      const authorId = req.user._id;

      try {
        const removedLike = await models.Like.findOneAndDelete({ comment: id, likedBy: authorId },);

        const dislikedComment = await models.Comment.findOneAndUpdate({ _id: id }, { $pull: { likes: removedLike._id } }, { new: true })
          .select('content')
          .populate({
            path: 'author',
            select: 'firstName lastName username',
            populate: 'profilePicture'
          })
          .populate('likesCount')
          .populate([
            {
              path: 'likes',
              select: 'likedBy',
              populate: {
                path: 'likedBy',
                select: '_id'
              },
            },
          ]);

        res.status(200).send(dislikedComment);
      } catch (e) {
        next(e);
      }
    }
  },

  delete: {
    removeComment: async (req, res, next) => {
      const { id } = req.params;

      try {
        const removedComment = await models.Comment.findOneAndDelete({ _id: id })
          .select('post')

        await models.Post.updateOne({ _id: removedComment.post }, { $pull: { comments: removedComment._id } })

        res.status(200).send(removedComment);
      } catch (e) {
        next(e);
      }
    }
  }
};