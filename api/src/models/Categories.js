const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('category', {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    },{timestamps:false});
};