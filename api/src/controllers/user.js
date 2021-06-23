const {
  User,
  Address,
  Order,
  Product,
} = require('../models/index');

const createUser = async (req, res) => {
  const {
    id, email, displayName, birthday, phone,

  } = req.body;
  const birthdayNew = birthday ? new Date(birthday[2], birthday[1] - 1, birthday[0]) : null;
  try {
    const user = await User.create({
      id,
      email,
      displayName,
      phone,
      birthday: birthdayNew,
      admin: 'user',
    });
    return res.status(201).json(user);
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
            model: Order,
            include: Product,
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
    displayName, email, birthday, phone, admin,
  } = req.body;
  try {
    // capturo el usuario que se quiere cambiar
    const user = await User.findByPk(idUser);
    // agrego validacion
    if (!user) return res.status(404).send('No hay ningún cliente con esa ID.');
    // identifico si se cambia algun espacio y si se cambia le asigno el nuevo valor
    if (displayName) user.displayName = displayName;
    if (email) user.email = email;
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

const getUserById = async (req, res) => {
  const {
    idUser,
  } = req.params;
  try {
    const user = await User.findAll(
      {
        where: {
          id: idUser,
        },
        include: [
          {
            model: Address,
          },
          {
            model: Order,
            include: Product,
          },
        ],
      },
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json(err);
  }
};

const getUserAdmin = async (req, res) => {
  const {
    idUser,
  } = req.params;
  try {
    const user = await User.findByPk(idUser);
    if (user && user.admin === 'admin') return res.sendStatus(200);
    return res.status(404).send('Acceso denegado. El usuario no es admin');
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserById,
  getUserAdmin,
};
