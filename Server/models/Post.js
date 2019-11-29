const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    date: {
        default: Date.now()
    },

    description: {
        type: Schema.Types.String,
    },

    image: {
        type: Schema.Types.String,
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
});

module.exports = new model('Post', postSchema)