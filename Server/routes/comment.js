const router = require('express').Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

router.post('/:id', auth(), commentController.post);

router.put('/:id', auth(), commentController.put);
router.delete('/:id', auth(), commentController.delete);

module.exports = router;