const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(['cart', 'paidPendingDispatch', 'deliveryInProgress', 'finished', 'canceled']),
    },
    endTimestamp: { // generar al momento de cerrar compra .
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
