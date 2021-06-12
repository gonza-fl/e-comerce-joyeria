const {
  Router,
} = require('express');
const {
  createProduct,
  getProducts,
  getSinlgeProduct,
  delProduct,
  getProductsByQuery,
  updateProduct,
  getProductsByCategory,
} = require('../controllers/product');

const router = Router();

router.get('/search', getProductsByQuery);
router.get('/:idProduct', getSinlgeProduct);
router.get('/category', getProductsByCategory);
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:idProduct', updateProduct);
router.delete('/:idProduct', delProduct);

module.exports = router;
