const {
  Router,
} = require('express')
const {
  createProduct, getProducts, getSinlgeProduct, delProduct, getProductsByQuery, updateProduct,
} = require('../controllers/product')

const router = Router()

router.get('/search', getProductsByQuery)
router.get('/:idProduct', getSinlgeProduct)
router.get('/', getProducts)
router.post('/', createProduct)
router.put('/', updateProduct)
router.delete('/:idProduct', delProduct)

module.exports = router
