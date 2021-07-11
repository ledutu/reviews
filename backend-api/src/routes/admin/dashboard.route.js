var express = require('express');
var router = express.Router();
const { DashboardController } = require('../../controllers/admin');

/* GET users listing. */
router.get('/', DashboardController.index);

module.exports = router;
