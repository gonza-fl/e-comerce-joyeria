const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  return sequelize.define('images', {
    url: {
      type: DataTypes.STRING,
    }
  }, { timestamps: false });
};
