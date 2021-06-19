const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => (
  sequelize.define('orderline', {
    amount: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT,
  })
);
