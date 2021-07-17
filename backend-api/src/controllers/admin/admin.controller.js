function logout(request, response) {
    request.logout();
    request.app.locals.admin = undefined;
    response.redirect('/admin/auth/login');
}

module.exports = {
    logout
}