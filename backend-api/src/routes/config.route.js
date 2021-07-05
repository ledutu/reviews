var express = require('express');
var router = express.Router();
const { ConfigController } = require('../controllers');

/* GET users listing. */
router.get('/docs', ConfigController.getDocs);

module.exports = router;
