const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart, modifyOrder,
  emptyCartOrProduct, getOrders, getOrderById, testNodeMailer,
} = require('../controllers/order');

const router = Router();
router.get('/:orderId', getOrderById);
router.get('/', getOrders);
router.put('/:id', modifyOrder);
router.delete('/empty', emptyCartOrProduct);
router.post('/', createOrFindAndUpdateCart);
router.post('/test', testNodeMailer);

module.exports = router;
