var express = require('express');
var router = express.Router();
const { CommentController } = require('../controllers');
const { Auth } = require('../middlewares');

/* GET users listing. */
router.get('/:review_id', CommentController.getComment);

router.use(Auth.auth);
router.post('/:review_id', CommentController.postComment);
router.put('/:review_id', CommentController.putComment);
router.delete('/:review_id', CommentController.deleteComment);

module.exports = router;
