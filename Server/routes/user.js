// Libraries
import {Router} from 'express';
// Controllers
import { userController } from '../controllers';
// Utils
import {auth} from '../utils';

const router = Router();

router.get('/', auth(), userController.get.home);
router.get('/me', auth(), userController.get.myProfile);

router.get('/suggested', auth(), userController.get.suggested)

router.put('/friend/add/:id', auth(), userController.put.addFriend);
router.put('/friend/remove/:id', auth(), userController.put.removeFriend);

router.put('/', auth(), userController.put.update);

router.delete('/', auth(), userController.delete.removeMyAccount);

export default router;
