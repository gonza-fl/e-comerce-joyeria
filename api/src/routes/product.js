const { Router } = require('express');
const { CreateProduct } = require('../controllers/product');

const router = Router();

router.post('/', async (req, res) => {
  await CreateProduct(req.body, res);
});

module.exports = router;
