require('dotenv').config();

module.exports = {
  dbUser: process.env.DB_USER || 'postgres',
  dbName: process.env.DB_NAME || 'joyas',
  dbPort: process.env.DB_PORT || '5432',
  dbHost: process.env.HOST || 'localhost'
  dbPassword: process.env.DB_PASSWORD || '12345',
  PORT: process.env.PORT || 3001,
};
