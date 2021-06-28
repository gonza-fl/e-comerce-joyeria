const {
  User,
  Address,
  Order,
  Product,
} = require('../models/index');

const createUser = async (req, res) => {
  const birthday = req.body.birthday && req.body.birthday.split('-');
  let {
    id, displayName,
  } = req.body;
  const {
    email, phone,
  } = req.body;
  if (!id || typeof id !== 'string' || !id.trim().length) return res.status(400).send('Id incorrecto');
  if (!displayName || !displayName.trim().length) return res.status(400).send('displayName incorrecto');
  displayName = displayName.trim();
  id = id.trim();
  const birthdayNew = birthday ? new Date(birthday[2], birthday[1] - 1, birthday[0]) : null;
  try {
    const emailFound = await User.findOne({
      where: {
        email,
      },
    });
    if (emailFound) return res.status(400).send('Ese email ya está siendo utilizado');
    await User.create({
      id,
      email,
      displayName,
      phone,
      birthday: birthdayNew,
      role: 'user',
    });
    return res.status(201).send('Usuario creado correctamente!');
  } catch (err) {
    return res.status(500).send('Internal server error. No se creó el usuario');
  }
};

const getUsers = async (_req, res) => {
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

// eslint-disable-next-line arrow-body-style
const testAdmin = async (_req, res) => {
  return res.json({
    data: {
      username: 'test',
      password: '123456',
    },
  });
};

const disableUser = async (req, res) => {
  const {
    idUser,
  } = req.params;
  const {
    idAdmin,
  } = req.body;
  try {
    const admin = await User.findOne({
      where: {
        id: idAdmin,
        role: 'admin',
      },
    });
    if (!admin) return res.status(404).send('Acceso denegado. El usuario no es admin');
    if (admin.id === idUser) return res.status(404).send('Error: no puede bloquearse a uno mismo');
    // Falta validar que ningun admin pueda borrar al superadmin
    // ¿Como reconocer el idSuperAdmin? ¿De dónde viene este dato?
    // if (idUser === idSuperAdmin) return res.status(404).send('No se puede eliminar al dueño');
    const user = await User.update({
      role: 'banned',
    }, {
      where: {
        id: idUser,
      },
    });
    if (!user) return res.status(400).send('Error: el usuario a eliminar no existía');
    return res.send('Usuario bloqueado correctamente!');
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
  testAdmin,
  disableUser,
};
