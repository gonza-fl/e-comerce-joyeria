const {
  User,
  Address,
  Order,
  Product,
} = require('../models/index');

const createUser = async (req, res) => {
  const birthday = req.body.birthday && req.body.birthday.split('-');
  const {
    id, email, displayName, phone,

  } = req.body;
  const birthdayNew = birthday ? new Date(birthday[2], birthday[1] - 1, birthday[0]) : null;
  try {
    await User.create({
      id,
      email,
      displayName,
      phone,
      birthday: birthdayNew,
      admin: 'user',
    });
    return res.status(201).send('Usuario creado correctamente!');
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.findAll({
      include: [Address, {
        model: Order,
        include: Product,
      },
      ],
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).send('Internal server error');
  }
};

const updateUser = async (req, res) => {
  const {
    idUser,
  } = req.params;
  const birthday = req.body.birthday && req.body.birthday.split('-');
  const {
    displayName, email, phone, role,
  } = req.body;
  try {
    const user = await User.findByPk(idUser);
    if (!user) return res.status(404).send('No hay ningún cliente con esa ID.');
    if (displayName) user.displayName = displayName;
    if (email) user.email = email;
    if (birthday) user.birthday = new Date(birthday[2], birthday[1] - 1, birthday[0]);
    if (phone) user.phone = phone;
    if (role) user.role = role;
    // Updeteo el user
    await user.save();
    return res.status(200).send('Datos de usuario actualizados!');
  } catch (err) {
    return res.status(404).send('Internal server error');
  }
};

const getUserById = async (req, res) => {
  const {
    idUser,
  } = req.params;
  try {
    const user = await User.findByPk(idUser, {
      include: [Address,
        {
          model: Order,
          include: Product,
        },
      ],
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).send('Internal server error');
  }
};

const getUserAdmin = async (req, res) => {
  const {
    idUser,
  } = req.params;
  try {
    const user = await User.findByPk(idUser);
    if (user && user.role === 'admin') return res.sendStatus(200);
    return res.status(404).send('Acceso denegado. El usuario no es admin');
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  getUserById,
  getUserAdmin,
};
