/* eslint-disable max-len */
const {
  verifyNumber,
} = require('../helpers/functionHelpers');
const {
  Review,
  User,
} = require('../models/index');

const getReview = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  try {
    const response = await Review.findAll({
      where: {
        productId: idProduct,
      },
      attributes: ['id', 'calification', 'description'],
    });
    if (!response) return res.status(400).send('Product no disponible');
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
  const user = await User.findByPk(userId);
  if (!user) return res.status(400).send('No existe User con ese ID');
  if (!verifyNumber(calification).veracity) return res.status(400).send(verifyNumber(calification, 'calificacion').msg);
  const calificationByFive = calification > 5 ? 5 : calification;
  try {
    const [review, created] = await Review.findOrCreate({
      where: {
        productId: idProduct,
        userId,
      },
      defaults: {
        calification: calificationByFive,
        description,
      },
    });
    if (created) {
      return res.status(200).send(review);
    }
    return res.status(400).send('Ya existe un review por parte de este usuario en este producto');
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

const deleteReview = async (req, res) => {
  const {
    idReview,
  } = req.params;
  try {
    const review = await Review.destroy({
      where: {
        id: idReview,
      },
    });

    if (!review) return res.status(400).send('Review not Found');

    return res.status(200).json('Review deleted');
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};

module.exports = {
  getReview,
  postReview,
  deleteReview,
};
