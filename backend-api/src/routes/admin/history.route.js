var express = require('express');
var router = express.Router();
const { HistoryController } = require('../../controllers/admin');
const { Auth } = require('../../middlewares/admin');

/* GET users listing. */
router.get('/', HistoryController.index);

module.exports = router;
