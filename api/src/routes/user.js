const {
  Router,
} = require('express');
const {
  createUser, getUser, addAddressFunction,
} = require('../controllers/user');

const router = Router();
router.post('/', createUser);
router.get('/', getUser);
router.post('/:idUser/address', addAddressFunction);
module.exports = router;
