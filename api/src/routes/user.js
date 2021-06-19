const {
  Router,
} = require('express');
const address = require('./address');
const {
  createUser, getUser, updateUser,
} = require('../controllers/user');

const router = Router();
router.use('/:idUser/address', address);
router.put('/:idUser', updateUser);
router.post('/', createUser);
router.get('/', getUser);
module.exports = router;
