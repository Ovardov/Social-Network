const router = require('express').Router();
const passport = require('passport');
const { auth } = require('../utils');
const { authController } = require('../controllers');
const { clientFailureUrl, clientLoginFailureRedirectUrl } = require('../config/config');

router.get('/', authController.get.checkAuth);
router.get('/logout', auth(), authController.get.logout);

// Social Providers
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// To Do error handling
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: clientLoginFailureRedirectUrl }), authController.get.socialLogin);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: clientLoginFailureRedirectUrl }), authController.get.socialLogin);


router.post('/register', authController.post.register);
router.post('/login', authController.post.login);

module.exports = router;