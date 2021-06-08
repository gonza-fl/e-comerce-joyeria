const {Router} = require('express');
const categories = require("./category_test")
const router = Router();

router.use("/products/category",categories)

router.get('/', (req,res) => {
    res.send('Soy la Ruta principal');
})

module.exports = router 