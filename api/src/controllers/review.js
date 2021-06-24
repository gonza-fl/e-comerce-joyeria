/* eslint-disable max-len */
const {
  Review,
} = require('../models/index');
// const {
//   verifyNumber,
// } = require('../helpers/functionHelpers');

const getReview = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  try {
    const response = await Review.findAll({
      where: {
        productId: idProduct,
      },
    });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

const postReview = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  const {
    calification,
    description,
    userId,
  } = req.body;
  try {
    const [review, created] = await Review.findOrCreate({
      where: {
        productId: idProduct,
        userId,
      },
      defaults: {
        calification,
        description,
      },
    });
    if (created) {
      return res.status(200).send(review);
    }
    return res.status(400).send('Ya existe un review por parte de este usuario en este producto');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
};

module.exports = {
  getReview,
  postReview,
};
