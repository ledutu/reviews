const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    } catch (error) {
        throw new Error();
    }
}

const History = mongoose.model('histories', historySchema);

module.exports = {
    History,
}

