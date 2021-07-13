var express = require('express');
var router = express.Router();
const { CategoryController } = require('../../controllers/admin');
const { Auth } = require('../../middlewares/admin');

/* GET users listing. */
router.get('/', CategoryController.index);

//api
router.put('/', Auth.isAdminApi, CategoryController.updateStatusCategory);
router.delete('/', Auth.isAdminApi, CategoryController.deleteCategory);

router.get('/create', CategoryController.getCreate);
router.post('/create', CategoryController.postCreate);
router.post('/update', CategoryController.postUpdate);

module.exports = router;
