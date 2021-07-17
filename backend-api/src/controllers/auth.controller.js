const { User } = require('../models');
const { HTTP_STATUS } = require('../constant')

function login(request, response) {
    const { email, password } = request.body;

    User.authenticate(email, password.toString(), false, result => {
        return response.status(HTTP_STATUS.OK).json(result);
    }, err => {
        return response.status(err.status).json(err);
    });

}

module.exports = {
    login,
}