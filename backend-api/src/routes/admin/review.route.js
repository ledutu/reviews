var express = require('express');
var router = express.Router();
const { ReviewController } = require('../../controllers/admin');

/* GET users listing. */
router.get('/', ReviewController.index);
router.put('/', ReviewController.updateStatusReview);
router.delete('/', ReviewController.deleteReview);

module.exports = router;
