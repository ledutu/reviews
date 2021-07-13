const {
    User, Role,
} = require('../../models');
var faker = require('faker');
const { HTTP_STATUS } = require('../../constant');

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
                message: 'Không tìm thấy user',
            });
        }

        user[type] = !user[type];

        await user.save();

        return response.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            error: false,
            message: 'Thành công',
        });

    } catch (error) {
        console.error(error)
        response.status(HTTP_STATUS.SERVER_ERROR).json({
            status: HTTP_STATUS.SERVER_ERROR,
            error: true,
            message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
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
                message: 'Không tìm thấy user',
            });
        }

        await user.delete();

        return response.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            error: false,
            message: 'Xóa user thành công',
        });

    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json({
            status: HTTP_STATUS.SERVER_ERROR,
            error: true,
            message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
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
            content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        }

        return response.redirect('back');
    }
}

async function postCreate(request, response) {
    try {
        let { name, status } = request.body;

        user = request.user;
        const color = ['blue', 'green', 'yell', 'orange'];

        tag = new Tag({
            name,
            tag_color: faker.helpers.randomize(color),
            is_block: status,
        });

        await tag.save();

        request.session.message = {
            status: 'success',
            content: 'Thêm tag thành công!',
        }

        return response.redirect('/admin/tag');

    } catch (error) {
        console.log(error);

        request.session.message = {
            status: 'error',
            content: 'Có lỗi xảy ra, vui lòng thử lại.',
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
}