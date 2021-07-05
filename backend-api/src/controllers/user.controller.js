const { HTTP_STATUS, HTTP_TEXT } = require('../constant');
const { error } = require('../interfaces');

function me(request, response) {
    try {
        user = request.user;
        return response.status(HTTP_STATUS.OK).json({
            _id: user._id,
            profile: user.profile,
            google_id: user.google_id,
            facebook_id: user.facebook_id,
            email: user.email,
        });
    } catch (err) {
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error(HTTP_TEXT.SERVER_ERROR))
    }
}

async function logout(request, response) {
    try {
        user = request.user;
        token = request.token;
        user.tokens = user.tokens.filter(item => item.token !== token);
        await user.save();
        
        return response.status(HTTP_STATUS.OK).json({
            code: 'OK',
        })
    } catch (err) {
        console.log(err);
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error(HTTP_TEXT.SERVER_ERROR))
    }
}

module.exports = {
    me,
    logout,
}