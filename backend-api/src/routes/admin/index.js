var express = require('express');
var router = express.Router();
var auth = require('./auth.route');
var review = require('./review.route');
var util = require('./util.route');
var dashboard = require('./dashboard.route');
var admin = require('./admin.route');
var tag = require('./tag.route');
var user = require('./user.route');
var category = require('./category.route');
var history = require('./history.route');

var { Admin } = require('../../middlewares');

router.use('/auth', auth);
router.use('/util', util);

router.use(Admin.Auth.isAdmin);
router.use('/review', review);
router.use('/dashboard', dashboard);
router.use('/admin', admin);
router.use('/tag', tag);
router.use('/user', user);
router.use('/category', category);
router.use('/history', history);

module.exports = router;
