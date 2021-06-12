/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint radix: ["error", "as-needed"] */

const {
  Product,
  Category,
  Image,
} = require('../models/index');
const {
  cloudinary,
} = require('../utils/cloudinary');

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
const deleteImages = async (id) => Image.destroy({
  where: {
    productId: id,
  },
  force: true,
});
const updateImages = async (searchProduct, images, idProduct) => {
  // if (images[0] === '') return;
  try {
    await deleteImages(idProduct);
    const imagesSearch = [];
    console.log('images', images);
    for (let i = 0; i < images.length; i++) {
      const uploadedResponse = (images[i] !== 'test' && await cloudinary.uploader.upload(images[i], {
        upload_preset: 'henry',
      }));
      imagesSearch.push(await Image.findOrCreate({
        where: {
          url: uploadedResponse.secure_url,
        },
        defaults: {
          url: uploadedResponse.secure_url,
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

module.exports = {
  searchProductF,
  updateCategories,
  updateImages,
  deleteImages,
};
