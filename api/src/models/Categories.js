const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, { timestamps: false });
};
