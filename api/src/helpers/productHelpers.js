/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint radix: ["error", "as-needed"] */

const {
  Product,
  Category,
  Image,
  Order,
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
  if (categories.length === 0) {
    return true;
  }
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

const updateImages = async (searchProduct, image, idProduct) => {
  if (!image) return;
  if (image.length === 0) return;
  try {
    await deleteImages(idProduct);
    const imagesSearch = [];
    const urlImages = [];
    for (let i = 0; i < image.length; i++) {
      if (!image[i].hasOwnProperty('url')) {
        urlImages.push(await cloudinary.uploader.upload(image[i], {
          upload_preset: 'henry',
        }));
      } else {
        urlImages.push({
          secure_url: image[i].url,
        });
      }
    }
    Promise.all(urlImages).then(async () => {
      for (let i = 0; i < urlImages.length; i++) {
        imagesSearch.push(await Image.findOrCreate({
          where: {
            url: urlImages[i].secure_url,
          },
          defaults: {
            url: urlImages[i].secure_url,
          },
        }));
      }
      return Promise.all(imagesSearch).then(() => {
        const imagesMap = imagesSearch.map((el) => el && el[0]);
        return searchProduct.setImages(imagesMap);
      });
    });
  } catch (err) {
    return console.log(err);
  }
};
/* eslint-disable*/
const updateSubtotalProduct = async (idProduct, price = 0) => {
  try {
    const orders= await Order.findAll({
      include: [{
        model: Product,
        where:{
          id: idProduct,
        }
      }],
      where:{
        status:'cart',
      }
    })
    for (let i = 0; i < orders.length; i++) {
      console.log(orders[i].products);
      
    }

    return;
  } catch (err) {
    console.log(err)
    return console.log('err')
  }
};
module.exports = {
  searchProductF,
  updateCategories,
  updateImages,
  deleteImages,
  updateSubtotalProduct
};
