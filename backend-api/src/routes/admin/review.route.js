var express = require('express');
var router = express.Router();
const { ReviewController } = require('../../controllers/admin');
const { File } = require('../../middlewares/admin');

/* GET users listing. */
router.get('/', ReviewController.index);
router.put('/', ReviewController.updateStatusReview);
router.delete('/', ReviewController.deleteReview);

router.get('/create', ReviewController.getCreate);
router.post('/upload-image-texteditor', File.uploadReviewMiddleware, ReviewController.uploadImageTextEditor);
router.post('/create', File.uploadReviewImageTitleMiddleware, ReviewController.postCreate);
router.post('/update', File.uploadReviewImageTitleMiddleware, ReviewController.postUpdate);

module.exports = router;
