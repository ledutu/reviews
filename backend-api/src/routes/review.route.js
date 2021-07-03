var express = require('express');
var router = express.Router();
const { ReviewController } = require('../controllers');

/* GET users listing. */
router.get('/', ReviewController.index);

module.exports = router;
