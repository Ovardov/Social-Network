// Libraries
import { Router } from 'express';
// Controllers
import { commentController } from '../controllers';
// Utils
import { auth } from '../utils';
// Validators
import { updateCommentDataValidator } from '../validators/comment';

const router = Router();

router.post('/', auth(), commentController.post.create);

router.put('/:id', auth(), updateCommentDataValidator, commentController.put.edit);
router.put('/:id/likes/add', auth(), commentController.put.likeComment);
router.put('/:id/likes/remove', auth(), commentController.put.unlikeComment);

router.delete('/:id', auth(), commentController.delete.removeComment);

export default router;