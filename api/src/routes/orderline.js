const {
  Router,
} = require('express');
const {
  getOrders,
} = require('../controllers/order');

const router = Router();
router.get('/', getOrders);

module.exports = router;
