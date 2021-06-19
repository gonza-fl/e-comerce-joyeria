const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart, modifyOrder,
} = require('../controllers/order');

const router = Router();
router.post('/', createOrFindAndUpdateCart);
router.put('/:id', modifyOrder);
module.exports = router;
