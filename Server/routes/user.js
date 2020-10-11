const router = require('express').Router();
const auth = require('../utils/auth');
const { userController } = require('../controllers');

router.get('/', userController.get.home);

router.get('/suggested', userController.get.suggested)

router.get('/logout', auth(), userController.get.logout);

router.post('/register', userController.post.register);

router.post('/login', userController.post.login);


router.put('/friend/add/:id', auth(), userController.put.addFriend);
router.put('/friend/remove/:id', auth(), userController.put.removeFriend);

router.put('/:username', userController.put.update);

router.delete('/', auth(), userController.delete);

module.exports = router;