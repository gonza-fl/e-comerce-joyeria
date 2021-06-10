const { Router } = require('express');
const { createProduct, getSinlgeProduct } = require('../controllers/product');

const router = Router();

router.post('/', createProduct);
router.get('/:idProduct', getSinlgeProduct);

module.exports = router;
