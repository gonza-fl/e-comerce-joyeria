const {
  User,
  Address,
  Cart,
} = require('../models/index');

const createUser = async (req, res) => {
  const {
    id, email, username, name, lastname, address, genre, birthday,
    codePostal, description,
  } = req.body;

  try {
    const user = await User.create({
      id,
      email,
      username,
      name,
      lastname,
      address,
      genre,
      birthday,
    });
    const newAddress = await Address.create({
      address,
      codePostal,
      description,
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
      error: err,
    });
  }
};

const getUser = async (req, res) => {
  const {
    id,
  } = req.body;

  try {
    const user = await User.findByPk(id,
      {
        include: [
          {
            model: Address,
          },
          {
            model: Cart,
          },
        ],
      });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports = {
  createUser,
  getUser,
};
