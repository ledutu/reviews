const {
    User,
    Review,
    ReviewCategory,
    Tag,
    Comment,
    Reaction,
    History,
} = require('../../models');

const { HTTP_STATUS, ACTION } = require('../../constant');

async function index(request, response) {
    try {
        let { page, limit, title, category, tag, status, date_from, date_to } = request.query;

        let params = { title, category, date_from, date_to, tag, status };

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        user = request.user;

        reviews = Review.find({}, {}, { sort: { createdAt: -1 } });
        link = '?';

        let totalReview = Review.find({});

        if (title) {
            link += 'title=' + title + '&';
            reviews = reviews.where('title').equals({ $regex: new RegExp(title, 'i') });
            totalReview = totalReview.where('title').equals({ $regex: new RegExp(title, 'i') });
        }

        if (category) {
            if (typeof category === 'string') category = [category];
            category.map(item => {
                link += 'category=' + item + '&';
            });
            reviews = reviews.where('category').equals({ $in: category });
            totalReview = totalReview.where('category').equals({ $in: category });
        }

        if (tag) {
            if (typeof tag === 'string') tag = [tag];
            tag.map(item => {
                link += 'tag=' + item + '&';
            });
            reviews = reviews.where('tag').equals({ $in: tag });
            totalReview = totalReview.where('tag').equals({ $in: tag });
        }

        if (status) {
            let statusParam = {
                is_not_hide: {
                    title: 'is_hide',
                    status: false,
                },
                is_hide: {
                    title: 'is_hide',
                    status: true,
                },
                is_not_block: {
                    title: 'is_block',
                    status: false,
                },
                is_block: {
                    title: 'is_block',
                    status: true,
                },
                is_not_confirm: {
                    title: 'is_confirm',
                    status: false,
                },
                is_confirm: {
                    title: 'is_confirm',
                    status: true,
                },
            }
            link += 'status=' + status + '&';
            reviews = reviews.where(statusParam[status].title).equals(statusParam[status].status);
            totalReview = totalReview.where(statusParam[status].title).equals(statusParam[status].status);
        }

        if (date_from) {
            link += 'date_from=' + date_from + '&';
            date_from = date_from.split('/');
            date_from = new Date(date_from[2] + '-' + date_from[1] + '-' + date_from[0]);
            reviews = reviews.where('createdAt').equals({ $gte: date_from });
            totalReview = totalReview.where('createdAt').equals({ $gte: date_from });
        }

        if (date_to) {
            link += 'date_to=' + date_to + '&';
            date_to = date_to.split('/');
            date_to = new Date(date_to[2] + '-' + date_to[1] + '-' + date_to[0]);
            reviews = reviews.where('createdAt').equals({ $lte: date_to });
            totalReview = totalReview.where('createdAt').equals({ $lte: date_to });
        }

        reviews = await reviews
            .sort({ createdAt: -1 })
            .populate('reviewer', ['profile'])
            .populate('category', ['short_name', 'tag_color', 'name'])
            .skip((page * limit) - limit)
            .limit(limit)
            .lean();

        totalReview = await totalReview.countDocuments();

        const reviewPage = {
            data: reviews,
            total_page: Math.ceil(totalReview / limit),
            page,
            limit,
        }

        reviewCategories = await ReviewCategory.find({});
        reviewTags = await Tag.find({});

        return response.render('admin/review', {
            reviewPage,
            reviewCategories,
            reviewTags,
            params,
            link,
            totalReview,
        });

    } catch (err) {
        console.log(err);
        return response.render('500');
    }
}

async function updateStatusReview(request, response) {
    const { id, type } = request.body;
    try {
        user = request.user;
        review = await Review.findById(id)

        if (!review) {
            return response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Không tìm thấy bài review',
            });
        }
        review[type] = !review[type];

        title = '';
        message = '';

        if (type === 'is_hide') {
            title = ACTION.HIDE_REVIEW;
            message = (!review.is_hide ? 'Mở ẩn' : 'Ẩn') + ' bài ' + review._id + ' thành công';
        }
        else if (type === 'is_block') {
            title = ACTION.BLOCK_REVIEW;
            message = (!review.is_block ? 'Mở chặn' : 'Chặn') + ' bài ' + review._id + ' thành công';
        }
        else if (type === 'is_confirm') {
            title = ACTION.CONFIRM_REVIEW;
            message = (!review.is_confirm ? 'Tắt duyệt' : 'Duyệt') + ' bài ' + review._id + ' thành công';
        };

        await review.save();

        History.saveHistory(user, title, message);

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

async function deleteReview(request, response) {
    // Xóa reaction
    // Xóa comment
    // Xóa book
    const { id } = request.body;
    try {
        user = request.user;

        if (user.role !== 1) {
            return response.status(HTTP_STATUS.SERVER_ERROR).json({
                status: HTTP_STATUS.SERVER_ERROR,
                error: true,
                message: 'Bạn không có quyền để xóa bài này.',
            });
        }

        review = await Review.findById(id);
        if (!review) {
            response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Không tìm thấy bài review',
            });
        }

        await Comment.deleteMany({
            review: id,
        });

        await Reaction.deleteMany({
            review_id: id,
        });

        await review.delete();
        
        History.saveHistory(user, ACTION.DELETE_REVIEW, 'Xóa bài "' + review.title + '" thành công');
        
        return response.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            error: false,
            message: 'Xóa bài thành công',
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

        reviewCategories = await ReviewCategory.find({ is_block: false }).select(['name', 'tag_color']);
        tags = await Tag.find({ is_block: false }).select(['name', 'tag_color']);
        review = {};

        if (id) {
            review = await Review.findById(id);
        }

        return response.render('admin/create-review', {
            reviewCategories,
            review,
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

async function uploadImageTextEditor(request, response) {
    file = request.files[0];

    return response.status(200).json({
        status: 'OK',
        location: '/statics/uploads/users/' + request.user._id + '/reviews/' + file.filename,
    })
}

async function postCreate(request, response) {
    try {
        let { title, category, slug, content, summary, tag } = request.body;

        user = request.user;
        const BASE_URL = '/statics/uploads/users/' + user._id + '/reviews/';
        const image = BASE_URL + request.files[0].filename;

        review = new Review({
            title,
            content,
            summary,
            tag,
            reviewer: user._id,
            image,
            category,
            slug,
        });
        
        await review.save();
        
        History.saveHistory(user, ACTION.CREATE_REVIEW, 'Đăng bài ' + review._id + ' thành công');

        user.total_review += 1;
        await user.save();

        request.session.message = {
            status: 'success',
            content: 'Đăng bài thành công!',
        }

        return response.redirect('/admin/review');

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
        let { title, category, slug, content, summary, tag, id } = request.body;

        user = request.user;
        const BASE_URL = '/statics/uploads/users/' + user._id + '/reviews/';

        review = await Review.findById(id);

        if (!review) {
            request.session.message = {
                status: 'error',
                content: 'Không tìm thấy bài viết',
            }

            return response.redirect('back');
        }

        review.title = title;
        review.category = category;
        review.slug = slug;
        review.summary = summary;
        review.tag = tag;
        review.content = content;

        if (request.files.length > 0) {
            review.image = BASE_URL + request.files[0].filename;
        }
        
        History.saveHistory(user, ACTION.UPDATE_REVIEW, 'Cập nhật bài ' + review._id + ' thành công');

        await review.save();

        request.session.message = {
            status: 'success',
            content: 'Đăng bài thành công!',
        }

        return response.redirect('/admin/review');

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
    updateStatusReview,
    deleteReview,
    getCreate,
    uploadImageTextEditor,
    postCreate,
    postUpdate,
}