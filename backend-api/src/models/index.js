const { User } = require('./user.model');
const { Comment } = require('./comment.model');
const { History } = require('./history.model');
const { HistoryAction } = require('./history-action.model');
const { Reaction } = require('./reaction.model');
const { ReviewCategory } = require('./review-category.model');
const { Review } = require('./review.model');
const { Role } = require('./role.model');
const { AccessToken } = require('./access-token.model');

module.exports = {
    User,
    Comment,
    History,
    HistoryAction,
    Reaction,
    ReviewCategory,
    Review,
    Role,
    AccessToken
}


