const userController = require('./user');
const postController = require('./post');
const commentController = require('./comment');
const authController = require('./auth');
const messageController = require('./message');

module.exports = {
    userController,
    postController,
    commentController,
    authController,
    messageController
};