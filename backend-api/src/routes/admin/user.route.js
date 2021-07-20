var express = require('express');
var router = express.Router();
const { UserController } = require('../../controllers/admin');
const { Auth } = require('../../middlewares/admin');

/* GET users listing. */
router.get('/', UserController.index);

//api
router.put('/', Auth.isAdminApi, UserController.updateStatusUser);
router.delete('/', Auth.isAdminApi, UserController.deleteUser);

router.get('/create', UserController.getCreate);
router.post('/create', UserController.postCreate);
router.post('/update', UserController.postUpdate);

module.exports = router;
