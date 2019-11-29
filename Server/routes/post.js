const router = require('express').Router();
const {postController} = require('../controllers');

router.get('/', postController.get);

module.exports = router;