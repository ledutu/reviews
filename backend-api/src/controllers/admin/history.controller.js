const { History, HistoryAction } = require("../../models");

async function index(request, response) {
    try {
        let { page, limit, user_id, action_name, date_from, date_to } = request.query;

        let params = { user_id, action_name, date_from, date_to };

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        user = request.user;

        histories = History.find({}, {}, { sort: { createdAt: -1 } });
        link = '?';

        let totalHistory = History.find({});

        if (user_id) {
            link += 'user_id=' + user_id + '&';
            histories = histories.where('user').equals(user_id);
            totalHistory = totalHistory.where('user').equals(user_id);
        }

        if (action_name) {
            if (typeof action_name === 'string') action_name = [action_name];
            action_name.map(item => {
                link += 'action_name=' + item + '&';
            });
            histories = histories.where('action_name').equals({ $in: action_name });
            totalHistory = totalHistory.where('action_name').equals({ $in: action_name });
        }
        
        if (date_from) {
            console.log(date_from)
            link += 'date_from=' + date_from + '&';
            date_from = date_from.split('/');
            date_from = new Date(date_from[2] + '-' + date_from[1] + '-' + date_from[0]);
            histories = histories.where('createdAt').equals({ $gte: date_from });
            totalHistory = totalHistory.where('createdAt').equals({ $gte: date_from });
        }

        if (date_to) {
            link += 'date_to=' + date_to + '&';
            date_to = date_to.split('/');
            date_to = new Date(date_to[2] + '-' + date_to[1] + '-' + date_to[0]);
            histories = histories.where('createdAt').equals({ $lte: date_to });
            totalHistory = totalHistory.where('createdAt').equals({ $lte: date_to });
        }

        histories = await histories
            .populate('user')
            .skip((page * limit) - limit)
            .limit(limit)
            .lean();

        totalHistory = await totalHistory.countDocuments();

        const historyPage = {
            data: histories,
            total_page: Math.ceil(totalHistory / limit),
            page,
            limit,
        }

        historyActions = await HistoryAction.find({});

        return response.render('admin/history', {
            historyPage,
            params,
            link,
            totalHistory,
            historyActions,
        });

    } catch (err) {
        console.error(err);
        return response.render('500');
    }
}

module.exports = {
    index
}