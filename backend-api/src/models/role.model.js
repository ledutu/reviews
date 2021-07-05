const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    role_id: { type: Number, default: 0 },
    name: { type: String, default: '' },
}, { timestamps: { currentTime: () => Date.now() } });

const Role = mongoose.model('roles', roleSchema);

module.exports = {
    Role,
}

