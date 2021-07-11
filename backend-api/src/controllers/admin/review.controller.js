const {
    User,
    Review,
    ReviewCategory
} = require('../../models');

async function index(request, response) {
    try {
        let { page, limit, title, category, date_from, date_to } = request.query;
        
        let params = { title, category, date_from, date_to };

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;
        
        user = request.user;

        reviews = Review.find({
            is_confirm: true,
            is_hide: false,
        }, {}, {sort: {createdAt: -1}});
        link = '?';
        
        let totalReview = Review.find({
            is_confirm: true,
            is_hide: false,
        });

        // if (category_id) {
        //     reviews = reviews.where('category').equals(category_id);
        //     totalReview = reviews.where('category').equals(category_id);
        // }

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

        return response.render('admin/review', {
            reviewPage,
            reviewCategories,
            params,
            link,
            totalReview,
        });

    } catch (err) {
        console.log(err);
        return response.render('500');
    }
}

module.exports = {
    index,
}