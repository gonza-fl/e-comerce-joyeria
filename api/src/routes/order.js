const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart,
} = require('../controllers/order');

const router = Router();
router.post('/', createOrFindAndUpdateCart);

module.exports = router;
