var express = require('express');
var router = express.Router();
const { UserController } = require('../controllers');
var { Auth } = require('../middlewares');

/* GET users listing. */
router.use(Auth.auth);
router.get('/me', UserController.me);
router.get('/logout', UserController.logout);

module.exports = router;
