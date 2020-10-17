const router = require('express').Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

router.post('/', auth(), commentController.post.create);

router.put('/:id', auth(), commentController.put.edit);
router.put('/like/:id', auth(), commentController.put.likeComment);
router.put('/unlike/:id', auth(), commentController.put.unlikeComment);

router.delete('/:id', auth(), commentController.delete);

module.exports = router;