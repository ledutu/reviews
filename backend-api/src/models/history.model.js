const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
    action: { type: Schema.Types.ObjectId, ref: 'history_actions' },
    comment: { type: String, require: true },
    is_hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const History = mongoose.model('histories', historySchema);

module.exports = {
    History,
}

