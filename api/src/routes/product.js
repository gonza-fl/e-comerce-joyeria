const {
  Router,
} = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  getProductsByQuery,
  updateProduct,
  getProductsByCategory,
} = require('../controllers/product');
const review = require('./review');

const router = Router();

router.use('/:idProduct/review', review);
router.get('/category/:id', getProductsByCategory);
router.get('/search', getProductsByQuery);
router.get('/:idProduct', getProductById);
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:idProduct', updateProduct);
router.delete('/:idProduct', deleteProduct);

module.exports = router;
