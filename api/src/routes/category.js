const {
  Router,
} = require('express');
const {
  addCategory,
  getCategory,
  updateCategory,
  delCategory,
} = require('../controllers/category');

const router = Router();
router.post('/', addCategory);
router.get('/', getCategory);
router.put('/', updateCategory);
router.delete('/:categoryId', delCategory);

module.exports = router;
