var faker = require('faker');
var bcrypt = require('bcrypt');
const {
    AccessToken,
    Comment,
    History,
    HistoryAction,
    Reaction,
    Review,
    ReviewCategory,
    Role,
    User,
} = require('../models');

/**
 * @function createUserDatabaseSeed
 * @param {number} times 
 * @param {string} language
 * @return {Object} users, profiles
 */
function createUserDatabaseSeed(times = 5, language) {
    if (language) {
        faker.locale = language;
    }
    users = [];
    profiles = [];

    for (let i = 0; i < times; i++) {
        //Create profile
        genders = ['men', 'women', 'third']
        random = Math.floor(Math.random() * 3);

        let profile = {
            username: faker.internet.userName().toLowerCase(),
            full_name: faker.name.findName(),
            address: faker.address.city(),
            gender: genders[random],
            image: faker.internet.avatar(),
            birthday: faker.date.past(),
        }

        let password = faker.internet.password(6).toLowerCase();
        let hashPassword = bcrypt.hashSync(password, 12);
        let user = new User({
            email: faker.internet.email().toLowerCase(),
            password: hashPassword,
            password_not_hash: password,
            profile,
        })
        users = [...users, user];
    }

    return { users, profiles };
}

/**
 * @function createReviewDatabaseSeed
 * @param {number} times 
 * @param {string} language
 * @return {Object} reviews
 */
async function createReviewDatabaseSeed(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    reviews = [];
    const users = await User.find({}).select('_id').limit(times);
    const reviewCategories = await ReviewCategory.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        _id = faker.helpers.randomize(users)._id
        category_id = faker.helpers.randomize(reviewCategories)._id

        currentUser = await User.findById(_id).select('total_review');
        currentUser.total_review += 1;
        currentUser.save();
        title = faker.name.title();
        let review = new Review({
            title,
            content: faker.lorem.paragraphs(20),
            reviewer: _id,
            image: faker.image.image(720, 405),
            category: category_id,
            slug: faker.helpers.slugify(title.toLowerCase()),
            tags: [],
            is_confirm: true,
        });

        reviews = [...reviews, review];
    }

    return { reviews };
}

/**
 * @function createReviewCategory
 * @param {number} times 
 * @param {string} language
 * @return {Object} bookCategories
 */
function createReviewCategory(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    reviewCategories = [];

    const color = ['blue', 'green', 'yell', 'orange'];

    for (let i = 0; i < times; i++) {
        let word = faker.random.word()
        let category = new ReviewCategory({
            name: word,
            tag_color: faker.helpers.randomize(color),
            short_name: word,
        });

        reviewCategories = [...reviewCategories, category];
    }

    return { reviewCategories };
}

/**
 * @function createReviewTag
 * @param {number} times 
 * @param {string} language
 * @return {Object} bookCategories
 */
function createReviewTag(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    reviewTags = [];

    const color = ['blue', 'green', 'yell', 'orange'];

    for (let i = 0; i < times; i++) {
        let word = faker.random.word()
        let tag = new ReviewCategory({
            name: word,
            tag_color: faker.helpers.randomize(color),
        });

        reviewTags = [...reviewTags, tag];
    }

    return { reviewTags };
}

/**
 * @function createComment
 * @param {number} times 
 * @param {string} language
 * @return {Object} comments
 */
async function createComment(times = 5, language) {
    if (language) {
        faker.locale = language;
    }
    comments = [];

    const users = await User.find({}).select('_id').limit(times);
    const reviews = await Review.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        _id = faker.helpers.randomize(users)._id;
        review_id = faker.helpers.randomize(reviews)._id

        let comment = new Comment({
            user: _id,
            content: faker.lorem.sentence(),
            review: review_id,
        });

        comments = [...comments, comment];
    }

    return { comments };
}

/**
 * @function createReaction
 * @param {number} times 
 * @param {string} language
 * @return {Object} reactions
 */
async function createReaction(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    reactions = [];

    const users = await User.find({}).select('_id').limit(times);
    const reviews = await Review.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        _id = faker.helpers.randomize(users)._id;
        review_id = faker.helpers.randomize(reviews)._id;
        rate = faker.helpers.randomize([1, 2, 3, 4, 5]);
        
        vote = await Reaction.findOne({
            user: _id,
            review_id: review_id,
        });
        
        if(vote) continue;

        let reaction = new Reaction({
            rate,
            user: _id,
            review_id: review_id,
        });

        reactions = [...reactions, reaction];
    }
    
    return { reactions };
}

/**
 * @function calculateRating
 */
async function calculateRating() {
    reviews = await Review.find({}).select(['rate']);

    reviews.forEach(async review => {
        let mean = await getMean(review._id);
        review.rate = mean;
        await review.save();
    });
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

const Seeder = {
    createUserDatabaseSeed,
    createReviewDatabaseSeed,
    createReviewCategory,
    createComment,
    createReviewTag,
    createReaction,
    calculateRating,
    getMean,
}

module.exports = Seeder