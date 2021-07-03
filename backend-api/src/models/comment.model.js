const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    content: { type: String, require: true },
    review_id: { type: Schema.Types.ObjectId, ref: 'reviews' },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    is_hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const Comment = mongoose.model('comments', commentSchema);

module.exports = {
    Comment,
}

