const router = require('express').Router();
const auth = require('../utils/auth');
const { userController } = require('../controllers');

router.get('/', userController.get.home);
router.get('/me', userController.get.myProfile);

router.get('/suggested', auth(), userController.get.suggested)

router.put('/friend/add/:id', auth(), userController.put.addFriend);
router.put('/friend/remove/:id', auth(), userController.put.removeFriend);

router.put('/:username', userController.put.update);

router.delete('/', auth(), userController.delete.removeMyAccount);

module.exports = router;