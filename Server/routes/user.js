const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/', userController.get);

router.post('/register', userController.post.register);

router.post('/login', userController.post.login);

router.post('/logout', userController.post.logout);

router.put('/:id', userController.put);

router.delete('/:id', userController.delete);

module.exports = router;