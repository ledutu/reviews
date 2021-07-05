const {
    Comment,
    Review,
} = require('../models');

const { HTTP_STATUS, HTTP_TEXT } = require('../constant');
const { error } = require('../interfaces');

async function getComment(request, response) {
    try {
        const { review_id } = request.params;
        let { page, limit } = request.query;

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 5;

        let review = await Review.findOne({
            _id: review_id,
            is_confirm: true,
            is_hide: false,
        }).select(['_id']);

        if (!review) {
            let err = new Error();
            err.code = HTTP_TEXT.NOT_FOUND;
            err.message = 'Review not found';
            throw err;
        }

        comments = await Comment.find({ review: review_id }, {}, { sort: { createdAt: -1 } })
            .select(['-like', '-dislike', '-is_hide'])
            .populate('user', ['profile'])
            .skip((page * limit) - limit)
            .limit(limit);

        totalComment = await Comment.find({ review: review_id })
            .select(['_id']).countDocuments();

        const commentPage = {
            data: comments,
            total_page: Math.ceil(totalComment / limit),
            page,
            limit,
        }

        return response.status(HTTP_STATUS.OK).json(commentPage);
    } catch (err) {
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error(err.code, err.message));
    }
}

async function postComment(request, response) {
    try {
        const { review_id } = request.params;
        let { content } = request.body;

        user = request.user;

        let review = await Review.findOne({
            _id: review_id,
            is_confirm: true,
            is_hide: false,
        }).select(['_id']);

        if (!review) {
            let err = new Error();
            err.code = HTTP_TEXT.NOT_FOUND;
            err.message = 'Review not found';
            throw err;
        }

        let comment = new Comment({
            user: user._id,
            content,
            review: review_id,
        });

        await comment.save();

        return response.status(HTTP_STATUS.OK).json({
            code: 'OK',
        });

    } catch (err) {
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error(err.code, err.message));
    }
}

async function putComment(request, response) {
    try {
        const { review_id } = request.params;
        let { content, comment_id } = request.body;

        let review = await Review.findOne({
            _id: review_id,
            is_confirm: true,
            is_hide: false,
        }).select(['_id']);

        if (!review) {
            let err = new Error();
            err.code = HTTP_TEXT.NOT_FOUND;
            err.message = 'Review not found';
            throw err;
        }

        let comment = await Comment.findById(comment_id)
            .select(['-like', '-dislike', '-is_hide']);
        if (!comment) {
            let err = new Error();
            err.code = HTTP_TEXT.NOT_FOUND;
            err.message = 'Comment not found';
            throw err;
        }

        comment.content = content;

        await comment.save();

        return response.status(HTTP_STATUS.OK).json(comment);

    } catch (err) {
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error(err.code, err.message));
    }
}

async function deleteComment(request, response) {
    try {
        const { review_id } = request.params;
        let { comment_id } = request.body;

        let review = await Review.findOne({
            _id: review_id,
            is_confirm: true,
            is_hide: false,
        }).select(['_id']);

        if (!review) {
            let err = new Error();
            err.code = HTTP_TEXT.NOT_FOUND;
            err.message = 'Review not found';
            throw err;
        }

        let comment = await Comment.findById(comment_id)
            .select(['-like', '-dislike', '-is_hide']);
        if (!comment) {
            let err = new Error();
            err.code = HTTP_TEXT.NOT_FOUND;
            err.message = 'Comment not found';
            throw err;
        }

        await comment.delete();

        return response.status(HTTP_STATUS.OK).json({
            code: 'OK',
        });
    } catch (err) {
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error(err.code, err.message));
    }
}

module.exports = {
    getComment,
    postComment,
    putComment,
    deleteComment,
}