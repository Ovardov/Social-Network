const router = require('express').Router();
const { auth } = require('../utils');
const { authController } = require('../controllers');

router.get('/', authController.get.checkAuth);
router.get('/logout', auth(), authController.get.logout);

router.post('/register', authController.post.register);
router.post('/login', authController.post.login);

module.exports = router;