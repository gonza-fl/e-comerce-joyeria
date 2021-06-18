const {
  Router,
} = require('express');
const {
  createUser, getUser,
} = require('../controllers/user');

const router = Router();
router.post('/', createUser);
router.get('/', getUser);
module.exports = router;
