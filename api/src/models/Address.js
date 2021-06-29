const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('address', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: 'Antioquia',
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: 'Medellin',
    },
  },
  {
    timestamps: false,
  });
  return model;
};
