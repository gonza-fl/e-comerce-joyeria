const {
  Order,
  Product,
} = require('../models/index');
const {
  sortOrdersForAnalytics,
} = require('../helpers/functionHelpers');

const postOrdersForAnalytics = async (req, res) => {
  const {
    type,
    productId,
    userId,
  } = req.body;
  if (!type || !type.trim().length) return res.status(404).send('No se envió un tipo de estadística');
  if (type !== 'productAmountPerDate'
  && type !== 'totalsPerDateByUsers'
  && type !== 'totalsPerDate') return res.status(404).send('Tipo de estadística incorrecto');
  const statusTypes = ['paidPendingDispatch', 'deliveryInProgress', 'finished', 'canceled'];
  try {
    if (type === 'productAmountPerDate') {
      if (!productId) return res.status(404).send('No se envió un producto');
      const orders = await Order.findAll({
        where: {
          status: statusTypes,
        },
        attributes: ['total', 'endTimestamp'],
        include: [{
          model: Product,
          where: {
            id: productId,
          },
          attributes: ['id', 'name'],
        }],
      });
      if (!orders.length) return res.status(404).send('No se encontraron órdenes pagadas');
      return res.json(sortOrdersForAnalytics(orders));
    }

    if (type === 'totalsPerDateByUsers') {
      if (!userId || typeof userId !== 'string' || !userId.trim().length) return res.status(404).send('No se envió un usuario válido');
      const orders = await Order.findAll({
        where: {
          status: statusTypes,
          userId,
        },
        attributes: ['total', 'endTimestamp'],
      });
      if (!orders.length) return res.status(404).send('No se encontraron órdenes pagadas');

      return res.json(sortOrdersForAnalytics(orders));
    }

    const orders = await Order.findAll({
      where: {
        status: statusTypes,
      },
      attributes: ['total', 'endTimestamp'],
    });
    if (!orders.length) return res.status(404).send('No se encontraron órdenes pagadas');
    return res.json(sortOrdersForAnalytics(orders));
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};

module.exports = {
  postOrdersForAnalytics,
};
