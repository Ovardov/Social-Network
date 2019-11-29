const router = require('express').Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

router.get('/', postController.get);

router.post('/create', auth(), postController.post.create);

module.exports = router;