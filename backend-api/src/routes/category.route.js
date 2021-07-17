var express = require('express');
var router = express.Router();
const { CategoryController } = require('../controllers');

/* GET users listing. */
router.get('/', CategoryController.index);

module.exports = router;
