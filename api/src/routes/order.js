const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart, modifyOrder,
  emptyCartOrProduct, getOrders, getOrderById, testNodeMailer,
} = require('../controllers/order');
const {
  getOrdersForAnalytics,
} = require('../controllers/analytics');
const {
  corroborarAdmin,
} = require('../helpers/middlewares');

const router = Router();
router.get('/:orderId', getOrderById);
router.get('/', getOrders);
router.get('/analytics', getOrdersForAnalytics);
router.put('/:id', corroborarAdmin, modifyOrder);
router.delete('/empty', emptyCartOrProduct);
router.post('/', createOrFindAndUpdateCart);
router.post('/test', testNodeMailer);

module.exports = router;
