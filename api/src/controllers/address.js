/* eslint-disable max-len */
const {
  User,
  Address,
} = require('../models/index');
const {
  verifyNumber,
} = require('../helpers/functionHelpers');

const addAddressFunction = async (req, res) => {
  const {
    idUser,
  } = req.params;
  const {
    address,
    state,
    departament,
  } = req.body;
  if (!state || !departament) return res.status(400).send('Falta un campo por rellenar.');
  const user = await User.findByPk(idUser);
  if (!user) return res.status(404).send('No hay ningún cliente con esa ID.');
  try {
    const isAddress = await Address.create({
      address,
      state,
      departament,
    });
    await user.addAddress(isAddress);
    return res.send('Domicilio creado con éxito!');
  } catch (err) {
    console.log(err);
    return res.status(500).send('No se pudo crear el domicilio.');
  }
};
const updateAddress = async (req, res) => {
  const {
    idUser, idAddress,
  } = req.params;
  let {
    address,
    state,
    departament,
  } = req.body;
  try {
    const user = await User.findByPk(idUser);
    if (!user) return res.status(404).send('No hay ningún cliente con esa ID.');
    address = address !== '' ? address : undefined;
    state = state !== '' ? state : undefined;
    departament = departament !== '' ? departament : undefined;
    const verifyAddress = await Address.findOne({
      where: {
        id: idAddress,
        userId: idUser,
      },
    });
    if (!verifyAddress) return res.status(404).send('La id de dirección no pertenece a este usuario.');
    await Address.update({
      state,
      departament,
      address,
    }, {
      where: {
        id: idAddress,
        userId: idUser,
      },
    });

    return res.status(200).send('Direccion actualizada correctamente!');
  } catch (err) {
    return res.status(404).send('Internal server error. Dirección no actualizada');
  }
};

const getSingleAddress = async (req, res) => {
  const {
    idUser,
  } = req.params;
  try {
    const response = await User.findByPk(idUser, {
      include: Address,
    });
    return res.status(201).json(response.addresses);
  } catch (error) {
    return res.status(500).send('Internal server error. Dirección no encontrada');
  }
};
const deleteAddress = async (req, res) => {
  const {
    idUser,
    idAddress,
  } = req.params;
  if (!verifyNumber(idAddress).veracity) return res.status(404).send(verifyNumber(idAddress, 'id de dirección').msg);
  try {
    const address = await Address.destroy({
      where: {
        userId: idUser,
        id: parseInt(idAddress, 10),
      },
    });
    if (!address) return res.status(404).send('No se ha encontrado la dirección.');
    return res.send('Dirección eliminada correctamente!');
  } catch (err) {
    return res.status(500).send('Internal server error. Dirección no eliminada');
  }
};
module.exports = {
  addAddressFunction,
  updateAddress,
  getSingleAddress,
  deleteAddress,
};
