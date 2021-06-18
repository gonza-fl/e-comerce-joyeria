const {
  Cart,
} = require('../models/index');

const getOrders = (req, res) => {
  let {
    status,
  } = req.query;
  if (!status) status = ['Cart', 'DeliveryPending', 'Delivered'];
  try {
    const result = Cart.findAll({
      where: {
        status,
      },

    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
};
