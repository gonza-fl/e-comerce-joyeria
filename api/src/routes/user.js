const {
  Router,
} = require('express');
const address = require('./address');
const {
  createUser, getUsers, updateUser, getUserById, getUserAdmin, testAdmin, testAdmin2,
} = require('../controllers/user');
const {
  editCartAmount,
  getCartByUser,
  getAllOrdersByIdUser,
} = require('../controllers/order');

const {
  corroborarAdmin,
} = require('../helpers/middlewares');

const router = Router();
router.get('/:idUser/admin', getUserAdmin);
router.get('/:idUser/orders', getAllOrdersByIdUser);
router.get('/:id/cart', getCartByUser);
router.put('/:idUser/cart', editCartAmount);
router.use('/:idUser/address', address);
router.put('/:idUser', updateUser);
router.get('/:idUser', getUserById);
router.post('/', createUser);
router.get('/', getUsers);
router.get('/testadmin/test', corroborarAdmin, testAdmin);

module.exports = router;
