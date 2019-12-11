const models = require('../models');

module.exports = {
    post: async (req, res, next) => {
        const postId = req.params.id;
        const { description } = req.body;
        const authorId = req.user._id

        try {
            const createdComment = await models.Comment.create({ author: authorId, post: postId, description })
            await models.Post.updateOne({ _id: postId }, { $push: { comments: createdComment } });

            res.send(createdComment);
        } catch (e) {
            next(e)
        }
    },

    put: async (req, res, next) => {
        const commentId = req.params.id;
        const { description } = req.body;

        try {
           const updatedComment = await models.Comment.updateOne({ _id: commentId }, {description});

            res.send(updatedComment);
        } catch (e) {
            next(e)
        }
    },

    delete: async (req, res, next) => {
        const id = req.params.id;

        try {
            const removedComment = await models.Comment.findOneAndDelete({ _id: id })
            await models.Post.updateOne({ _id: removedComment.post._id }, { $pull: { comments: removedComment._id } })

            res.send(removedComment);
        } catch (e) {
            next(e);
        }
    }
};