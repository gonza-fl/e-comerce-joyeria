/* eslint linebreak-style: ["error", "windows"] */
const {
  Sequelize,
} = require('sequelize');

const {
  dbUser,
  dbName,
  dbHost,
  dbPassword,
} = require('../utils/config/index');

const CategoriesFactory = require('./Categories');
const ProductsFactory = require('./Products');
const ImagesFactory = require('./Images');

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`, {
  logging: false,
});

const Category = CategoriesFactory(sequelize);
const Product = ProductsFactory(sequelize);
const Image = ImagesFactory(sequelize);

Product.belongsToMany(Category, {
  through: 'product_category',
});
Category.belongsToMany(Product, {
  through: 'product_category',
});
Product.hasMany(Image, {
});
Image.belongsTo(Product);

module.exports = {
  conn: sequelize,
  Category,
  Product,
  Image,
};
