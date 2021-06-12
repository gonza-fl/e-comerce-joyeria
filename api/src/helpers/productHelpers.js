/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint radix: ["error", "as-needed"] */

const {
  Product,
  Category,
  Image,
} = require('../models/index');

const searchProductF = async (id) => Product.findOne({
  where: {
    id,
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

const updateCategories = async (searchProduct, categories) => {
  if (!categories) return true;
  if (categories[0] === '') return true;
  try {
    const categoriesSearch = [];
    for (let i = 0; i < categories.length; i++) {
      categoriesSearch.push(await Category.findByPk(categories[i]));
    }
    return Promise.all(categoriesSearch).then(() => {
      if (categoriesSearch.includes(null)) return false;
      return searchProduct.setCategories(categoriesSearch);
    });
  } catch (err) {
    throw new Error('Campos erroneos');
  }
};
const updateImages = async (searchProduct, images) => {
  if (images[0] === '') return;
  try {
    const imagesSearch = [];
    for (let i = 0; i < images.length; i++) {
      imagesSearch.push(await Image.findOrCreate({
        where: {
          url: images[i],
        },
        defaults: {
          url: images[i],
        },
      }));
    }
    return Promise.all(imagesSearch).then(() => {
      const imagesMap = imagesSearch.map((el) => el && el[0]);
      return searchProduct.setImages(imagesMap);
    });
  } catch (err) {
    return console.log(err);
  }
};

const deleteImages = async (id) => Image.destroy({
  where: {
    productId: id,
  },
  force: true,
});
module.exports = {
  searchProductF,
  updateCategories,
  updateImages,
  deleteImages,
};
