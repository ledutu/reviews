const {
    Review,
    ReviewCategory,
} = require('../models');

const { HTTP_STATUS, HTTP_TEXT } = require('../constant');
const { error } = require('../interfaces');

async function getReviewWithCategory(request, response) {
    try {
        let { page, limit, category_id } = request.query;

        page = parseInt(page);
        limit = parseInt(limit)

        // if (!page) page = 1;
        // if (!limit) limit = 10;

        reviews = Review.find({
            is_confirm: true,
            is_hide: false,
        });
        let totalReview = Review.find({
            is_confirm: true,
            is_hide: false,
        });

        if (category_id) {
            reviews = reviews.where('category').equals(category_id);
            totalReview = reviews.where('category').equals(category_id);
            ReviewCategory.increaseVisited(category_id);
        }

        reviews = reviews
            .sort({ createdAt: -1 })
            .select(['-is_confirm', '-is_hide', '-is_block'])
            .populate('category', ['short_name', 'tag_color', 'name']);

        if (limit) {
            reviews = reviews
                .skip((page * limit) - limit)
                .limit(limit)
        }

        reviews = await reviews.lean();

        totalReview = await totalReview.countDocuments();

        const reviewPage = {
            data: reviews,
            total_page: Math.ceil(totalReview / limit),
            page,
            limit,
        }

        return response.status(HTTP_STATUS.OK).json(reviewPage);

    } catch (err) {
        console.log(err);
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error());
    }
}

async function getReviewDetail(request, response) {
    try {
        const { id } = request.params;

        review = await Review.findOne({
            _id: id,
            is_confirm: true,
            is_hide: false,
        }).select([
            '-is_confirm', '-is_hide', '-is_block'
        ]).populate('category', ['name', 'short_name', 'tag_color'])
            .populate('reviewer', ['profile']);

        if (!review) {
            let err = new Error();
            err.code = HTTP_TEXT.NOT_FOUND;
            throw err;
        }
        
        Review.increaseVisited(review._id);

        return response.status(HTTP_STATUS.OK).json(review);
    } catch (err) {
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error(err.code));
    }
}

function editReviewDetail(request, response) {

}

function deleteReviewDetail(request, response) {

}

module.exports = {
    getReviewWithCategory,
    getReviewDetail,
    editReviewDetail,
    deleteReviewDetail,
}