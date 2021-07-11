var express = require('express');
var router = express.Router();
const { AuthController } = require('../../controllers/admin');

/* GET users listing. */
router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);

module.exports = router;
