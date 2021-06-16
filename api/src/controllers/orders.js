const {
  Cart,
  Product,
  // User,
} = require('../models/index');

const getSingleOrder = async (req, res) => {
  const {
    orderId,
  } = req.params;

  if (!orderId) {
    return res.status(404).json({
      err: 'El id de la orden no puede ser vacío',
    });
  }
  const id = parseInt(orderId, 10);
  if (Number.isNaN(id)) {
    return res.status(404).json({
      err: 'El id de la orden debe ser un numero',
    });
  }
  try {
    const singleOrder = await Cart.findByPk(id, {
      include: [
        // {
        //   model: User,
        // },
        {
          model: Product,
        },
      ],
    });
    if (!singleOrder) {
      return res.json({
        err: 'La orden no existe',
      });
    }
    return res.json(singleOrder);
  } catch {
    return res.status(500).json({
      err: 'Internal server error',
    });
  }
};

module.exports = {
  getSingleOrder,
};
