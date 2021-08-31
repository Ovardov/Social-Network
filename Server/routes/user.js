// Libraries
import { Router } from 'express';
import multer from 'multer';
// Controllers
import { userController } from '../controllers';
// Validators
import {
  getProfileDataValidator,
  updateUserPictureValidator,
  updateUserInfoValidator,
  addUserInterestValidator,
  removeUserInterestValidator,
  searchUsersValidator
} from '../validators/user';
// Utils
import { auth } from '../utils';

const upload = multer({ storage: multer.diskStorage({}) });
const router = Router();

router.get('/', auth(), userController.get.home);
router.get('/suggested-new-friends', auth(), userController.get.suggestedNewFriends)
router.get('/:username', auth(), getProfileDataValidator, userController.get.profile);
router.get('/:username/friends', auth(), getProfileDataValidator, userController.get.friends);
router.get('/search/:searchValue', auth(), searchUsersValidator, userController.get.searchUsers);

router.put('/friends/add/:username', auth(), userController.put.addFriend);
router.put('/friends/remove/:username', auth(), userController.put.removeFriend);
router.put('/pictures', auth(), upload.single('image'), updateUserPictureValidator, userController.put.updatePicture);
router.put('/info', auth(), updateUserInfoValidator, userController.put.updateInfo);
router.put('/interests/add', auth(), addUserInterestValidator, userController.put.addInterest);

router.delete('/interests/remove/:interestId', auth(), removeUserInterestValidator, userController.delete.removeInterest);
router.delete('/', auth(), userController.delete.removeMyAccount);

export default router;
