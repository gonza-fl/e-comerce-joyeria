const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart,
  vaciarCarro,
} = require('../controllers/order');

const router = Router();
router.post('/', createOrFindAndUpdateCart);
router.post('/empty', vaciarCarro);

module.exports = router;
