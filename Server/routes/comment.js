// Libraries
import {Router} from 'express';
// Controllers
import { commentController } from '../controllers';
// Utils
import {auth} from '../utils';

const router = Router();

router.post('/', auth(), commentController.post.create);

router.put('/:id', auth(), commentController.put.edit);
router.put('/like/:id', auth(), commentController.put.likeComment);
router.put('/unlike/:id', auth(), commentController.put.unlikeComment);

router.delete('/:id', auth(), commentController.delete.removeComment);

export default router;