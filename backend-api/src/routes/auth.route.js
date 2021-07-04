var express = require('express');
var router = express.Router();
const { AuthController } = require('../controllers');

/* GET users listing. */
router.post('/login', AuthController.login);

module.exports = router;
