const {
  DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('review', {
    calification: {
      type: DataTypes.ENUM(['like', 'dislike']),
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
  });
  return model;
};
