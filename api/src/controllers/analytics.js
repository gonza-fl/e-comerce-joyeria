const {
  Order,
  User,
  Product,
} = require('../models/index');

const getOrdersForAnalytics = async (req, res) => {
  const {
    type,
  } = req.body;
  if (!type || !type.trim().length) return res.status(404).send('No se envió un tipo de estadística');
  if (type !== 'productAmountPerDate'
  && type !== 'totalsPerDateByUsers'
  && type !== 'totalsPerDate') return res.status(404).send('Tipo de estadística incorrecto');
  const statusTypes = ['paidPendingDispatch', 'deliveryInProgress', 'finished', 'canceled'];
  try {
    if (type === 'productAmountPerDate') {
      const orders = await Order.findAll({
        where: {
          status: statusTypes,
        },
        attributes: ['total', 'endTimestamp'],
        include: [{
          model: Product, attributes: ['name'],
        }],
      });
      if (!orders.length) return res.status(404).send('No se encontraron órdenes pagadas');
      return res.json(orders);
    }

    if (type === 'totalsPerDateByUsers') {
      const orders = await Order.findAll({
        where: {
          status: statusTypes,
        },
        attributes: ['total', 'endTimestamp'],
        include: [{
          model: User, attributes: ['displayName'],
        }],
      });
      if (!orders.length) return res.status(404).send('No se encontraron órdenes pagadas');
      return res.json(orders);
    }

    const orders = await Order.findAll({
      where: {
        status: statusTypes,
      },
      attributes: ['total', 'endTimestamp'],
    });
    if (!orders.length) return res.status(404).send('No se encontraron órdenes pagadas');

    return res.json(orders);
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};

module.exports = {
  getOrdersForAnalytics,
};
