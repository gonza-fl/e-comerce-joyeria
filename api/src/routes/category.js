const {
  Router,
} = require('express');
const {
  addCategory,
  getCategories,
  updateCategory,
  delCategory,
} = require('../controllers/category');

const router = Router();
router.post('/', addCategory);
router.get('/', getCategories);
router.put('/', updateCategory);
router.delete('/:categoryId', delCategory);

module.exports = router;
