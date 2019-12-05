const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Post.find().populate('author')
            .then((posts) => res.send(posts))
            .catch(next)
    },

    post: {
        create: async (req, res, next) => {
            const { description, image } = req.body;
            const authorId = req.user._id

            try {
                const createdPost = await models.Post.create({ author: authorId, description, image })
                await models.User.updateOne({ _id: authorId }, { $push: { posts: createdPost } });

                res.send(createdPost);
            } catch (e) {
                next(e)
            }
        }
    },

    put: (req, res, next) => {
        const id = req.params.id;

        models.Post.updateOne({ _id: id })
            .then((updatedPost) => res.send(updatedPost))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;

        models.Post.deleteOne({ _id: id })
            .then((removedPost) => res.send(removedPost))
            .catch(next)
    }
};