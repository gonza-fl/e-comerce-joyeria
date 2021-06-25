const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('review', {
    calification: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allownull: false,
    },
  });
  return model;
};
