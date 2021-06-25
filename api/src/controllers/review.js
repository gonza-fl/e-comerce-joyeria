/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const {
  verifyNumber,
} = require('../helpers/functionHelpers');
const {
  Review,
  User,
} = require('../models/index');

const getReviews = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  try {
    const reviews = await Review.findAll({
      where: {
        productId: idProduct,
      },
      attributes: ['id', 'calification', 'description', 'updatedAt'],
    });
    return res.status(201).json(reviews);
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

const postReview = async (req, res) => {
  const {
    idProduct,
  } = req.params;
  let {
    calification,
    description,
    userId,
  } = req.body;
  if (typeof userId !== 'string') return res.status(400).send('El ID de usuario es inválido');
  userId = userId.trim();
  const user = await User.findByPk(userId);
  if (!user) return res.status(400).send('No existe User con ese ID');
  if (!verifyNumber(calification).veracity) return res.status(400).send(verifyNumber(calification, 'calificacion').msg);
  description = description.trim();
  if (calification === 0) calification = 1;
  else calification = calification % 5 === 0 ? 5 : calification % 5;
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
    if (created) return res.status(200).send('Gracias por dejar tu review!');
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
    if (!review) return res.status(400).send('No se encontró una review');
    return res.status(200).send('Review eliminada correctamente!');
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};

module.exports = {
  getReviews,
  postReview,
  deleteReview,
};