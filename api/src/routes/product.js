const { Router } = require('express');
const {Product,Category} = require('../models/index')
const router = Router();

router.post('/',async(req,res)=>{
    await CreateProduct(req.body,res)
})


const CreateProduct = async(body,res) =>{
    try{
        const {
            name,
            description,
            price,
            stock,
            images,
            categories
        } = body;
        if(!name || !description || !price || !stock || !images) return res.status(400).send('Error falta algún campo');
        const productCreated = await Product.create({
            name,
            description,
            price,
            stock
        })
       /*
        for (let c = 0; c < categories.length; c++) {
            const categorie = await Category.findOne({
                where:{
                    id:categories[c]
                }
            })
            await productCreated.addCategory(categorie)
        }
        for (let i = 0; i < images.length; i++) {
            const imageCreated = await Product.create({
                url:images.url
            })
            await productCreated.addImage(Image)
        }*/
        return res.status(201).json(productCreated)
    }
    catch(err){
        return res.status(400);
    }
}

module.exports = router;