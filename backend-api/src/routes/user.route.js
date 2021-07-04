var express = require('express');
var router = express.Router();
const { UserController } = require('../controllers');

/* GET users listing. */
router.get('/me', UserController.me);
router.get('/logout', UserController.logout);

module.exports = router;
