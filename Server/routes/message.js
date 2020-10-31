const router = require('express').Router();

const { auth } = require('../utils');
const { messageController } = require('../controllers');

router.get('/', auth(), messageController.get.getMessage);

module.exports = router;