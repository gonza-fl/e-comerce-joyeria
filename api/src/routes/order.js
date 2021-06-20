const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart, modifyOrder,
  emptyCartOrProduct, getOrders, getOrderById,
} = require('../controllers/order');

const router = Router();
router.get('/:orderId', getOrderById);
router.get('/', getOrders);
router.put('/:id', modifyOrder);
router.delete('/empty', emptyCartOrProduct);
router.post('/', createOrFindAndUpdateCart);

module.exports = router;
