const cron = require('cron');
var mongoose = require('mongoose');
const { ACTION } = require('../constant');
const { History, Review } = require('../models');

require('dotenv').config({path: '../../.env'});

const {
    ACCESS_TIMEOUT,
    MONGODB_URL,
  } = process.env;

const mongoUrl = MONGODB_URL;

const db = mongoose.connection;

const connectWithRetry = function () {
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, (err) => {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
      setTimeout(connectWithRetry, ACCESS_TIMEOUT)
    }
  })
}
connectWithRetry()

db.on('connected', () => {
  console.log('Connect DB Successful');
})

async function handleConfirmReviewPost(){
    try {
        reviews = await Review.find({
            is_schedule: true,
            createdAt: {$lte: new Date()}
        }).select(['_id']);
        
        if(reviews.length > 0) {
            reviews.forEach(async review => {
                
                if(!review.is_confirm) {
                    review.is_confirm = true;
                }
                
                review.is_schedule = false;
                
                await review.save();
                
                History.saveHistory(null, ACTION.CONFIRM_REVIEW, 'Hệ thống tự động duyệt bài '+review._id+' thành công');
            })
        }       
        
    } catch (error) {
        throw new Error('Server Error');
    }
}

const scheduleConfirmReviewPost = new cron.CronJob({
    cronTime: '00 30 23 * * *', // Chạy Jobs vào 23h30 hằng đêm
    onTick: () => {
        handleConfirmReviewPost()
    },
    start: true,
    timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng 
});

scheduleConfirmReviewPost.start();