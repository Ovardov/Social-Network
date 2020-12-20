// Libraries
import express from 'express';
import multer from 'multer';
import passport from 'passport';
// Controllers
import { authController } from '../controllers';
// Utils
import { auth } from '../utils';
// Config
import { clientLoginFailureRedirectUrl }from '../config/config';
// Validators
import { registerDataValidator, loginDataValidator } from '../validators/auth';


const upload = multer({ storage: multer.diskStorage({})} );
const router = express.Router();

// GET Routes
router.get('/', authController.get.checkAuth);
router.get('/logout', auth(), authController.get.logout);

// Social Providers
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// To Do error handling
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: clientLoginFailureRedirectUrl }), authController.get.socialLogin);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: clientLoginFailureRedirectUrl }), authController.get.socialLogin);


// POST routes
router.post('/register', upload.single('profilePicture'), registerDataValidator, authController.post.register);
router.post('/login', loginDataValidator, authController.post.login);

export default router