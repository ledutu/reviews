const {
    ReviewCategory, History,
} = require('../../models');
var faker = require('faker');
const { HTTP_STATUS, ACTION } = require('../../constant');
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
                message: 'Kh??ng t??m th???y th??? lo???i',
            });
        }

        category[type] = !category[type];

        await category.save();

        History.saveHistory(
            user._id,
            ACTION.BLOCK_CATEGORY,
            (!category.is_block ? 'M??? ch???n' : 'Ch???n') + ' th??? lo???i ' + category._id + ' th??nh c??ng'
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

async function deleteCategory(request, response) {
    const { id } = request.body;
    try {
        category = await ReviewCategory.findById(id);

        if (!category) {
            response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Kh??ng t??m th???y th??? lo???i',
            });
        }

        await category.delete();

        History.saveHistory(user._id, ACTION.DELETE_CATEGORY, 'X??a th??? lo???i "' + category.name + '" th??nh c??ng');

        return response.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            error: false,
            message: 'X??a th??? lo???i th??nh c??ng',
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
            content: 'C?? l???i x???y ra, vui l??ng th??? l???i sau',
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
        
        History.saveHistory(user._id, ACTION.CREATE_CATEGORY, 'T???o th??? lo???i "' + category._id + '" th??nh c??ng');

        request.session.message = {
            status: 'success',
            content: 'Th??m th??? lo???i th??nh c??ng!',
        }

        return response.redirect('/admin/category');

    } catch (error) {
        console.log(error);

        request.session.message = {
            status: 'error',
            content: 'C?? l???i x???y ra, vui l??ng th??? l???i.',
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
                content: 'Kh??ng t??m th???y th??? lo???i',
            }

            return response.redirect('back');
        }

        parentCategory = await ReviewCategory.findOne({ parent: id });

        if (parentCategory) {
            request.session.message = {
                status: 'error',
                content: 'Menu n??y ??ang c?? menu con.',
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
        
        History.saveHistory(user._id, ACTION.CREATE_CATEGORY, 'C???p nh???t th??? lo???i "' + category._id + '" th??nh c??ng');

        request.session.message = {
            status: 'success',
            content: 'C???p nh???t th??? lo???i th??nh c??ng!',
        }

        return response.redirect('/admin/category');

    } catch (error) {
        console.log(error);

        request.session.message = {
            status: 'error',
            content: 'C?? l???i x???y ra, vui l??ng th??? l???i.',
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