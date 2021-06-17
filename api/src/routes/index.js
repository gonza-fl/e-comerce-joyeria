const {
  Router,
} = require('express');
const categoryRoutes = require('./category');
const product = require('./product');
const cart = require('./cart');

const router = Router();

router.use('/products', product);
router.use('/category', categoryRoutes);
router.use('/cart', cart);

router.get('/', (_req, res) => {
  res.send('Soy la Ruta principal');
});

module.exports = router;
