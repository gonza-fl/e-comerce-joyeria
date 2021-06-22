const {
  User,
  Address,
} = require('../models/index');
const {
  verifyNumber,
} = require('../helpers/functionHelpers');

const addAddressFunction = async (req, res) => {
  // Address __
  const {
    idUser,
  } = req.params;
  const {
    address,
    postalCode,
    description,
    name,
  } = req.body;
  // identifico el usuario al cual se le van a revisar las address
  if (postalCode && !verifyNumber(postalCode)) return res.sendStatus(400);
  const user = await User.findByPk(idUser);
  if (!user) {
    return res.status(404).json({
      err: 'No hay ningún cliente con esa ID.',
    });
  }
  try {
    //
    const isAddress = await Address.create({
      address,
      postalCode,
      name,
      description,
    });
    await user.addAddress(isAddress);
    return res.json({
      success: 'Domicilio creado con éxito!',
    });
  } catch (err) {
    return res.json({
      err: 'No se pudo crear el domicilio.',
    });
  }
};
const updateAddress = async (req, res) => {
  const {
    idUser, idAddress,
  } = req.params;
  const {
    address,
    postalCode,
    description,
    name,
  } = req.body;
  try {
    // capturo el usuario que se quiere cambiar la direccion
    const user = await User.findOne({
      where: {
        id: idUser,
      },
      include: Address,
    });
    // agrego validacion
    if (!user) {
      return res.status(404).json({
        err: 'No hay ningún cliente con esa ID.',
      });
    }
    // identifico el address al cual se la va a hacer el cambio
    if (postalCode && !verifyNumber(postalCode)) return res.sendStatus(404);
    await Address.update({
      name,
      description,
      postalCode,
      address,
    }, {
      where: {
        id: idAddress,
        userId: idUser,
      },
    });
    return res.status(200).json('Direccion updeteada');
  } catch (err) {
    return res.status(404).json(err);
  }
};

const getSingleAddress = async (req, res) => {
  const {
    idUser,
  } = req.params;
  try {
    const response = await User.findOne({
      where: {
        id: idUser,
      },
      include: Address,
    });
    // if (!response.length) return res.status(400).json('User not founded');
    return res.status(201).json(response.addresses);
  } catch (error) {
    return res.status(500).json('Internal server error');
  }
};
const deleteAddress = async (req, res) => {
  const {
    idUser,
    idAddress,
  } = req.params;
  if (!verifyNumber(idAddress)) {
    return res.status(404).json({
      err: 'El campo ID esta vacío',
    });
  }
  try {
    const address = await Address.destroy({
      where: {
        userId: idUser,
        id: parseInt(idAddress, 10),
      },
    });
    if (!address) {
      return res.status(404).json({
        err: 'No se ha encontrado la dirección.',
      });
    }
    return res.json(address);
  } catch (err) {
    return res.status(500).json({
      err: 'Ocurrió un error al intentar borrar el domicilio.',
    });
  }
};
module.exports = {
  addAddressFunction,
  updateAddress,
  getSingleAddress,
  deleteAddress,
};
