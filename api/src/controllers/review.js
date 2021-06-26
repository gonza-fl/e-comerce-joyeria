/* eslint-disable max-len */
const {
  searchReview,
} = require('../helpers/reviewHelpers');
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

const modifyReview = async (req, res) => {
  const {
    id,
  } = req.res;
  const {
    calification,
    description,
  } = req.body;

  try {
    const response = await searchReview(id);
    if (!response) return res.status(404).json('Review not founded');
    Review.update({
      calification,
      description,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      mesage: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  getReview,
  modifyReview,
};
