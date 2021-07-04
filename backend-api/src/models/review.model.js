const mongoose = require('mongoose');
const { Schema } = mongoose;
const reviewSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    reviewer: { type: Schema.Types.ObjectId, ref: 'users' },
    image: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'review_categories' },
    slug: { type: String, default: '' },
    rate: { type: Number, default: 0 },
    is_confirm: { type: Boolean, default: false },
    is_hide: { type: Boolean, default: false },
    is_block: { type: Boolean, default: false },
}, { timestamps: true });

const Review = mongoose.model('reviews', reviewSchema);

module.exports = {
    Review,
}

