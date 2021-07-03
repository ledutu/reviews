var express = require('express');
var router = express.Router();
const { ReactionController } = require('../controllers');

/* GET users listing. */
router.get('/', ReactionController.index);

module.exports = router;
