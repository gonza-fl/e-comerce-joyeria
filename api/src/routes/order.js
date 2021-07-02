const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart,
  modifyOrder,
  emptyCartOrProduct,
  getAllOrdersNotCart,
  getOrderById,
  testNodeMailer,
  modifyOrderFromCart,
} = require('../controllers/order');
const {
  postOrdersForAnalytics,
} = require('../controllers/analytics');
const {
  corroborarAdmin,
} = require('../helpers/middlewares');
const {
  testAddingOrdersForChart,
} = require('../controllers/test');

const router = Router();
router.post('/analytics', corroborarAdmin, postOrdersForAnalytics);
router.put('/test', testAddingOrdersForChart);
router.get('/', corroborarAdmin, getAllOrdersNotCart);
router.delete('/empty', emptyCartOrProduct);
router.post('/', createOrFindAndUpdateCart);
router.post('/test', testNodeMailer);
router.get('/:orderId', getOrderById);
router.put('/:id', corroborarAdmin, modifyOrder);
router.post('/:id', modifyOrderFromCart);

module.exports = router;
