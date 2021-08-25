var express = require('express');
var router = express.Router();
var auth = require('./auth.route');
var comment = require('./comment.route');
var history = require('./history.route');
var reaction = require('./reaction.route');
var review = require('./review.route');
var user = require('./user.route');
var config = require('./config.route');
var category = require('./category.route');

var { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN)

router.use('/auth', auth);
router.use('/comment', comment);
router.use('/history', history);
router.use('/reaction', reaction);
router.use('/review', review);
router.use('/user', user);
router.use('/config', config)
router.use('/category', category);

router.post('/sendMessage', function (request, response) {
    try {
        let text = request.body.message;
        console.log(text);
        bot.telegram.sendMessage(
            -581108899,
            text,
        );
        return response.json({
            status: 'OK',
        });    
    } catch (error) {
        console.log(error);
        return response.json({
            status: 'OK',
        });    
    }
    
})

module.exports = router;
