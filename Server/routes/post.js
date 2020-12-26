// Libraries
import { Router } from 'express';
import multer from 'multer';
// Controllers
import { postController } from '../controllers';
// Utils
import { auth } from '../utils';
// Validators
import { createPostDataValidator } from '../validators/post';

const upload = multer({ storage: multer.diskStorage({}) });
const router = Router();

router.get('/', auth(), postController.get);

router.post(
  '/',
  auth(),
  upload.single('image'),
  createPostDataValidator,
  postController.post.create
);

router.put('/:id', auth(), postController.put.edit);
router.put('/like/:id', auth(), postController.put.likePost);
router.put('/unlike/:id', auth(), postController.put.unlikePost);

router.delete('/:id', auth(), postController.delete.removePost);

export default router;
