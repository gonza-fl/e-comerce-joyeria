const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allownull: false
    },
    description: {
      type: DataTypes.STRING
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
  })
}
