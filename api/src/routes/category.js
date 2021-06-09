const { Router } = require('express');
const { addCategory } = require('../controllers/category');

const router = Router();
router.post('/', addCategory);

module.exports = router;