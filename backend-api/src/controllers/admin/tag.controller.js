const {
    User,
    Review,
    ReviewCategory,
    Comment,
    Reaction,
    Tag,
} = require('../../models');
var faker = require('faker');
const { HTTP_STATUS } = require('../../constant');

async function index(request, response) {
    try {
        let { page, limit, name, status } = request.query;

        let params = { name, status };

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        user = request.user;

        tags = Tag.find({});
        link = '?';

        let totalTag = Tag.find({});

        if (name) {
            link += 'name=' + name + '&';
            tags = tags.where('name').equals({ $regex: new RegExp(name, 'i') });
            totalTag = totalTag.where('name').equals({ $regex: new RegExp(name, 'i') });
        }

        if (status) {
            link += 'status=' + status + '&';
            tags = tags.where('is_block').equals(status);
            totalTag = totalTag.where('is_block').equals(status);
        }

        tags = await tags
            .skip((page * limit) - limit)
            .limit(limit)
            .lean();

        totalTag = await totalTag.countDocuments();

        const tagPage = {
            data: tags,
            total_page: Math.ceil(totalTag / limit),
            page,
            limit,
        }

        return response.render('admin/tag', {
            tagPage,
            params,
            link,
            totalTag,
        });

    } catch (err) {
        console.error(err);
        return response.render('500');
    }
}

async function getCreate(request, response) {
    try {
        const { id } = request.query;

        tag = {};

        if (id) {
            tag = await Tag.findById(id);
        }

        return response.render('admin/create-tag', {
            tag,
            id,
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

async function postUpdate(request, response) {
    try {
        let { name, status, id } = request.body;

        user = request.user;;

        tag = await Tag.findById(id);

        if (!tag) {
            request.session.message = {
                status: 'error',
                content: 'Không tìm thấy bài viết',
            }

            return response.redirect('back');
        }

        tag.name = name;
        tag.is_block = status;

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

async function updateStatusTag(request, response) {
    const { id, type } = request.body;
    try {
        tag = await Tag.findById(id);
        
        if (!tag) {
            return response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Không tìm thấy tag',
            });
        }

        tag[type] = !tag[type];

        await tag.save();

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

async function deleteTag(request, response) {
    const { id } = request.body;
    try {
        tag = await Tag.findById(id);
        
        if (!tag) {
            response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Không tìm thấy tag',
            });
        }

        await tag.delete();

        return response.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            error: false,
            message: 'Xóa tag thành công',
        });

    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json({
            status: HTTP_STATUS.SERVER_ERROR,
            error: true,
            message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        });
    }
}

module.exports = {
    index,
    getCreate,
    postCreate,
    postUpdate,
    updateStatusTag,
    deleteTag,
}