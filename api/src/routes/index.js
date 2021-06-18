const {
  Router,
} = require('express');
const categoryRoutes = require('./category');
const product = require('./product');
const cart = require('./cart');
const user = require('./user');

const router = Router();

router.use('/products', product);
router.use('/category', categoryRoutes);
router.use('/cart', cart);
router.use('/user', user);
router.get('/', (_req, res) => {
  res.send('Soy la Ruta principal');
});

module.exports = router;
