const {
  Router,
} = require('express');
const {
  getReview,
} = require('../controllers/review');

const router = Router({
  // esto es para que acepte el /:idProduct desde la ruta de product
  mergeParams: true,
});

router.get('/', getReview);

module.exports = router;
