const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart, modifyOrder,
  emptyCartOrProduct,
} = require('../controllers/order');

const router = Router();
router.put('/:id', modifyOrder);
router.delete('/empty', emptyCartOrProduct);
router.post('/', createOrFindAndUpdateCart);

module.exports = router;
