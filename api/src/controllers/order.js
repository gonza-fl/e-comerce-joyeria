/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable radix */
const {
  transporter,
  templateComprobantedepago,
} = require('../helpers/nodeMailer');

const {
  Order,
  User,
  Product,
  Image,
  OrderLine,
} = require('../models/index');
const {
  verifyNumber,
} = require('../helpers/functionHelpers');

const createOrFindAndUpdateCart = async (req, res) => {
  // REVISAR SI EL FRONT MANDA AMOUNTS HECHAS INTEGER Y NO STRING
  // SI ESO SUCEDE QUITAR LOS PARSEINT
  const {
    id,
  } = req.body;
  let {
    products,
  } = req.body;
  if (!id) return res.status(404).send('ID no existe!');
  if (!products) products = [];
  try {
    // Validación: existe ese usuario?
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send('El usuario no existe!');
    // Validación: ese usuario, tiene una orden de tipo carrito?
    const cart = await Order.findOne({
      where: {
        status: 'cart',
        userId: user.id,
      },
      include: Product,
    });
    // A) El usuario no tiene carrito: crearlo y cargarle los productos
    if (!cart) {
      const cartNew = await Order.create({
        status: 'cart',
      });
      await user.addOrder(cartNew);
      // Validación: ver si los productos a incorporar sí existen en la DB y si superan stock
      for (let i = 0; i < products.length; i += 1) {
        if (!verifyNumber(products[i].amount).veracity) { return res.status(400).send(verifyNumber(products[i].amount, 'monto').msg); }
        let total = products[i].amount;
        const prod = await Product.findByPk(products[i].id);
        if (!prod) return res.status(404).send(`No se encontro el producto de id ${products[i].id}`);
        if (prod.stockAmount < parseInt(products[i].amount)) {
          total = prod.stockAmount;
        }
        await cartNew.addProduct(prod, {
          through: {
            amount: parseInt(total),
            subtotal: parseInt(total) * prod.price,
          },
        });
      }

      const cartNewFound = await Order.findByPk(cartNew.id, {
        include: Product,
      });
      // Fin A: El usuario ahora sí tiene un carrito con sus productos cargados
      return res.json(cartNewFound);
    }
    // B) El usuario sí tiene carrito: recorrer sus productos cargados
    for (let i = 0; i < cart.products.length; i += 1) {
      const productIndex = products.findIndex(
        (product) => parseInt(product.id) === cart.products[i].id,
      );
      // Validación: se quiere incorporar un producto ya presente en el carrito?
      if (productIndex !== -1) {
        // Validación: Revisar si las cantidades de ese producto supera el stock
        if (!verifyNumber(products[productIndex].amount).veracity) return res.status(400).send(verifyNumber(products[productIndex].amount, 'monto').msg);

        if (cart.products[i].stockAmount
          < cart.products[i].orderline.amount + parseInt(products[productIndex].amount)) {
          return res.status(404).send(`El producto ${cart.products[i].name} supera el stock`);
        }

        // Actualizar su cantidad
        await cart.addProduct(cart.products[i], {
          through: {
            amount: cart.products[i].orderline.amount + parseInt(products[productIndex].amount),
          },
        });
        // tomar la cantidad actualizada y actualizar el subtotal
        const updatedCart = await Order.findByPk(cart.id, {
          include: Product,
        });
        await cart.addProduct(cart.products[i], {
          through: {
            subtotal: updatedCart.products[i].orderline.amount * updatedCart.products[i].price,
          },
        });
        products.splice(productIndex, 1);
      }
    }
    // Los productos ya presentes en el carrito fueron spliceados, recorrer los nuevos para agregar
    for (let i = 0; i < products.length; i += 1) {
      if (!verifyNumber(products[i].amount).veracity) return res.status(400).send(verifyNumber(products[i].amount, 'monto').msg);

      let total = products[i].amount;
      const prod = await Product.findByPk(products[i].id);
      if (!prod) return res.status(404).send(`No se encontro el producto ${prod}`);
      if (prod.stockAmount < parseInt(products[i].amount)) {
        total = prod.stockAmount;
      }
      await cart.addProduct(prod, {
        through: {
          amount: parseInt(total),
          subtotal: parseInt(total) * prod.price,
        },
      });
    }
    const finalCart = await Order.findByPk(cart.id, {
      include: Product,
    });
    return res.json(finalCart);
  } catch (err) {
    return res.status(500).send('Internal server error. Carrito no encontrado ni creado');
  }
};

const modifyOrder = async (req, res) => {
  const {
    id,
  } = req.params;
  const {
    status,
  } = req.body;
  try {
    if (status !== 'deliveryPending' && status !== 'delivered') {
      return res.status(400).send('No se puede implemetar ese status!');
    }
    // Si el status es deliveryPending busca carrito, sino lo buscara como deliveryPending
    const statusSearch = status === 'deliveryPending' ? 'cart' : 'deliveryPending';
    const order = await Order.findOne({
      where: {
        id,
        status: statusSearch,
      },
      include: Product,
    });
    if (status === 'deliveryPending') {
      if (!order) return res.status(404).send(`La orden id ${id} no posee un carrito`);
      if (order.products.length === 0) return res.status(400).send('La orden no tiene productos.');
      const totalOrder = order.products.reduce(
        (total, current) => total + current.orderline.subtotal, 0,
      );
      order.status = status;
      order.total = totalOrder;
      order.endTimestamp = new Date();
      await order.save();
      return res.send('La orden fue correctamente modificada!');
    }
    if (status === 'delivered') {
      if (!order) return res.status(404).send(`La orden id ${id} no tiene una orden pendiente!`);
      order.status = status;
      order.endTimestamp = new Date();
      await order.save();
      return res.send('La orden fue correctamente modificada!');
    }
    return res.status(404).send('Error');
  } catch (err) {
    return res.status(500).send('Internal server error. Orden no fue modificada');
  }
};

const editCartAmount = async (req, res) => {
  const {
    idUser,
  } = req.params;
  const {
    product,
    action,
  } = req.body;
  try {
    if (action !== 'sum' && action !== 'substract' && action !== 'set') return res.status(404).send('No existe esa acción');
    const cart = await Order.findOne({
      where: {
        userId: idUser,
        status: 'cart',
      },
      include: Product,
    });
    if (!cart) return res.status(404).send('no existe el user id');
    const productSearch = cart.products.find((prod) => prod.id === product.id);
    if (!productSearch) return res.status(404).send('ese producto no existe en la base de datos');
    if ((action === 'sum' && productSearch.stockAmount < productSearch.orderline.amount + 1)
      || (action === 'substract' && productSearch.orderline.amount - 1 < 0)
      || (action === 'set' && (productSearch.stockAmount < product.amount || product.amount < 0))) {
      return res.status(400).send();
    }
    let updatedAmount = 0;
    switch (action) {
      case 'sum':
        updatedAmount = productSearch.orderline.amount + 1;
        break;
      case 'substract':
        updatedAmount = productSearch.orderline.amount - 1;
        break;
      default:
        updatedAmount = product.amount;
        break;
    }
    await cart.addProduct(productSearch, {
      through: {
        amount: updatedAmount,
        subtotal: updatedAmount * productSearch.price,
      },
    });
    const updatedCart = await Order.findOne({
      where: {
        userId: idUser,
        status: 'cart',
      },
      include: Product,
    });
    return res.json(updatedCart);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const emptyCartOrProduct = async (req, res) => {
  // primero busco el usuario en la base de datos
  const {
    id,
    product,
  } = req.body;
  if (!id) return res.status(404).send('el id no existe!');
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send('El usuario no existe!');
    const order = await Order.findOne({
      where: {
        status: 'cart',
        userId: user.id,
      },
      include: Product,
    });
    // si no existe carrito activo mando error
    if (!order) return res.status(404).send('No hay ninguna orden');
    // si llega un producto es para eliminar ese producto especifico del carrito
    if (product) {
      const productFound = order.products.find((prod) => prod.id === product.id);
      if (!productFound) return res.status(404).send('El producto no existe');
      await order.removeProduct(productFound);
      return res.send('Producto eliminado correctamente!');
    }
    // ahora se vacía el carrito
    for (let i = 0; i < order.products.length; i += 1) {
      await order.removeProduct(order.products[i]);
    }
    return res.send('se vacio el carrito!');
  } catch (err) { return res.status(500).send('Internal server error. Producto no eliminado'); }
};

const getOrders = async (req, res) => {
  let {
    status,
  } = req.query;
  if (!status) status = ['cart', 'deliveryPending', 'delivered'];
  try {
    const result = await Order.findAll({
      where: {
        status,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send('Internal server error. Ordenes no obtenidas');
  }
};

const getCartByUser = async (req, res) => {
  const {
    id,
  } = req.params;
  try {
    const response = await Order.findAll({
      include: [{
        model: Product,
        include: Image,
      }],
      where: {
        userId: id,
        status: 'cart',
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send('Internal server error. Carrito no obtenido');
  }
};

const getOrderById = async (req, res) => {
  const {
    orderId,
  } = req.params;

  if (!orderId) return res.status(404).send('El id de la orden no puede ser vacío');
  const id = parseInt(orderId, 10);
  if (Number.isNaN(id)) return res.status(404).send('El id de la orden debe ser un numero');
  try {
    const singleOrder = await Order.findByPk(id, {
      include: [User, Product],
    });
    if (!singleOrder) return res.status(404).send('La orden no existe');
    return res.json(singleOrder);
  } catch (err) {
    return res.status(500).send('Internal server error. Orden no encontrada');
  }
};

const getAllOrdersByIdUser = async (req, res) => {
  const {
    idUser,
  } = req.params;
  try {
    const result = await Order.findAll({
      where: {
        userId: idUser,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

const testNodeMailer = async (req, res) => {
  // Endpoint con finalidad de testeo, emulando una compra realizada
  // se debe tener un carro hardcodeado con estado deliveryPending

  // busco el usuario correspondiente
  const user = await User.findOne({
    where: {
      id: req.body.user.id,
    },
    include: Order,
  });

  const arrProducts = [];
  let orden = '';
  let total = '';
  // busco el carro con estado deliveryPending y guardo sus datos

  // pd: no hara falta buscar el carro en el endpoint checkout
  // ya que al cerrar el carro en ese mismo momento se manda el mail
  for (let i = 0; i < user.orders.length; i += 1) {
    if (user.orders[i].status === 'deliveryPending') {
      const carrito = await Order.findOne({
        where: {
          userId: req.body.user.id,
          status: 'deliveryPending',
        },
      });

      orden = carrito.orderNumber;
      total = carrito.total;

      const lines = await OrderLine.findAll({
        where: {
          orderId: carrito.id,
        },
      });

      for (let j = 0; j < lines.length; j += 1) {
        const prod = await Product.findOne({
          where: {
            id: lines[j].productId,
          },
        });

        arrProducts.push({
          nameProducto: prod.name,
          cantidad: lines[j].amount,
          precioUnitario: lines[j].subtotal,
        });
      }
      break;
    }
  }
  // se formatea la data para el template
  const data = { // traer de redux usuario
    // { id: user.uid, email: user.email, name: user.displayName || 'Usuario' }
    name: req.body.user.name,
    email: req.body.user.email,
    orden,
    productos: arrProducts,
    total,
  };
  // se reemplaza en el template compilado los datos de usuario
  const result = templateComprobantedepago(data);
  // se envia el mail
  transporter.sendMail({
    from: 'Kamora <adaclothes@hotmail.com>',
    to: data.email,
    subject: 'Compra realizada!',
    html: result,
  // eslint-disable-next-line consistent-return
  }, (err2, responseStatus) => {
    if (err2) {
      return res.json({
        err: err2,
      });
    }
    res.json({
      response: 'mensaje enviado',
      responseStatus,
    });
  });
};

module.exports = {
  createOrFindAndUpdateCart,
  modifyOrder,
  editCartAmount,
  emptyCartOrProduct,
  getOrders,
  getCartByUser,
  getOrderById,
  getAllOrdersByIdUser,
  testNodeMailer,
};
