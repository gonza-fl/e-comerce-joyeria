const {
  Router,
} = require('express');
const {
  getReview, postReview, deleteReview,
} = require('../controllers/review');

const router = Router({
  // esto es para que acepte el /:idProduct desde la ruta de product
  mergeParams: true,
});

router.get('/', getReview);
router.post('/', postReview);
router.delete('/:idReview', deleteReview);

module.exports = router;
