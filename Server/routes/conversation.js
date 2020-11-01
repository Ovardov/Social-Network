const router = require('express').Router();

const { auth } = require('../utils');
const { conversationController } = require('../controllers');

router.get('/:room/messages', auth(), conversationController.get.getAllMessages);

module.exports = router;