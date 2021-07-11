var express = require('express');
var router = express.Router();
const { ReviewController } = require('../../controllers/admin');

/* GET users listing. */
router.get('/', ReviewController.index);
// router.post('/login', AuthController.login);

module.exports = router;
