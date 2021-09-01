// Libraries
import { Router } from 'express';
import multer from 'multer';
// Controllers
import { postController } from '../controllers';
// Utils
import { auth } from '../utils';
// Validators
import {
  getOnePostDataValidator,
  createOrEditPostDataValidator,
} from '../validators/post';

const upload = multer({ storage: multer.diskStorage({}) });
const router = Router();

router.get('/', auth(), postController.get.getAllPosts);
router.get('/:id', auth(), getOnePostDataValidator, postController.get.getOnePost);
router.get('/:id/likes', auth(), getOnePostDataValidator, postController.get.getPostLikes);


router.post(
  '/',
  auth(),
  upload.single('image'),
  createOrEditPostDataValidator,
  postController.post.create
);

router.put('/:id', auth(), upload.single('image'), createOrEditPostDataValidator, postController.put.edit);
router.put('/like/:id', auth(), postController.put.likePost);
router.put('/dislike/:id', auth(), postController.put.dislikePost);

router.delete('/:id', auth(), postController.delete.removePost);

export default router;
