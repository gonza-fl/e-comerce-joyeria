/* eslint-disable no-console */
/* eslint-disable radix */
const {
  Order,
  Product,
} = require('../models');

const verifyUserProduct = async (idUser, idProduct) => {
  try {
    const order = await Order.findOne({
      include: Product,
      where: {
        userId: idUser,
        status: 'finished',
      },
    });
    const filterProduct = order.products.filter((prod) => prod.id === parseInt(idProduct));
    if (filterProduct.length > 0) return true;
    return false;
  } catch {
    return false;
  }
};
module.exports = {
  verifyUserProduct,
};
