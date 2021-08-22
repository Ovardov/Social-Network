// Libraries
import { Router } from 'express';
import multer from 'multer';
// Controllers
import { userController } from '../controllers';
// Validators
import { getProfileDataValidator, updateUserPictureValidator } from '../validators/user';
// Utils
import { auth } from '../utils';

const upload = multer({ storage: multer.diskStorage({}) });
const router = Router();

router.get('/', auth(), userController.get.home);
router.get('/:username', auth(), getProfileDataValidator, userController.get.profile);
router.get('/me', auth(), userController.get.myProfile);

router.get('/suggested', auth(), userController.get.suggested)

router.put('/friend/add/:username', auth(), userController.put.addFriend);
router.put('/friend/remove/:username', auth(), userController.put.removeFriend);
router.put('/update-picture', auth(), upload.single('image'), updateUserPictureValidator, userController.put.updatePicture);

router.put('/', auth(), userController.put.update);

router.delete('/', auth(), userController.delete.removeMyAccount);

export default router;
