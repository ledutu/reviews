function isAdmin(req, res, next) {
    if (req.user) {
        if (req.user.role === 1 || req.user.role === 2) {
            req.app.locals.admin = req.user;
            console.log('admin');
            return next();
        }
        console.log('no admin');
        req.session.message = {
            status: 'error',
            content: 'Tài khoản không phải admin hoặc CTV',
        }
        req.app.locals.admin = undefined;
        return res.redirect('/admin/auth/login');
    }
    console.log('no admin');
    req.session.message = {
        status: 'error',
        content: 'Bạn chưa đăng nhập',
    }
    req.app.locals.admin = undefined;
    return res.redirect('/admin/auth/login');
}

function isSuperAdmin(req, res, next) {
    if(req.user) {
        if (req.user.role === 1) {
            return next();
        }
    }
    
    req.session.message = {
        status: 'error',
        content: 'Bạn không có quyền để truy cập vào trang này',
    }
    return res.redirect('/admin/review');
}

function isAdminApi(req, res, next) {
    if (req.user) {
        if (req.user.role === 1) {
            return next();
        }
        
    }
    
    return response.status(500).json({
        status: 500,
        error: true,
        message: 'Bạn không có quyền để xóa bài này.',
    });
}

module.exports = {
    isAdmin,
    isAdminApi,
    isSuperAdmin,
}