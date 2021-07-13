const mongoose = require('mongoose');
const { Schema } = mongoose;

const color = ['blue', 'green', 'yell', 'orange'];

const reviewCategorySchema = new Schema({
    name: { type: String, default: '' },
    short_name: { type: String, default: '' },
    parent: this,
    path: { type: String, default: '/' },
    visited: { type: Number, default: 0 },
    tag_color: { type: String, enum: color, default: 'orange' },
    is_block: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const ReviewCategory = mongoose.model('review_categories', reviewCategorySchema);

module.exports = {
    ReviewCategory,
}

