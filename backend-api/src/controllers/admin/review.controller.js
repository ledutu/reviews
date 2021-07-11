const {
    User,
    Review,
    ReviewCategory,
    Tag,
} = require('../../models');

const { HTTP_STATUS } = require('../../constant');

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
            link += 'date_from=' + date_to + '&';
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
        review = await Review.findById(id);

        if (!review) {
            return response.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                error: true,
                message: 'Không tìm thấy bài review',
            });
        }
        review[type] = !review[type];

        await review.save();

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

}

module.exports = {
    index,
    updateStatusReview,
    deleteReview,
}