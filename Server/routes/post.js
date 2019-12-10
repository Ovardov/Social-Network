const router = require('express').Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

router.get('/', postController.get);

router.post('/', auth(), postController.post.create);

router.put('/comment/:id', auth(), postController.put.comment);
router.put('/like/:id', auth(), postController.put.like);

router.delete('/:id', auth(), postController.delete);

module.exports = router;