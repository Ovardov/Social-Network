const router = require('express').Router();
const auth = require('../utils/auth');
const { userController } = require('../controllers');

router.get('/', userController.get.home);

router.get('/suggested', userController.get.suggested)

router.post('/register', userController.post.register);

router.post('/login', userController.post.login);

router.post('/logout', userController.post.logout);

router.post('/add-friend', auth(), userController.post.addFriend);

router.put('/:username', userController.put);

router.delete('/:id', userController.delete);

module.exports = router;