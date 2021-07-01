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
<<<<<<< HEAD

=======
>>>>>>> c862bebb38bff019450da0008f5fd3d7ecaed5a9
const {
  corroborarAdmin,
} = require('../helpers/middlewares');

const router = Router();
router.use('/:idProduct/review', review);
router.get('/category/:id', getProductsByCategory);
router.get('/search', getProductsByQuery);
router.get('/:idProduct', getProductById);
router.get('/', getProducts);
router.post('/', corroborarAdmin, createProduct);
router.put('/:idProduct', corroborarAdmin, updateProduct);
router.delete('/:idProduct', corroborarAdmin, deleteProduct);

module.exports = router;
