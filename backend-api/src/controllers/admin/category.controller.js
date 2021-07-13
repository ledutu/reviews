const {
    ReviewCategory,
} = require('../../models');
var faker = require('faker');
const { HTTP_STATUS } = require('../../constant');
const { StringHelper } = require('../../utils');

async function index(request, response) {
    try {
        let { page, limit, name, status, path, parent } = request.query;

        let params = { name, status, path, parent };

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        user = request.user;

        categories = ReviewCategory.find({});
        link = '?';

        let totalCategory = ReviewCategory.find({});

        if (name) {
            link += 'name=' + name + '&';
            categories = categories.where('name').equals({ $regex: new RegExp(name, 'i') });
            totalCategory = totalCategory.where('name').equals({ $regex: new RegExp(name, 'i') });
        }

        if (status) {
            link += 'status=' + status + '&';
            categories = categories.where('is_block').equals(status);
            totalCategory = totalCategory.where('is_block').equals(status);
        }

        if (parent) {
            if (typeof parent === 'string') parent = [parent];
            parent.map(item => {
                link += 'parent=' + item + '&';
            });
            categories = categories.where('parent').equals({ $in: parent });
            totalCategory = totalCategory.where('parent').equals({ $in: parent });
        }

        if (path) {
            link += 'path=' + path + '&';
            categories = categories.where('path').equals(path);
            totalCategory = totalCategory.where('path').equals(path);
        }

        categories = await categories
            .populate('parent')
            .skip((page * limit) - limit)
            .limit(limit)
            .lean();

        parentCategories = await ReviewCategory.find({ parent: null });

        totalCategory = await totalCategory.countDocuments();

        const categoryPage = {
            data: categories,
            total_page: Math.ceil(totalCategory / limit),
            page,
            limit,
        }

        return response.render('admin/category', {
            categoryPage,
            params,
            link,
            totalCategory,
            parentCategories,
        });

    } catch (err) {
        console.error(err);
        return response.render('500');
    }
}

async function updateStatusCategory(request, response) {
    const { id, type } = request.body;
    try {
        category = await ReviewCategory.findById(id);

        if (!category) {
            return response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Không tìm thấy thể loại',
            });
        }

        category[type] = !category[type];

        await category.save();

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

async function deleteCategory(request, response) {
    const { id } = request.body;
    try {
        category = await ReviewCategory.findById(id);

        if (!category) {
            response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Không tìm thấy thể loại',
            });
        }

        await category.delete();

        return response.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            error: false,
            message: 'Xóa thể loại thành công',
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

        category = {};
        parentCategories = await ReviewCategory.find({});

        if (id) {
            category = await ReviewCategory.findById(id);
        }

        return response.render('admin/create-category', {
            category,
            id,
            parentCategories
        })
    } catch (error) {
        console.error(error);
        request.session.message = {
            status: 'error',
            content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        }

        return response.redirect('back');
    }
}

async function postCreate(request, response) {
    try {
        let { name, status, parent } = request.body;

        const color = ['blue', 'green', 'yell', 'orange'];
        let path = '/';

        if (parent !== 'root') {
            parentCategory = await ReviewCategory.findById(parent);
            path = (parentCategory.path || '') + '/' + faker.helpers.slugify(StringHelper.removeVietnameseTones(parentCategory.name.toLowerCase()));
        }
        category = new ReviewCategory({
            name,
            short_name: name,
            path,
            parent: parent === 'root' ? null : parent,
            tag_color: faker.helpers.randomize(color),
            is_block: status,
        });

        await category.save();

        request.session.message = {
            status: 'success',
            content: 'Thêm thể loại thành công!',
        }

        return response.redirect('/admin/category');

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
        let { name, status, parent, id } = request.body;

        category = await ReviewCategory.findById(id);

        if (!category) {
            request.session.message = {
                status: 'error',
                content: 'Không tìm thấy thể loại',
            }

            return response.redirect('back');
        }

        parentCategory = await ReviewCategory.findOne({ parent: id });
        
        if(parentCategory) {
            request.session.message = {
                status: 'error',
                content: 'Menu này đang có menu con.',
            }

            return response.redirect('back');
        }
        
        if (parent !== 'root') {
            parentCategory = await ReviewCategory.findById(parent);
            category.path = (parentCategory.path || '') + faker.helpers.slugify(StringHelper.removeVietnameseTones(parentCategory.name.toLowerCase()));
        } else {
            category.path = '/';
        }

        category.name = name;
        category.short_name = name;
        category.parent = parent === 'root' ? null : parent;
        category.is_block = status;

        await category.save();

        request.session.message = {
            status: 'success',
            content: 'Cập nhật thể loại thành công!',
        }

        return response.redirect('/admin/category');

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
    updateStatusCategory,
    deleteCategory,
    getCreate,
    postCreate,
    postUpdate,
}