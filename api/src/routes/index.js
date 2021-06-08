const {Router} = require('express');
const categories = require("./categories")
const router = Router();

router.use("/categories",categories)

router.get('/', (req,res) => {
    //res.send('Soy la Ruta principal');
    res.json({a:'Soy la Ruta principal'});
})

module.exports = router 