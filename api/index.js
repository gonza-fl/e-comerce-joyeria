/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const router = require('./src/routes/index');

const {
  conn,
} = require('./src/models/index');
const {
  PORT,
} = require('./src/utils/config/index');

require('dotenv').config();

const server = express();

server.use(express.urlencoded({
  extended: true, limit: '50mb',
}));
server.use(express.json({
  limit: '50mb',
}));
server.use(morgan('dev'));
server.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/api', router);

server.use((err, _req, res) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  return res.status(status).send(message);
});

conn.sync({
  force: false,
}).then(() => {
  // console.log('DB conectada');
  server.listen(process.env.PORT, () => {
    // console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});

module.exports = {
  server,
};
