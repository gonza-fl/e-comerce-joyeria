const {
  Router,
} = require('express');
const {
  getReview, postReview,
} = require('../controllers/review');

const router = Router({
  // esto es para que acepte el /:idProduct desde la ruta de product
  mergeParams: true,
});

router.get('/', getReview);
router.post('/', postReview);

module.exports = router;
