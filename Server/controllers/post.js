const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        const { id } = req.query;
        let query = {};

        if (id) {
            query = { _id: id }
        }

        models.Post.find(query)
            .populate([{ path: 'author', populate: { path: 'friends' } }])
            .populate([{ path: 'comments', populate: { path: 'author' } }])
            .sort({ date: -1 })
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

                res.status(200).send('Created Successfully');
            } catch (e) {
                next(e)
            }
        }
    },

    put: {
        edit: (req, res, next) => {
            const { id } = req.params;
            const {description} = req.body;

            models.Post.findOneAndUpdate({_id: id}, {description})
                .then(() => res.status(200).send('Edited Successfully'))
                .catch(next);
        },

        like: (req, res, next) => {
            const { id } = req.params;
            const authorId = req.user._id

            models.Post.updateOne({ _id: id }, { $push: { likes: authorId } })
                .then((updatedPost) => res.send(updatedPost))
                .catch(next);
        },
    },

    delete: async (req, res, next) => {
        const id = req.params.id;

        try {
            const removedPost = await models.Post.findOneAndDelete({ _id: id })
            await models.Comment.deleteMany({ post: id });
            await models.User.updateOne({ _id: removedPost.author }, { $pull: { posts: removedPost._id } });


            res.status(200).send('Deleted Successfully');
        } catch (e) {
            next(e);
        }
    }
};