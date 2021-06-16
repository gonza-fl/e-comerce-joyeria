const {
  Router,
} = require('express');
const {
  getOrderLines,
} = require('../controllers/orderline');

const router = Router();
router.get('/', getOrderLines);

module.exports = router;
