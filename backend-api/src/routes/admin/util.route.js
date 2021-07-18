var express = require('express');
var router = express.Router();
const { UtilController } = require('../../controllers/admin');

/* GET home page. */
router.get('/delete-message-session', UtilController.deleteMessageSession);
router.get('/update-history-action', UtilController.updateHistoryAction);

module.exports = router;
