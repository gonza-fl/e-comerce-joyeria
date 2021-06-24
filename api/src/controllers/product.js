/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint radix: ["error", "as-needed"] */
const {
  Op,
} = require('sequelize');
const {
  searchProductF, updateCategories, updateImages, deleteImages,
} = require('../helpers/productHelpers');
const {
  cloudinary,
} = require('../utils/cloudinary');
const {
  verifyNumber,
  verifyArray,
} = require('../helpers/functionHelpers');
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
      image,
      categories,
    } = req.body;
    if (
      !name.trim() || !description.trim() || !verifyNumber(price).veracity || !verifyNumber(stockAmount).veracity
      || !verifyArray(categories) || !image
    ) return res.status(400).send('Error falta algún campo');
    const productCreated = await Product.create({
      name,
      description,
      price: parseFloat(price),
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
    if (image) {
      for (let i = 0; i < image.length; i++) {
        const uploadedResponse = (image[i] !== 'test' && await cloudinary.uploader.upload(image[i], {
          upload_preset: 'henry',
        }));
        const imageCreated = await Image.create({
          url: uploadedResponse.secure_url,
        });
        await productCreated.addImage(imageCreated);
      }
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

const getProducts = async (_req, res) => {
  try {
    const response = await Product.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Image,
        },
      ],
    });
    if (!response.length) return res.status(400).send('Products not found');
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json('Internal server error');
  }
};

const getSinlgeProduct = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  try {
    const product = await Product.findByPk(idProduct, {
      include: [
        {
          model: Category,
        },
        {
          model: Image,
        },
      ],
    });
    if (product === null) return res.status(400).send('Product not Found');
    return res.json(product);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const delProduct = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  try {
    await deleteImages(idProduct);
    const product = await Product.destroy({
      where: {
        id: idProduct,
      },
    });
    if (!product) return res.status(400).send('Product not Found');

    return res.status(200).json('Product deleted');
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getProductsByQuery = async (req, res) => {
  const {
    name,
  } = req.query;
  if (!name) return res.status(400).send('There was no query sent');
  try {
    const productsFound = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
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
    if (productsFound.length === 0) return res.status(400).send('No products found with that query name');
    return res.json(productsFound);
  } catch {
    return res.status(500).send('Internal server error');
  }
};

const updateProduct = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  let {
    name, description, stockAmount, price, categories, images,
  } = req.body;

  try {
    if (!name) name = undefined;
    if (!description) description = undefined;
    const searchProduct = await searchProductF(idProduct);
    if (!searchProduct) return res.status(404).send('No se encontro el producto.');
    const stock = (verifyNumber(stockAmount).veracity ? parseInt(stockAmount) : undefined);
    const priceVar = (verifyNumber(price).veracity ? parseFloat(price) : undefined);
    await Product.update({
      name,
      description,
      stockAmount: stock,
      price: priceVar,
    }, {
      where: {
        id: idProduct,
      },
    });
    const haveError = await updateCategories(searchProduct, categories);
    if (!haveError) return res.status(400).send('Hay campos erroneos');
    await updateImages(searchProduct, images, idProduct);
    return res.status(200).json(await searchProductF(idProduct));
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getProductsByCategory = async (req, res) => {
  let {
    id,
  } = req.params;
  id = parseInt(id);

  if (typeof id !== 'number') return res.status(404).send('El id no es de tipo númerico');
  try {
    const response = await Product.findAll({
      include: [{
        model: Category,
        where: {
          id,
        },
      }, {
        model: Image,
      }],
    });
    if (response.length === 0) return res.status(404).send('Producto no encontrado');
    return res.json(response);
  } catch (error) {
    return res.send(500).send('Internal server error');
  }
};

module.exports = {
  createProduct,
  getProducts,
  getSinlgeProduct,
  delProduct,
  getProductsByQuery,
  updateProduct,
  getProductsByCategory,
};
