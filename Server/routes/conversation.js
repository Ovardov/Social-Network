// Libraries
import {Router} from 'express';
// Controllers
import { conversationController } from '../controllers';
// Utils
import {auth} from '../utils';

const router = Router();

router.get('/:room/messages', auth(), conversationController.get.getAllMessages);

export default router;
