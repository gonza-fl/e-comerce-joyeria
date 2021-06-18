const {
  Router,
} = require('express');
const {
  createUser, getUser, updateUser,
} = require('../controllers/user');

const router = Router();
router.post('/', createUser);
router.get('/', getUser);
router.put('/:idUser', updateUser);
module.exports = router;
