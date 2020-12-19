// Libraries
import {Router} from 'express';
// Controllers
import { postController } from '../controllers';
// Utils
import {auth} from '../utils';

const router = Router();

router.get('/', auth(), postController.get);

router.post('/', auth(), postController.post.create);

router.put('/:id', auth(), postController.put.edit);
router.put('/like/:id', auth(), postController.put.likePost);
router.put('/unlike/:id', auth(), postController.put.unlikePost);

router.delete('/:id', auth(), postController.delete.removePost);

export default router;
