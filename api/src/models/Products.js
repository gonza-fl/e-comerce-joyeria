const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  return sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allownull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL,
      allownull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allownull: false
    },
    image:{
      type: DataTypes.STRING,
      allownull: false
    }
  },{timestamps:false});
}
