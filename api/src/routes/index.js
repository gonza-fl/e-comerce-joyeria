/* eslint linebreak-style: ["error", "windows"] */
const {
  Router,
} = require('express');
const categoryRoutes = require('./category');
const product = require('./product');
const orderRoutes = require('./orders');

const router = Router();

router.use('/products', product);
router.use('/category', categoryRoutes);
router.use('/orders', orderRoutes);

router.get('/', (_req, res) => {
  res.send('Soy la Ruta principal');
});

module.exports = router;
