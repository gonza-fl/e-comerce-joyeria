const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allownull: false,
    },
    stockAmount: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
  });
  return model;
};
