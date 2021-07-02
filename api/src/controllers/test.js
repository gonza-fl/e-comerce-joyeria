const {
  Order,
  Product,
} = require('../models/index');

const testAddingOrdersForChart = async (req, res) => {
  const {
    id,
    dateNum,
  } = req.body;
  try {
    const order = await Order.findOne({
      where: {
        id,
        status: 'cart',
      },
      include: Product,
    });
    if (!order) return res.status(404).send('no hay orden carrito');
    if (!order.products.length) return res.status(404).send('no hay productos en el carrito');
    const totalOrder = order.products.reduce(
      (total, current) => total + current.orderline.subtotal, 0,
    );

    order.total = totalOrder;
    const rndmDate = new Date(dateNum);
    order.endTimestamp = rndmDate;
    order.orderNumber = id;
    order.status = 'finished';
    await order.save();
    return res.json(order);
  } catch (err) {
    return res.status(500).send('Error');
  }
};
module.exports = {
  testAddingOrdersForChart,
};
