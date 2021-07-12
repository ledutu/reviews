const mongoose = require('mongoose');
const { Schema } = mongoose;

const color = ['blue', 'green', 'yell', 'orange'];

const tagSchema = new Schema({
    name: { type: String, require: true },
    tag_color: { type: String, enum: color, default: 'orange' },
    is_block: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const Tag = mongoose.model('tags', tagSchema);

module.exports = {
    Tag,
}

