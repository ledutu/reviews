var express = require('express');
var router = express.Router();
var auth = require('./auth.route');
var comment = require('./comment.route');
var history = require('./history.route');
var reaction = require('./reaction.route');
var review = require('./review.route');
var user = require('./user.route');
var config = require('./config.route');

router.use('/auth', auth);
router.use('/comment', comment);
router.use('/history', history);
router.use('/reaction', reaction);
router.use('/review', review);
router.use('/user', user);
router.use('/config', config)

module.exports = router;
