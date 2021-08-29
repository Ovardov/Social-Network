const userController = require('./user');
const postController = require('./post');
const commentController = require('./comment');
const authController = require('./auth');
const conversationController = require('./conversation');
const interestController = require('./interest');

module.exports = {
    userController,
    postController,
    commentController,
    authController,
    conversationController,
    interestController
};