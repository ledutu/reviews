var express = require('express');
var router = express.Router();
var auth = require('./auth.route');
var review = require('./review.route');
var util = require('./util.route');
var dashboard = require('./dashboard.route');
var admin = require('./admin.route');
var tag = require('./tag.route');

var { Admin } = require('../../middlewares');

router.use('/auth', auth);
router.use('/util', util);

router.use(Admin.Auth.isAdmin);
router.use('/review', review);
router.use('/dashboard', dashboard);
router.use('/admin', admin);
router.use('/tag', tag);

module.exports = router;
