const { Router } = require('express');
const { CreateProduct, GetProducts } = require('../controllers/product');

const router = Router();

router.post('/', CreateProduct);
router.get('/', GetProducts);

module.exports = router;
