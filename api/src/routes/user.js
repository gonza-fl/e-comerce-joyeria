const {
  Router,
} = require('express');
const address = require('./address');
const {
  createUser, getUsers, updateUser, getUserById, getUserAdmin,
  disableUser,
} = require('../controllers/user');
const {
  editCartAmount,
  getCartByUser,
  getAllOrdersByIdUser,
} = require('../controllers/order');

const router = Router();
router.get('/:idUser/admin', getUserAdmin);
router.get('/:idUser/orders', getAllOrdersByIdUser);
router.get('/:id/cart', getCartByUser);
router.put('/:idUser/cart', editCartAmount);
router.use('/:idUser/address', address);
router.put('/:idUser', updateUser);
router.get('/:idUser', getUserById);
router.delete('/:idUser', disableUser);
router.post('/', createUser);
router.get('/', getUsers);
module.exports = router;
