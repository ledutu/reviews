const { ReviewCategory } = require('../models');
const { HTTP_STATUS } = require('../constant');
const { error } = require('../interfaces');

async function index(request, response) {
    try {
        categories = await ReviewCategory.find({ is_block: false })
            .select(['name', 'parent', 'path', 'tag_color', 'short_name'])
            .lean();

        return response.status(HTTP_STATUS.OK).json(categories)
    } catch (err) {
        console.error(err);
        return response.status(HTTP_STATUS.SERVER_ERROR).json(error());
    }
}

module.exports = {
    index,
}