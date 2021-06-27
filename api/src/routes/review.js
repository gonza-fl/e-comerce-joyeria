const {
  Router,
} = require('express');
const {
  getReviews, postReview, deleteReview, getReview, modifyReview,
} = require('../controllers/review');

const router = Router({
  // esto es para que acepte el /:idProduct desde la ruta de product
  mergeParams: true,
});

router.get('/', getReviews);
router.post('/', postReview);
router.delete('/:idReview', deleteReview);
router.get('/:idUser', getReview);

module.exports = router;
