var express = require('express');
var router = express.Router();
const { AdminController } = require('../../controllers/admin');

/* GET users listing. */
router.get('/logout', AdminController.logout);

module.exports = router;
