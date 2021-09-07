// Libraries
import { Router } from 'express';
// Controllers
import { conversationController } from '../controllers';
// Utils
import { auth } from '../utils';
// Validators
import { getAllRoomMessagesValidator } from '../validators/conversation';

const router = Router();

router.get('/:room/messages', auth(), getAllRoomMessagesValidator, conversationController.get.getAllRoomMessages);
router.get('/users', auth(), conversationController.get.getAllUsersFromMyChat);

export default router;
