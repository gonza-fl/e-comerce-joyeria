const { Router } = require('express');
const {
    Product,
    Category,
    Image
} = require('../models/index')
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
        for (let c = 0; c < categories.length; c++) {
            const categorie = await Category.findOne({
                where:{
                    id:categories[c]
                }
            })
            await productCreated.addCategory(categorie) 
        }
        for (let i = 0; i < images.length; i++) {
            const imageCreated = await Image.create({
                //url:images[i]   SE MODIFICA CUANDO ESTÉ EL FORMULARIO Y LA CONEXIÓN A LA API
                url:"https://i.ibb.co/yd9Nxnm/imgnone.jpg"
            })
            await productCreated.addImage(imageCreated)
        }
        const resultado = await Product.findOne({
            where:{
                id:productCreated.id
            },
            include:[
                {
                    model:Category
                },
                {
                    model:Image
                }
            ]
        })
        return res.status(201).json(resultado)
    }
    catch(err){
        console.log(err)
        return res.status(400).json(err);
    }
}


module.exports = router;