const { Router } = require('express');
const { CreateProduct } = require('../controllers/product');

const router = Router();

router.post('/', CreateProduct);

module.exports = router;
