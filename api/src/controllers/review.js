/* eslint-disable max-len */
const {
  Review,
  Product,
} = require('../models/index');
// const {
//   verifyNumber,
// } = require('../helpers/functionHelpers');

const getReview = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  try {
    const response = await Product.findOne({
      where: {
        id: idProduct,
      },
      include: Review,
    });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

module.exports = {
  getReview,
};
