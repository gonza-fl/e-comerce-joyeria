const {Sequelize} = require('sequelize');
const {dbUser, dbName, dbHost, dbPassword} = require('../utils/config/index');

const CategoriesFactory = require('./Categories') 

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,{
    logging: false
});

const Category = CategoriesFactory(sequelize);

module.exports = {
    conn: sequelize,
    Category
}
