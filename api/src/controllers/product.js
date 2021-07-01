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
  Review,
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
      discount,
    } = req.body;
    if (!name || name.trim().length === 0) return res.status(404).send('Campo faltante: nombre');
    if (!description || description.trim().length === 0) return res.status(404).send('Campo faltante: descripción');
    if (!verifyNumber(price).veracity) return res.status(400).send(verifyNumber(price, 'Precio').msg);
    if (!verifyNumber(stockAmount).veracity) return res.status(400).send(verifyNumber(stockAmount, 'Stock').msg);
    if (!verifyArray(categories)) return res.status(400).send('No se seleccionó una categoría');
    if (!verifyArray(image)) return res.status(400).send('No se seleccionó una imagen');
    const productCreated = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: Math.ceil(parseFloat(price)),
      stockAmount: parseInt(stockAmount),
      discount: parseInt(discount),
    });
    for (let c = 0; c < categories.length; c += 1) {
      const category = await Category.findByPk(parseInt(categories[c]));
      await productCreated.addCategory(category);
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

    await Product.findByPk(productCreated.id, {
      include: [Category, Image],
    });
    return res.status(201).send('El producto fue creado con éxito!');
  } catch (err) {
    return res.status(400).send('Internal server Error. Producto no fue creado');
  }
};

const getProducts = async (_req, res) => {
  try {
    const response = await Product.findAll({
      include: [Category, Image, {
        model: Review,
        attributes: ['id', 'calification', 'description'],
      }],
    });
    if (!response.length) return res.status(404).send('No existen productos');
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).send('Internal server Error. Productos no fueron obtenidos');
  }
};

const getProductById = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  try {
    const product = await Product.findByPk(idProduct, {
      include: [Category, Image],
    });
    if (!product) return res.status(400).send('Producto no encontrado');
    return res.json(product);
  } catch (err) {
    return res.status(500).send('Internal server Error. Producto no fue obtenido');
  }
};

const deleteProduct = async (req, res) => {
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
    if (!product) return res.status(400).send('Producto no encontrado');

    return res.status(200).send('Producto eliminado exitosamente!');
  } catch (err) {
    return res.status(500).send('Internal server Error. Producto no fue eliminado');
  }
};

const getProductsByQuery = async (req, res) => {
  const {
    name,
  } = req.query;
  if (!name) return res.status(404).send('No se envió una consulta apropiada');
  try {
    const productsFound = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Category, Image],
    });
    if (!productsFound.length) return res.status(404).send('No se encontró producto con esa consulta');
    return res.json(productsFound);
  } catch {
    return res.status(500).send('Internal server Error. Producto no fue buscado');
  }
};

const updateProduct = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  let {
    name, description, stockAmount, price, categories, images, discount,
  } = req.body;

  try {
    if (!name) name = undefined;
    if (!description) description = undefined;
    const searchProduct = await searchProductF(idProduct);
    if (!searchProduct) return res.status(404).send('No se encontro el producto.');
    const discountt = (verifyNumber(discount).veracity ? parseInt(discount) : undefined);
    const stock = (verifyNumber(stockAmount).veracity ? parseInt(stockAmount) : undefined);
    const priceVar = (verifyNumber(price).veracity ? parseFloat(price) : undefined);
    await Product.update({
      name,
      description,
      stockAmount: stock,
      price: Math.ceil(priceVar),
      discount: discountt,
    }, {
      where: {
        id: idProduct,
      },
    });
    const haveError = await updateCategories(searchProduct, categories);
    if (!haveError) return res.status(400).send('Hay campos erroneos');
    await updateImages(searchProduct, images, idProduct);
    // return res.status(200).json(await searchProductF(idProduct));
    return res.send('Producto actualizado correctamente!');
  } catch (err) {
    return res.status(500).send('Internal server Error. Producto no fue actualizado');
  }
};

const getProductsByCategory = async (req, res) => {
  let {
    id,
  } = req.params;
  if (!verifyNumber(id).veracity) return res.status(400).send(verifyNumber(id, 'ID de categoría').msg);
  id = parseInt(id);
  try {
    const productsFound = await Product.findAll({
      include: [{
        model: Category,
        where: {
          id,
        },
      }, Image],
    });
    if (!productsFound.length) return res.status(404).send('Productos no encontrados');
    return res.json(productsFound);
  } catch (error) {
    return res.send(500).send('Internal server Error. Productos no fueron encontrados');
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getProductsByQuery,
  getProductsByCategory,
};
