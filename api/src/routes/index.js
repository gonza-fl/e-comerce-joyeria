const {Router} = require('express');
const categoryRoutes = require('./category');
const product = require('./product')
const router = Router();

router.use('/products',product);
router.use('/category', categoryRoutes);

router.get('/', (req,res) => {
    res.send('Soy la Ruta principal');
})

module.exports = router;
