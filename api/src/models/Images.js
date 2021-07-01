const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('images', {
    url: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM(['product_image', 'banner_image']),
      defaultValue: 'product_image',
    },
  }, {
    timestamps: false,
  });
  return model;
};
