const {
    User, Role, History,
} = require('../../models');
var faker = require('faker');
const { HTTP_STATUS, ACTION } = require('../../constant');
const bcrypt = require('bcrypt');

async function index(request, response) {
    try {
        let { page, limit, name, status, email, role } = request.query;

        let params = { name, status, email, role };

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        users = User.find({});
        link = '?';

        let totalUser = User.find({});

        if (name) {
            link += 'name=' + name + '&';
            users = users.where('profile.full_name').equals({ $regex: new RegExp(name, 'i') });
            totalUser = totalUser.where('profile.full_name').equals({ $regex: new RegExp(name, 'i') });
        }

        if (status) {
            link += 'status=' + status + '&';
            users = users.where('is_block').equals(status);
            totalUser = totalUser.where('is_block').equals(status);
        }

        if (email) {
            link += 'email=' + email + '&';
            users = users.where('email').equals({ $regex: new RegExp(email, 'i') });
            totalUser = totalUser.where('email').equals({ $regex: new RegExp(email, 'i') });
        }

        if (role) {
            link += 'role=' + role + '&';
            users = users.where('role').equals(parseInt(role));
            totalUser = totalUser.where('role').equals(parseInt(role));
        }

        users = await users
            .skip((page * limit) - limit)
            .limit(limit)
            .lean();

        totalUser = await totalUser.countDocuments();

        const userPage = {
            data: users,
            total_page: Math.ceil(totalUser / limit),
            page,
            limit,
        }

        roles = await Role.find({});

        console.log(roles);

        return response.render('admin/user', {
            userPage,
            params,
            link,
            totalUser,
            roles
        });

    } catch (err) {
        console.error(err);
        return response.render('500');
    }
}

async function updateStatusUser(request, response) {
    const { id, type } = request.body;
    try {
        user = await User.findById(id);

        if (!user) {
            return response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Kh??ng t??m th???y user',
            });
        }

        user[type] = !user[type];

        await user.save();

        History.saveHistory(
            request.user._id,
            ACTION.BLOCK_USER,
            (!user.is_block ? 'M??? ch???n' : 'Ch???n') + ' ng?????i d??ng ' + user._id + ' th??nh c??ng'
        );

        return response.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            error: false,
            message: 'Th??nh c??ng',
        });

    } catch (error) {
        console.error(error)
        response.status(HTTP_STATUS.SERVER_ERROR).json({
            status: HTTP_STATUS.SERVER_ERROR,
            error: true,
            message: 'C?? l???i x???y ra, vui l??ng th??? l???i sau.',
        });
    }
}

async function deleteUser(request, response) {
    const { id } = request.body;
    try {
        user = await User.findById(id);

        if (!user) {
            response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Kh??ng t??m th???y user',
            });
        }

        await user.delete();

        History.saveHistory(request.user._id, ACTION.DELETE_USER, 'X??a ng?????i d??ng "' + user.email + '" th??nh c??ng');

        return response.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            error: false,
            message: 'X??a user th??nh c??ng',
        });

    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json({
            status: HTTP_STATUS.SERVER_ERROR,
            error: true,
            message: 'C?? l???i x???y ra, vui l??ng th??? l???i sau.',
        });
    }
}

async function getCreate(request, response) {
    try {
        const { id } = request.query;

        user = {};

        if (id) {
            user = await User.findById(id);
        }

        roles = await Role.find({});

        return response.render('admin/create-user', {
            user,
            id,
            roles,
        })
    } catch (error) {
        request.session.message = {
            status: 'error',
            content: 'C?? l???i x???y ra, vui l??ng th??? l???i sau',
        }

        return response.redirect('back');
    }
}

async function postCreate(request, response) {
    try {
        let { full_name, username, email, password, password_confirm, gender, status, role } = request.body;

        user = request.user;

        emailChecking = await User.findOne({ email }).select('_id');
        usernameChecking = await User.findOne({ 'profile.username': username }).select('_id');

        if (emailChecking) throw new Error('Email ???? t???n t???i');

        if (usernameChecking) throw new Error('Username ???? t???n t???i');

        if (user.role !== 1) throw new Error('T??i kho???n kh??ng ph???i admin');

        if (password !== password_confirm) throw new Error('M???t kh???u kh??ng tr??ng nhau');

        let hashPassword = bcrypt.hashSync(password, 12);

        let newUser = new User({
            email,
            password: hashPassword,
            password_not_hash: password,
            profile: {
                username,
                full_name,
                gender,
            },
            role,
            is_block: status,
        });

        await newUser.save();
        
        History.saveHistory(user._id, ACTION.CREATE_USER, 'T???o ng?????i d??ng ' + newUser._id + ' th??nh c??ng');

        request.session.message = {
            status: 'success',
            content: 'Th??m ng?????i d??ng th??nh c??ng!',
        }

        return response.redirect('/admin/user');

    } catch (error) {
        console.log(error);

        request.session.message = {
            status: 'error',
            content: error.message || 'C?? l???i x???y ra, vui l??ng th??? l???i.',
        }

        return response.redirect('back');
    }
}

async function postUpdate(request, response) {
    try {
        let { full_name, username, password, password_confirm, gender, status, role, id } = request.body;

        user = request.user;

        existUser = await User.findById(id);
        if (!existUser) throw new Error('User kh??ng t???n t???i');

        if (existUser.profile.username !== username) {
            usernameChecking = await User.findOne({ 'profile.username': username }).select('_id');
            if (usernameChecking) throw new Error('Username ???? t???n t???i');
        }

        if (user.role !== 1) throw new Error('T??i kho???n kh??ng ph???i admin');

        if (password !== password_confirm) throw new Error('M???t kh???u kh??ng tr??ng nhau');


        if (password && password_confirm) {
            let hashPassword = bcrypt.hashSync(password, 12);
            existUser.password = hashPassword;
            existUser.password_not_hash = password;
        }

        existUser.profile.username = username;
        existUser.profile.full_name = full_name;
        existUser.profile.gender = gender;
        existUser.role = role;
        existUser.is_block = status;

        await existUser.save();
        
        History.saveHistory(user._id, ACTION.CREATE_USER, 'C???p nh???t ng?????i d??ng ' + existUser._id + ' th??nh c??ng');

        request.session.message = {
            status: 'success',
            content: 'C???p nh???t ng?????i d??ng th??nh c??ng!',
        }

        return response.redirect('/admin/user');

    } catch (error) {
        console.log(error);

        request.session.message = {
            status: 'error',
            content: error.message || 'C?? l???i x???y ra, vui l??ng th??? l???i.',
        }

        return response.redirect('back');
    }
}

module.exports = {
    index,
    updateStatusUser,
    deleteUser,
    getCreate,
    postCreate,
    postUpdate,
}