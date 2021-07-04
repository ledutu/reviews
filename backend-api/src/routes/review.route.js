var express = require('express');
var router = express.Router();
const { ReviewController } = require('../controllers');

/* GET users listing. */
router.get('/category', ReviewController.getReviewWithCategory);
router.get('/:id', ReviewController.getReviewDetail);
router.put('/:id', ReviewController.editReviewDetail);
router.delete('/:id', ReviewController.deleteReviewDetail);

module.exports = router;
