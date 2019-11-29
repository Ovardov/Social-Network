const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Post.find()
            .then((posts) => res.send(posts))
            .catch(next)
    },

    post: {
        create: (req, res, next) => {
            const { description, image } = req.body;
            // const author = req.user;

            models.User.create({ description, image })
                .then((createdPost) => res.send(createdPost))
                .catch(next)
        },
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