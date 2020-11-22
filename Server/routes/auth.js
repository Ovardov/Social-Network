const router = require('express').Router();
const passport = require('passport');
const { auth } = require('../utils');
const { authController } = require('../controllers');
const { clientFailureUrl } = require('../config/config');

router.get('/', authController.get.checkAuth);
router.get('/logout', auth(), authController.get.logout);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// To Do error handling
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: clientFailureUrl}), authController.get.facebookLogin);

router.post('/register', authController.post.register);
router.post('/login', authController.post.login);

module.exports = router;