const jwt = require('jsonwebtoken')
const { User, AccessToken } = require('../models')
const { HTTP_STATUS } = require('../constant');

const auth = async (request, response, next) => {
    try {
        if (!request.header('Authorization')) {
            let error = new Error();
            error.name = 'JsonWebTokenError';
            error.message = 'Token Missing'
            throw error;
        }
        const token = request.header('Authorization').replace('Bearer ', '')
        let data = jwt.verify(token, process.env.JWT_KEY);
        user = await User.findOne({
            _id: data._id,
            'tokens.token': token,
        });

        if (!user) {
            let error = new Error();
            error.name = 'JsonWebTokenError';
            error.message = 'invalid token';
            throw error;
        }

        request.user = user;
        request.token = token;
        return next();
    } catch (err) {
        request.user = undefined;
        request.token = undefined;
        return response.status(HTTP_STATUS.UN_AUTHORIZED).json({
            code: err.name,
            message: err.message
        })
    }
}


module.exports = {
    auth
}