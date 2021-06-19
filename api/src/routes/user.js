const {
  Router,
} = require('express');
const {
  createUser, getUser, addAddressFunction, updateUser,
} = require('../controllers/user');

const router = Router();
router.post('/', createUser);
router.get('/', getUser);
router.put('/:idUser', updateUser);
router.post('/:idUser/address', addAddressFunction);
module.exports = router;
