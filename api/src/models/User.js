const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allownull: false,
      unique: true,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.ENUM(['user', 'admin', 'banned']),
    },
  },
  {
    timestamps: false,
  });
  return model;
};
