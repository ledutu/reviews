var express = require('express');
var router = express.Router();
const { ReactionController } = require('../controllers');
const { Auth } = require('../middlewares');
/* GET users listing. */
router.use(Auth.auth);
router.post('/rate/:review_id', ReactionController.rate);

module.exports = router;
