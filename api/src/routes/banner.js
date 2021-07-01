const {
  Router,
} = require('express');
const {
  createAndUpdateImagesBanner,
  getImagesBanner,
} = require('../controllers/banner');

const router = Router();

router.get('/', getImagesBanner);
router.post('/', createAndUpdateImagesBanner);

module.exports = router;
