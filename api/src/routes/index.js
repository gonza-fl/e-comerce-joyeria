const {
  Router,
} = require('express');
const categoryRoutes = require('./category');
const product = require('./product');
const order = require('./order');
const user = require('./user');
const banner = require('./banner');

const router = Router();

router.use('/products', product);
router.use('/banner', banner);
router.use('/category', categoryRoutes);
router.use('/order', order);
router.use('/user', user);
router.get('/', (_req, res) => {
  res.send('Soy la Ruta principal');
});

module.exports = router;
