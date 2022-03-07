const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
    text: { type: Schema.Types.String, default: '' },
}, { timestamps: { currentTime: () => Date.now() } });

const Answer = mongoose.model('answers', answerSchema);

module.exports = {
    Answer,
}

