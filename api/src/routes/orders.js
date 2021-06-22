const {
  Router,
} = require('express');
const {
  getSingleOrder,
} = require('../controllers/orders');

const router = Router();
router.get('/:orderId', getSingleOrder);

module.exports = router;
