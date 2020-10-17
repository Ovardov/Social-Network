const router = require('express').Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

router.get('/', auth(), postController.get);

router.post('/', auth(), postController.post.create);

router.put('/:id', auth(), postController.put.edit);
router.put('/like/:id', auth(), postController.put.likePost);
router.put('/unlike/:id', auth(), postController.put.unlikePost);


router.delete('/:id', auth(), postController.delete);

module.exports = router;