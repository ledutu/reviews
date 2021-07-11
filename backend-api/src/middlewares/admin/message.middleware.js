
function isMessage(request, response, next) {
    if (request.session.message) {
        request.app.locals.message = request.session.message;
        
        return next();
    }
    request.app.locals.message = undefined;
    next();
}

module.exports = {
    isMessage,
}