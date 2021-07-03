const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    rate: { type: Number, enum: [1, 2, 3, 4, 5], default: 5 },
    review_id: { type: Schema.Types.ObjectId },
}, { timestamps: { currentTime: () => Date.now() } });

const Reaction = mongoose.model('reactions', reactionSchema);

module.exports = {
    Reaction,
}

