const { Router } = require('express');
const { createProduct, getProducts, getSinlgeProduct } = require('../controllers/product');

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:idProduct', getSinlgeProduct);

module.exports = router;
