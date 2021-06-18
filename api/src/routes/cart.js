const {
  Router,
} = require('express');
const {
  addItem,
} = require('../controllers/cart');

const router = Router();
router.post('/', addItem);

module.exports = router;
