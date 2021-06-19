const {
  User,
  Address,
} = require('../models/index');

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
    console.log(err);
    return res.status(404).json(err);
  }
};
// const getAddresses = async (req, res) => {
//   try {
//     const response = await User.findAll({
//       include: Address,
//     });
//     if (!response.length) return res.status(400).json('Users not founded');
//     return res.status(201).json(response);
//   } catch (error) {
//     return res.status(500).json('Internal server error');
//   }
// };

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

module.exports = {
  addAddressFunction,
  updateAddress,
  getSingleAddress,
};
