const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    google_id: { type: String, default: '' },
    facebook_id: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, select: false },
    password_not_hash: { type: String, select: false },
    profile: {
        username: { type: String, default: '' },
        full_name: { type: String, default: '' },
        address: { type: String, default: '' },
        image: { type: String, default: '/user/images/no-image.jpg' },
        gender: { type: String, enum: ['men', 'women', 'third'], default: 'men' },
        birthday: { type: Date, default: Date.now() },
    },
    total_review: { type: Number, default: 0 },
    role: { type: Number, default: 0 },
    is_block: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

//Create new function
userSchema.statics.authenticate = async function (email, password, callbackResult, callbackErr) {
    User.findOne({ email }).exec(async function (err, user) {
        if (err) {
            var error = new Error();
            error.message = 'Máy chủ đang gặp sự cố, xin thử lại sau';
            error.status = 500;
            return callbackErr(error)
        } else if (!user) {
            var err = new Error();
            err.message = 'Không tìm thấy user';
            err.status = 401;
            return callbackErr(err);
        }
        
        if(user.google_id) {
            var err = new Error();
            err.message = 'Account này đăng nhập bằng google.';
            err.status = 401;
            return callbackErr(err);
        }
        
        if(user.facebook_id) {
            var err = new Error();
            err.message = 'Account này đăng nhập bằng facebook.';
            err.status = 401;
            return callbackErr(err);
        }

        userPassword = await User.findById(user._id).select(['password']);
        bcrypt.compare(password, userPassword.password, function (err, result) {
            if (result) return callbackResult(user);
            else {
                err = new Error();
                err.message = 'Sai mật khẩu',
                    err.status = 401;
                return callbackErr(err);
            };
        })
    })
}

const User = mongoose.model('users', userSchema);

module.exports = {
    User,
}

