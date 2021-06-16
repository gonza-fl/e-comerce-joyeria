// const OrderLine = require('../models/OrderLine');

const getOrderLines = (req, res) => {
  const {
    id,
  } = req.query;
  return res.status(200).json({
    id,
    message: 'Inicialización de la función',
  });
};

module.exports = {
  getOrderLines,
};
