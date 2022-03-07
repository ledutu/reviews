const mongoose = require('mongoose');
const { Schema } = mongoose;

var { Telegraf } = require('telegraf');
const { ACTION } = require('../constant');
const { User } = require('./user.model');
const moment = require('moment');

const bot = new Telegraf(process.env.BOT_TOKEN)

const historySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    action_name: { type: String, default: '' },
    comment: { type: String, require: true },
    is_hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

historySchema.statics.saveHistory = async function (userId, actionName, comment) {
    try {
        history = new History({
            user: userId,
            action_name: actionName,
            comment,
        });

        await history.save();

//         actions = [
//             ACTION.CREATE_REVIEW,
//             ACTION.UPDATE_REVIEW,
//             ACTION.BLOCK_REVIEW,
//             ACTION.CONFIRM_REVIEW,
//             ACTION.HIDE_REVIEW,
//             ACTION.DELETE_REVIEW,
//         ];

//         if (actions.includes(actionName)) {
//             moment.locale('vi');
//             let message = '';
//             if (userId) {
//                 user = await User.findById(userId).select(['profile']);
//                 message = `<b>Action: ${actionName}</b>
// Người thao tác: <b>${user.profile.full_name}</b>
// User ID: <b>${user._id}</b>
// Comment: <b>${comment}</b>
// Vào lúc: <b>${moment(new Date()).format('LLLL')}</b>`;
//             } else {
//                 message = `<b>Action: ${actionName}</b>
// Người thao tác: <b>Hệ Thống</b>
// Comment: <b>${comment}</b>
// Vào lúc: <b>${moment(new Date()).format('LLLL')}</b>`;
//             }

//             bot.telegram.sendMessage(
//                 parseInt(process.env.TELEGRAM_CHAT_ID),
//                 message,
//                 { parse_mode: 'HTML' }
//             );
//         }

//         bot.launch();
    } catch (error) {
        throw new Error();
    }
}

const History = mongoose.model('histories', historySchema);

module.exports = {
    History,
}

