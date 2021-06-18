const {
  User,
  Address,
  Cart,
} = require('../models/index');

const createUser = async (req, res) => {
  const {
    id, email, name, lastname, address, genre, birthday, phone,
    postalCode, description,
  } = req.body;

  try {
    const user = await User.create({
      id,
      email,
      name,
      lastname,
      genre,
      phone,
      birthday: new Date(birthday[2], birthday[1] - 1, birthday[0]),
    });
    const newAddress = await Address.create({
      address,
      postalCode,
      description,
      name,
    });
    await user.addAddress(newAddress);
    const search = await User.findByPk(id, {
      include: [
        {
          model: Address,
        },
      ],
    });
    return res.status(201).json(search);
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findAll(
      {
        include: [
          {
            model: Address,
          },
          {
            model: Cart,
          },
        ],
      },
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json(err);
  }
};

// Address __
const addAddressFunction = async (req, res) => {
  const {
    idUser,
  } = req.params;
  const {
    address,
    postalCode,
    description,
    name,
  } = req.body;

  const user = await User.findByPk(idUser);
  if (!user) {
    return res.status(404).json({
      err: 'No hay ningún cliente con esa ID.',
    });
  }
  try {
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
      err: 'No se pudo crear / modificar el domicilio.',
    });
  }
};

module.exports = {
  createUser,
  getUser,
  addAddressFunction,
};
