const { HTTP_TEXT } = require('../constant');

function error(code = HTTP_TEXT.SERVER_ERROR, message = '') {
    return {
        code,
        message,
    }
}

module.exports = error;