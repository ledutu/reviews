const {
    User,
    Review,
    ReviewCategory,
    Tag,
    Comment,
    Reaction,
    History,
} = require('../../models');
const fs = require('fs');
const sharp = require('sharp');

const { HTTP_STATUS, ACTION } = require('../../constant');

async function index(request, response) {
    try {
        let { page, limit, title, category, tag, status, date_from, date_to, _id } = request.query;

        let params = { title, category, date_from, date_to, tag, status, _id };

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        user = request.user;

        reviews = Review.find({}, {}, { sort: { createdAt: -1 } });
        link = '?';

        let totalReview = Review.find({});

        if (user.role === 2) {
            reviews = reviews.where('reviewer').equals(user._id);
            totalReview = totalReview.where('reviewer').equals(user._id);
        }

        if (_id) {
            link += '_id=' + _id + '&';
            reviews = reviews.where('_id').equals(_id);
            totalReview = totalReview.where('_id').equals(_id);
        }

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
                message: 'Kh??ng t??m th???y b??i review',
            });
        }
        review[type] = !review[type];

        title = '';
        message = '';

        if (type === 'is_hide') {
            title = ACTION.HIDE_REVIEW;
            message = (!review.is_hide ? 'M??? ???n' : '???n') + ' b??i ' + review._id + ' th??nh c??ng';
        }
        else if (type === 'is_block') {
            title = ACTION.BLOCK_REVIEW;
            message = (!review.is_block ? 'M??? ch???n' : 'Ch???n') + ' b??i ' + review._id + ' th??nh c??ng';
        }
        else if (type === 'is_confirm') {
            title = ACTION.CONFIRM_REVIEW;
            message = (!review.is_confirm ? 'T???t duy???t' : 'Duy???t') + ' b??i ' + review._id + ' th??nh c??ng';
        };

        await review.save();

        History.saveHistory(user._id, title, message);

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

async function deleteReview(request, response) {
    // X??a reaction
    // X??a comment
    // X??a book
    const { id } = request.body;
    try {
        user = request.user;

        if (user.role !== 1) {
            return response.status(HTTP_STATUS.SERVER_ERROR).json({
                status: HTTP_STATUS.SERVER_ERROR,
                error: true,
                message: 'B???n kh??ng c?? quy???n ????? x??a b??i n??y.',
            });
        }

        review = await Review.findById(id);
        if (!review) {
            response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Kh??ng t??m th???y b??i review',
            });
        }

        await Comment.deleteMany({
            review: id,
        });

        await Reaction.deleteMany({
            review_id: id,
        });

        await review.delete();

        History.saveHistory(user._id, ACTION.DELETE_REVIEW, 'X??a b??i "' + review.title + '" th??nh c??ng');

        return response.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            error: false,
            message: 'X??a b??i th??nh c??ng',
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
            content: 'C?? l???i x???y ra, vui l??ng th??? l???i sau',
        }

        return response.redirect('back');
    }
}

async function uploadImageTextEditor(request, response) {
    file = request.files[0];
    await sharp(request.files[0].path)
        .resize(720, 405)
        .png({ quality: 90 })
        .toFile('./src/public/statics/uploads/users/' + request.user._id + '/reviews/' + 'resize-' + request.files[0].filename);

    fs.unlinkSync(request.files[0].path);

    return response.status(200).json({
        status: 'OK',
        location: '/statics/uploads/users/' + request.user._id + '/reviews/' + 'resize-' + file.filename,
    })
}

async function postCreate(request, response) {
    try {
        let { title, category, slug, content, summary, tag, is_schedule, created_at } = request.body;

        user = request.user;
        const BASE_URL = '/statics/uploads/users/' + user._id + '/reviews/';
        // var path = './src/public/statics/uploads/users/'+req.user._id+'/reviews';
        await sharp(request.files[0].path)
            .resize(720, 405)
            .png({ quality: 90 })
            .toFile('./src/public/statics/uploads/users/' + user._id + '/reviews/' + 'resize-' + request.files[0].filename);

        fs.unlinkSync(request.files[0].path);

        const image = BASE_URL + 'resize-' + request.files[0].filename;

        review = new Review({
            title,
            content,
            summary,
            tag,
            reviewer: user._id,
            image,
            category,
            is_schedule: is_schedule ? true : false,
            slug,
        });

        if (is_schedule) {
            if (created_at) {
                created_at = created_at.split(' ');
                let date = created_at[0].split('/');
                let time = created_at[1];

                let dateResult = new Date(`${date[2]}-${date[1]}-${date[0]} ${time}`);

                review.createdAt = dateResult;
            }
        }

        await review.save();

        History.saveHistory(user._id, ACTION.CREATE_REVIEW, '????ng b??i ' + review._id + ' th??nh c??ng');

        user.total_review += 1;
        await user.save();

        request.session.message = {
            status: 'success',
            content: '????ng b??i th??nh c??ng!',
        }

        return response.redirect('/admin/review');

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
        let { title, category, slug, content, summary, tag, id } = request.body;

        user = request.user;
        const BASE_URL = '/statics/uploads/users/' + user._id + '/reviews/';

        review = await Review.findById(id);

        if (!review) {
            request.session.message = {
                status: 'error',
                content: 'Kh??ng t??m th???y b??i vi???t',
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
            await sharp(request.files[0].path)
                .resize(720, 405)
                .png({ quality: 90 })
                .toFile('./src/public/statics/uploads/users/' + user._id + '/reviews/' + 'resize-' + request.files[0].filename);

            fs.unlinkSync(request.files[0].path);
            review.image = BASE_URL + 'resize-' + request.files[0].filename;
        }

        History.saveHistory(user._id, ACTION.UPDATE_REVIEW, 'C???p nh???t b??i ' + review._id + ' th??nh c??ng');

        await review.save();

        request.session.message = {
            status: 'success',
            content: '????ng b??i th??nh c??ng!',
        }

        return response.redirect('/admin/review');

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
    updateStatusReview,
    deleteReview,
    getCreate,
    uploadImageTextEditor,
    postCreate,
    postUpdate,
}