var express = require('express');
var router = express.Router();
const { TagController } = require('../../controllers/admin');
const { Auth } = require('../../middlewares/admin');

/* GET users listing. */
router.get('/', TagController.index);

//api
router.put('/', Auth.isAdminApi, TagController.updateStatusTag);
router.delete('/', Auth.isAdminApi, TagController.deleteTag);

router.get('/create', TagController.getCreate);
router.post('/create', TagController.postCreate);
router.post('/update', TagController.postUpdate);

module.exports = router;
