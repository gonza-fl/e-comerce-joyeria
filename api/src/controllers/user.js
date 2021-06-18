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

const updateUser = async (req, res) => {
  const {
    idUser,
  } = req.params;
  const {
    name, lastname, email, genre, birthday, phone, admin,
  } = req.body;
  try {
    // capturo el usuario que se quiere cambiar
    const user = await User.findByPk(idUser);
    // agrego validacion
    if (!user) {
      return res.status(404).json({
        err: 'No hay ningún cliente con esa ID.',
      });
    }
    // identifico si se cambia algun espacio y si se cambia le asigno el nuevo valor
    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (genre) user.genre = genre;
    if (birthday) user.birthday = new Date(birthday[2], birthday[1] - 1, birthday[0]);
    if (phone) user.phone = phone;
    if (admin) user.admin = admin;
    // Updeteo el user
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
};
