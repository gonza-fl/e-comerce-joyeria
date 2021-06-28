const {
  Router,
} = require('express');

const {
  corroborarAdmin,
} = require('../helpers/middlewares');

const {
  addCategory,
  getCategories,
  updateCategory,
  delCategory,
} = require('../controllers/category');

const router = Router();
router.post('/', corroborarAdmin, addCategory);
router.get('/', getCategories);
router.put('/', corroborarAdmin, updateCategory);
router.delete('/:categoryId', corroborarAdmin, delCategory);

module.exports = router;
