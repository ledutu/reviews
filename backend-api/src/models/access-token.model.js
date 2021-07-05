const mongoose = require('mongoose');
const { Schema } = mongoose;

const accessTokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    access_token: { type: String, require: true },
}, { timestamps: { currentTime: () => Date.now() } });

const AccessToken = mongoose.model('access_tokens', accessTokenSchema);

module.exports = {
    AccessToken,
}

