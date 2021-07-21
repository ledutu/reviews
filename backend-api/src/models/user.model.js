const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { AccessToken } = require('./access-token.model');
const jwt = require('jsonwebtoken')

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
        image: { type: String, default: '/images/no-image.jpg' },
        gender: { type: String, enum: ['men', 'women', 'third'], default: 'men' },
        birthday: { type: Date, default: Date.now() },
    },
    total_review: { type: Number, default: 0 },
    role: { type: Number, default: 0 },
    is_block: { type: Boolean, default: false },
    tokens: [{
        token: {
            type: String,
            require: true,
        }
    }]
}, { timestamps: { currentTime: () => Date.now() } });

//Create new function
userSchema.statics.authenticate = async function (email, password, isAdmin, callbackResult, callbackErr) {
    User.findOne({ $or: [{ email }, { 'profile.username': email }] }).select([
        'google_id', 'facebook_id', 'tokens', 'is_block', 'role'
    ]).exec(async function (err, user) {
        if (err) {
            var error = new Error();
            error.message = 'Máy chủ đang gặp sự cố, xin thử lại sau';
            error.status = 500;
            error.code = 'INTERNAL_SERVER_ERROR';
            return callbackErr(error)
        } else if (!user) {
            var err = new Error();
            err.message = 'Không tìm thấy user';
            err.status = 401;
            err.code = 'UN_AUTHORIZED'
            return callbackErr(err);
        }

        if (user.google_id) {
            var err = new Error();
            err.message = 'Tài khoản này đăng nhập bằng google.';
            err.status = 401;
            err.code = 'UN_AUTHORIZED';
            return callbackErr(err);
        }

        if (user.facebook_id) {
            var err = new Error();
            err.message = 'Tài khoản này đăng nhập bằng facebook.';
            err.status = 401;
            err.code = 'UN_AUTHORIZED';
            return callbackErr(err);
        }

        userPassword = await User.findById(user._id).select(['password']);
        bcrypt.compare(password, userPassword.password, async function (err, result) {
            if (result) {
                if (user.is_block) {
                    var err1 = new Error();
                    err1.message = 'Tài khoản này đang bị chặn.';
                    err1.status = 401;
                    err1.code = 'UN_AUTHORIZED';
                    console.log('Go HERE')
                    return callbackErr(err1);
                }
                
                if (isAdmin) return callbackResult(user);

                let token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
                    expiresIn: '30d'
                });

                let accessToken = {
                    user: user._id,
                    access_token: token,
                };

                user.tokens = [...user.tokens, { token }];

                await user.save();

                return callbackResult(accessToken);
            }
            else {
                err = new Error();
                err.message = 'Sai mật khẩu';
                err.status = 401;
                err.code = 'UN_AUTHORIZED';
                return callbackErr(err);
            };
        })
    })
}

const User = mongoose.model('users', userSchema);

module.exports = {
    User,
}

