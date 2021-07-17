const { ReviewCategory } = require('../models');
const { HTTP_STATUS } = require('../constant')

async function index(request, response) {

    categories = await ReviewCategory.find({ is_block: false })
        .select(['name', 'parent', 'path', 'tag_color', 'short_name'])
        .lean();

    return response.status(HTTP_STATUS.OK).json(categories)

}

module.exports = {
    index,
}