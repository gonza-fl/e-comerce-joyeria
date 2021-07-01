const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart, modifyOrder,
  emptyCartOrProduct, getAllOrdersNotCart, getOrderById, testNodeMailer,
} = require('../controllers/order');
const {
  postOrdersForAnalytics,
} = require('../controllers/analytics');
const {
  corroborarAdmin,
} = require('../helpers/middlewares');

const router = Router();
router.post('/analytics', corroborarAdmin, postOrdersForAnalytics);
router.get('/:orderId', getOrderById);
router.get('/', corroborarAdmin, getAllOrdersNotCart);
router.put('/:id', corroborarAdmin, modifyOrder);
router.delete('/empty', emptyCartOrProduct);
router.post('/', createOrFindAndUpdateCart);
router.post('/test', testNodeMailer);

module.exports = router;
