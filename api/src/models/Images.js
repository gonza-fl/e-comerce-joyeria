const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('images', {
    url: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  });
  return model;
};
