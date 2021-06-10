/* eslint-disable no-await-in-loop */
/* eslint radix: ["error", "as-needed"] */
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
      stockAmount,
      // images,
      categories,
    } = req.body;
    if (!name || !description || !price || !stockAmount) return res.status(400).send('Error falta algún campo');
    const productCreated = await Product.create({
      name,
      description,
      price: parseInt(price),
      stockAmount: parseInt(stockAmount),
    });
    for (let c = 0; c < categories.length; c += 1) {
      const categorie = await Category.findOne({
        where: {
          id: parseInt(categories[c]),
        },
      });
      await productCreated.addCategory(categorie);
    }

    const imageCreated = await Image.create({
    // url:images[i]   SE MODIFICA CUANDO ESTÉ EL FORMULARIO Y LA CONEXIÓN A LA API
      url: 'https://i.ibb.co/yd9Nxnm/imgnone.jpg',
    });
    await productCreated.addImage(imageCreated);
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

const getProducts = async (_req, res) => {
  try {
    const response = await Product.findAll();
    if (!response.length) return res.status(400).json('Products not founded');
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal server error');
  }
};

const getSinlgeProduct = async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await Product.findByPk(idProduct);
    if (product === null) {
      return res.status(400).json('Product not Found');
    }
    return res.send(product);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getSinlgeProduct,
};
