var express = require('express');
var router = express.Router();
const { CommentController } = require('../controllers');

/* GET users listing. */
router.get('/', CommentController.index);

module.exports = router;
