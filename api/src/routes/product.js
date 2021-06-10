const { Router } = require('express');
const {
  createProduct, getProducts, getSinlgeProduct, delProduct,
} = require('../controllers/product');

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:idProduct', getSinlgeProduct);
router.delete('/:idProduct', delProduct);

module.exports = router;
