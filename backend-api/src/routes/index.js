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
const {Answer} = require('../models/answer.modal')

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

router.post('/sendMessage', async function (request, response) {
    try {
        let text = request.body.message;
        let answer = new Answer();
        answer.text = text;
        await answer.save()

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

router.get('/answer', async function(request, response) {
    try {
        const answer = await Answer.find({}, {}, {sort: {createdAt: -1}});
        response.send(answer);
    } catch(error) {
        response.send(error)
    }
})

module.exports = router;
