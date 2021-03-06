/* eslint-disable max-len */
const {
  User,
  Address,
  Order,
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
    city,
    description,
  } = req.body;
  try {
    if (!state.trim().length) return res.status(400).send('Falta rellenar el campo departamento.');
    if (!city.trim().length) return res.status(400).send('Falta rellenar el campo municipio.');
    if (!description.trim().length) return res.status(400).send('Falta rellenar el campo descripción.');
    const user = await User.findByPk(idUser);
    if (!user) return res.status(404).send('No hay ningún cliente con esa ID.');
    const isAddress = await Address.create({
      address,
      state,
      city,
      description,
    });
    await user.addAddress(isAddress);
    return res.send('Domicilio creado con éxito!');
  } catch (err) {
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
    city,
    description,
  } = req.body;
  try {
    const user = await User.findByPk(idUser);
    if (!user) return res.status(404).send('No hay ningún cliente con esa ID.');
    address = address !== '' ? address : undefined;
    state = state !== '' ? state : undefined;
    description = description !== '' ? description : undefined;
    city = city !== '' ? city : undefined;
    const verifyAddress = await Address.findOne({
      where: {
        id: idAddress,
        userId: idUser,
      },
    });
    if (!verifyAddress) return res.status(404).send('La id de dirección no pertenece a este usuario.');
    await Address.update({
      state,
      city,
      address,
      description,
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

const setAddressToOrderToBePaid = async (req, res) => {
  const {
    addressId,
    userId,
  } = req.body;
  try {
    if (!addressId) return res.status(404).send('No se ha enviado una dirección.');
    if (!userId) return res.status(404).send('No se ha enviado una usuario.');

    const address = await Address.findByPk(addressId);
    if (!address) return res.status(404).send('Esa dirección no se encuentra registrada.');

    const order = await Order.findOne({
      where: {
        userId,
        status: 'cart',
      },
    });
    if (!order) return res.status(404).send('Esa orden no existe');

    await order.setAddress(address);
    return res.send('Dirección asociada a esta orden');
  } catch (err) {
    return res.status(500).send('Internal server error. Dirección no asociada a la orden de compra');
  }
};

module.exports = {
  addAddressFunction,
  updateAddress,
  getSingleAddress,
  deleteAddress,
  setAddressToOrderToBePaid,
};
