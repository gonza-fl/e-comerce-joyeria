const { Router } = require('express');
const { addCategory, delCategory } = require('../controllers/category');

const router = Router();
router.post('/', addCategory);
router.delete("/:categoryId", delCategory)

module.exports = router;