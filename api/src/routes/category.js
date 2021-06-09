const { Router } = require('express');
const { 
    addCategory,
    getCategory 
} = require('../controllers/category');

const router = Router();
router.post('/', addCategory);
router.get('/', getCategory);

module.exports = router;