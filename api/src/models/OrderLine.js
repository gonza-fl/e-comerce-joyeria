const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => (
  sequelize.define('orderline', {
    amount: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
  })
);
