const {
  Router,
} = require('express');
const {
  createUser, getUser,
} = require('../controllers/user');

const router = Router();
router.post('/user', createUser);
router.get('/user', getUser);
module.exports = router;
