const mongoose = require('mongoose');
const { Schema } = mongoose;
const reviewSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    summary: { type: String, default: '' },
    reviewer: { type: Schema.Types.ObjectId, ref: 'users' },
    image: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'review_categories' },
    tag: [{ type: Schema.Types.ObjectId, ref: 'tags' }],
    slug: { type: String, default: '' },
    rate: { type: Number, default: 0 },
    visited: { type: Number, default: 0 },
    is_confirm: { type: Boolean, default: false },
    is_hide: { type: Boolean, default: false },
    is_block: { type: Boolean, default: false },
}, { timestamps: true });

reviewSchema.statics.increaseVisited = async function (id) {
    try {
        review = await Review.findById(id);
        review.visited += 1;
        await review.save();
    } catch (error) {
        throw new Error();
    }
}

const Review = mongoose.model('reviews', reviewSchema);

module.exports = {
    Review,
}

