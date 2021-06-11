const { Router } = require('express');
const {
  createProduct, getProducts, getSinlgeProduct, delProduct, getProductsByQuery,
} = require('../controllers/product');

const router = Router();

router.get('/search', getProductsByQuery);
router.get('/:idProduct', getSinlgeProduct);
router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:idProduct', delProduct);

module.exports = router;
