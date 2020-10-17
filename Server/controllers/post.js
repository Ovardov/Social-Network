const models = require('../models');

module.exports = {
  // To Do with new models
  get: (req, res, next) => {
    const { id } = req.query;
    let query = {};

    if (id) {
      query = { _id: id }
    }

    models.Post.find(query)
      .populate([{ path: 'author', populate: { path: 'friends' } }])
      .populate([{ path: 'comments', populate: { path: 'author' } }])
      .populate('likes')
      .sort({ date: -1 })
      .then((posts) => res.send(posts))
      .catch(next)
  },

  post: {
    create: async (req, res, next) => {
      const { content, imageUrl } = req.body;
      const authorId = req.user._id

      try {
        const createdImage = await models.Image.create({ imageUrl })

        const createdPost = await models.Post.create({ content, image: createdImage._id, author: authorId })

        await models.User.updateOne({ _id: authorId }, { $push: { posts: createdPost._id } });

        res.status(201).send('Created Successfully!');
      } catch (e) {
        next(e)
      }
    }
  },

  put: {
    edit: (req, res, next) => {
      const { id } = req.params;
      const { description } = req.body;

      models.Post.findOneAndUpdate({ _id: id }, { description })
        .then(() => res.status(200).send('Edited Successfully'))
        .catch(next);
    },

    addLike: (req, res, next) => {
      const { id } = req.params;
      const authorId = req.user._id

      models.Post.updateOne({ _id: id }, { $push: { likes: authorId } })
        .then((updatedPost) => res.send(updatedPost))
        .catch(next);
    },

    removeLike: (req, res, next) => {
      const { id } = req.params;
      const authorId = req.user._id

      models.Post.updateOne({ _id: id }, { $pull: { likes: authorId } })
        .then((updatedPost) => res.send(updatedPost))
        .catch(next);
    }
  },

  delete: async (req, res, next) => {
    const id = req.params.id;

    try {
      const removedPost = await models.Post.findOneAndDelete({ _id: id });
      
      await models.Comment.deleteMany({ post: id });
      await models.Like.deleteMany({ post: id });
      await models.Image.findOneAndDelete({ _id: removedPost.image });

      await models.User.updateOne({ _id: removedPost.author }, { $pull: { posts: removedPost._id } });

      res.status(200).send('Deleted Successfully');
    } catch (e) {
      next(e);
    }
  }
};