/* eslint-disable no-await-in-loop */
const {
  Product,
  Category,
  Image,
} = require('../models/index');

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      images,
      categories,
    } = req.body;
    if (!name || !description || !price || !stock || !images) return res.status(400).send('Error falta algún campo');
    const productCreated = await Product.create({
      name,
      description,
      price,
      stock,
    });
    for (let c = 0; c < categories.length; c += 1) {
      const categorie = await Category.findOne({
        where: {
          id: categories[c],
        },
      });
      await productCreated.addCategory(categorie);
    }
    for (let i = 0; i < images.length; i += 1) {
      const imageCreated = await Image.create({
        // url:images[i]   SE MODIFICA CUANDO ESTÉ EL FORMULARIO Y LA CONEXIÓN A LA API
        url: 'https://i.ibb.co/yd9Nxnm/imgnone.jpg',
      });
      await productCreated.addImage(imageCreated);
    }
    const resultado = await Product.findOne({
      where: {
        id: productCreated.id,
      },
      include: [
        {
          model: Category,
        },
        {
          model: Image,
        },
      ],
    });
    return res.status(201).json(resultado);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getSinlgeProduct = async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await Product.findByPk(idProduct);
    if (product === null) {
      return res.send('Product not Found');
    }
    return res.send(product);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  createProduct,
  getSinlgeProduct,
};
