const {
  Router,
} = require('express');
const {
  addAddressFunction, updateAddress, getSingleAddress, deleteAddress, setAddressToOrderToBePaid,
} = require('../controllers/address');

const router = Router({
  // esto es para que acepte el /:idUser desde la ruta de user
  mergeParams: true,
});
router.put('/checkout', setAddressToOrderToBePaid);
router.post('/', addAddressFunction);
router.get('/', getSingleAddress);
router.delete('/:idAddress', deleteAddress);
router.put('/:idAddress', updateAddress);

module.exports = router;
