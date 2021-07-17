const Auth = require('./auth.middleware');
const Message = require('./message.middleware');
const File = require('./file.middleware');

module.exports = {
    Auth,
    Message,
    File
}