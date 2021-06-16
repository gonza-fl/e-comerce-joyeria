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
const CartFactory = require('./Cart');
const OrderLineFactory = require('./OrderLine');

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`, {
  logging: false,
});

const Category = CategoriesFactory(sequelize);
const Product = ProductsFactory(sequelize);
const Image = ImagesFactory(sequelize);
const Cart = CartFactory(sequelize);
const OrderLine = OrderLineFactory(sequelize);

Product.belongsToMany(Category, {
  through: 'product_category',
});
Category.belongsToMany(Product, {
  through: 'product_category',
});

Product.hasMany(Image, {
});

Image.belongsTo(Product);
Product.belongsToMany(Cart, {
  through: OrderLine,
});
Cart.belongsToMany(Product, {
  through: OrderLine,
});

module.exports = {
  conn: sequelize,
  Category,
  Product,
  Image,
  Cart,
};
