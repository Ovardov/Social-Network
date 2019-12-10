const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    description: {
        type: Schema.Types.String,
        required: true
    },

    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});

module.exports = new model('Comment', commentSchema)