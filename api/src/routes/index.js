const {
  Router,
} = require('express');
const categoryRoutes = require('./category');
const product = require('./product');
<<<<<<< HEAD
<<<<<<< HEAD
const orderRoutes = require('./orders');
=======
const cart = require('./cart');
=======
const order = require('./order');
>>>>>>> 8a73eec87356a742376c675df79cd47a9da68a23
const user = require('./user');
>>>>>>> 9abb85abd2dbf2de9a1cbb325da42aa3e45e6486

const router = Router();

router.use('/products', product);
router.use('/category', categoryRoutes);
<<<<<<< HEAD
<<<<<<< HEAD
router.use('/orders', orderRoutes);

=======
router.use('/cart', cart);
=======
router.use('/order', order);
>>>>>>> 8a73eec87356a742376c675df79cd47a9da68a23
router.use('/user', user);
>>>>>>> 9abb85abd2dbf2de9a1cbb325da42aa3e45e6486
router.get('/', (_req, res) => {
  res.send('Soy la Ruta principal');
});

module.exports = router;
