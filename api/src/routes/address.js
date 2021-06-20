const {
  Router,
} = require('express');
const {
  addAddressFunction, updateAddress, getSingleAddress, deleteAddress,
} = require('../controllers/address');

const router = Router({
  // esto es para que acepte el /:idUser desde la ruta de user
  mergeParams: true,
});
router.delete('/:idAddress', deleteAddress);
router.put('/:idAddress', updateAddress);
router.post('/', addAddressFunction);
router.get('/', getSingleAddress);

module.exports = router;
