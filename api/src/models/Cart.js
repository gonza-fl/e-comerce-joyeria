const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'creada',
    },
    endTimestamp: { // generar al momento de cerrar compra
      type: DataTypes.DATE,
    },
    total: {
      type: DataTypes.FLOAT,
    },
    orderNumber: { // generar con UUID al momento de cerrar compra
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  });
  return model;
};
