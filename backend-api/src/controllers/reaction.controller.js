const {
    Comment,
    Review,
    Reaction,
} = require('../models');

const { HTTP_STATUS, HTTP_TEXT } = require('../constant');
const { error } = require('../interfaces');

async function rate(request, response) {
    try {
        const { review_id } = request.params;
        let { rate } = request.body;

        rate = parseInt(rate);

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

        let reaction = await Reaction.findOne({
            user: user._id,
            review_id: review_id,
        });

        if (!reaction) {
            reaction = new Reaction();
        }

        reaction.user = user._id;
        reaction.rate = rate;
        reaction.review_id = review_id;
        await reaction.save();
        
        //Calculate Rating
        let newRate = await calculateRating(review_id);

        return response.status(HTTP_STATUS.OK).json({
            code: 'OK',
            new_rate: newRate,
        });
    } catch (err) {
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error(err.code, err.message));
    }
}

/**
 * @function calculateRating
 */
async function calculateRating(id) {
    review = await Review.findById(id).select(['rate']);
    let mean = await getMean(review._id);
    review.rate = mean;
    await review.save();
    
    return mean;
}

/**
 * @function getMean
 * @param {ObjectId} id 
 * @return mean,
 */
async function getMean(id) {
    reactions = await Reaction.find({ review_id: id }).select(['rate']);

    let total = 0;
    reactions.forEach(reaction => {
        total += reaction.rate;
    });

    mean = 0;
    if (reactions.length) {
        mean = total / reactions.length;
    }

    return mean.toFixed(2);
}

module.exports = {
    rate,
}