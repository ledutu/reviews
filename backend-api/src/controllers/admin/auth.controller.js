const { User } = require('../../models');
const { HTTP_STATUS } = require('../../constant')
const { auth } = require('../../config');

function getLogin(request, response) {

    return response.render('admin/login');
}

function postLogin(req, res, next) {
    auth.authenticate('local', (err, user, info) => {
        if (err) {
            req.session.message = {
                status: 'error',
                content: err.message,
            }
            return res.redirect('/admin/auth/login');
        }

        if (user) {
            req.logIn(user, {}, function (error) {
                if (error) {
                    req.session.message = {
                        status: 'error',
                        content: err.message,
                    }
                    return res.redirect('/admin/auth/login');
                }

                req.session.message = {
                    status: 'success',
                    content: 'Đăng nhập thành công',
                }
                
                return res.redirect(user.role === 1? '/admin/dashboard': '/admin/review');
            })
        }
    })(req, res, next);
    return;

}

module.exports = {
    getLogin,
    postLogin,
}