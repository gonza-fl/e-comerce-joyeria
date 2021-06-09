const { Router } = require('express');
const {
  addCategory,
  getCategory,
  updateCategory,
} = require('../controllers/category');

const router = Router();
router.post('/', addCategory);
router.get('/', getCategory);
router.put('/', updateCategory);

module.exports = router;
