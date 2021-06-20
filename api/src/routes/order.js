const {
  Router,
} = require('express');
const {
  createOrFindAndUpdateCart, modifyOrder,
  vaciarCarro,
} = require('../controllers/order');

const router = Router();
router.post('/', createOrFindAndUpdateCart);
router.put('/:id', modifyOrder);
router.post('/empty', vaciarCarro);

module.exports = router;
