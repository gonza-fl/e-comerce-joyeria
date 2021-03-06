const {
  Sequelize,
} = require('sequelize');

const {
  dbUser,
  dbName,
  dbNameTest,
  dbHost,
  dbPassword,
} = require('../utils/config/index');

const CategoriesFactory = require('./Categories');
const ProductsFactory = require('./Products');
const AddressFactory = require('./Address');
const ImagesFactory = require('./Images');
const OrderFactory = require('./Order');
const UserFactory = require('./User');
const OrderLineFactory = require('./OrderLine');
const ReviewFactory = require('./Reviews');

const sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize({
    database: dbName,
    dialect: 'postgres',
    hots: dbHost,
    port: 5432,
    username: dbUser,
    password: dbPassword,
    pool: {
      max: 3,
      min: 1,
      idle: 10000,
    },
    dialectOpcions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
  })

  : new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${process.env.NODE_ENV === 'test' ? dbNameTest : dbName}`, {
    logging: false,
  });

const Category = CategoriesFactory(sequelize);
const Product = ProductsFactory(sequelize);
const Address = AddressFactory(sequelize);
const Image = ImagesFactory(sequelize);
const Order = OrderFactory(sequelize);
const User = UserFactory(sequelize);
const OrderLine = OrderLineFactory(sequelize);
const Review = ReviewFactory(sequelize);

Product.belongsToMany(Category, {
  through: 'product_category',
});
Category.belongsToMany(Product, {
  through: 'product_category',
});

Product.hasMany(Image);
Image.belongsTo(Product);

User.hasMany(Address);
Address.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, {
  through: OrderLine,
});
Order.belongsToMany(Product, {
  through: OrderLine,
});

Product.hasMany(Review);
Review.belongsTo(Product);

Review.belongsTo(User);
User.hasMany(Review);

Address.hasMany(Order);
Order.belongsTo(Address);

module.exports = {
  conn: sequelize,
  Category,
  Product,
  Image,
  Order,
  OrderLine,
  User,
  Address,
  Review,
};
