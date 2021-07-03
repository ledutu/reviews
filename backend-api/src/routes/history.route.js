var express = require('express');
var router = express.Router();
const { HistoryController } = require('../controllers');

/* GET users listing. */
router.get('/', HistoryController.index);

module.exports = router;
