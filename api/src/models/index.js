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
const AddressFactory = require('./Address');
const ImagesFactory = require('./Images');
const CartFactory = require('./Cart');
const UserFactory = require('./User');
const OrderLineFactory = require('./OrderLine');

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`, {
  logging: false,
});

const Category = CategoriesFactory(sequelize);
const Product = ProductsFactory(sequelize);
const Address = AddressFactory(sequelize);
const Image = ImagesFactory(sequelize);
const Cart = CartFactory(sequelize);
const User = UserFactory(sequelize);
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
User.hasMany(Cart);
Cart.belongsTo(User);
User.hasMany(Address);
Address.belongsTo(User);

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
