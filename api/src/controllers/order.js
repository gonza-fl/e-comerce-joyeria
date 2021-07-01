/* eslint-disable no-await-in-loop */
/* eslint-disable radix */
const {
  transporter,
  templateComprobantedepago,
  templateOrdenDespachada,
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

// eslint-disable-next-line consistent-return

const modifyOrder = async (req, res) => {
  const {
    id,
  } = req.params;
  const {
    status,
  } = req.body;
  try { // el estado cart no se usa, el admin no deberia poder crear carritos.
    const arr = ['paidPendingDispatch', 'deliveryInProgress', 'finished', 'canceled'];
    // si el status nuevo no se encuentra en el array no existe y devuelve error
    if (!arr.includes(status)) {
      return res.status(400).send('No se puede implemetar ese status!');
}
    // se buscar el carrito asociado al id que viene por parametro
    const order = await Order.findOne({
      where: {
        id,
      },
      include: Product,
    });
    // return res.status(200).send(':v');
    // si no lo encuentra manda error
    if (order === null) {
      return res.status(404).send(`La orden id ${id} no posee un carrito`);
    }
    // no se puede poner en el carro un estado que ya tebia
    if (order.status === status) {
      return res.status(404).send(`La orden ya tenia el estado ${status}`);
    }
    // flujo carro: cart > PaidPendingDispatch > deliveryInProgress > finished > canceled
    if (status === 'paidPendingDispatch') {
      // return res.status(200).send(':v');
      if (order.status === 'deliveryInProgress'
          || order.status === 'finished'
          || order.status === 'canceled') {
        return res.status(404).send('Error. No puedes alterar el flujo del carro');
      }
      // return res.status(200).send(':v');
      // falta restar del stock y validaciones
      if (order.products.length === 0) return res.status(400).send('La orden no tiene productos.');
      const totalOrder = order.products.reduce(
        (total, current) => total + current.orderline.subtotal, 0,
      );
      // formateo los productos para enviar el comprobante de venta
      const arrProducts = [];
      const arrADescontar = [];

      order.products.forEach((prod) => {
        arrProducts.push({
          nameProducto: prod.name,
          cantidad: prod.orderline.amount,
          precioUnitario: prod.price,
        });

        arrADescontar.push({
          id: prod.id,
          cantidad: prod.orderline.amount,
        });
      });

      // actualizo el carro
      // COMENTAR STATUS PARA TESTEAR ASI NO LO CAMBIA EN LA BASE DE DATOS
      order.status = status;
      order.total = totalOrder;
      order.endTimestamp = new Date();
      order.orderNumber = id;
      await order.save();

      // descuento del stock del producto la cantidad necesaria
      for (let i = 0; i < arrADescontar.length; i += 1) {
        const prod = await Product.findOne({
          where: {
            id: arrADescontar[i].id,
          },
        });
        // si la cantidad supera el stock manda error
        if (arrADescontar[i].cantidad > prod.stockAmount) {
          return res.status(404).send(`La cantidad del producto ${prod.name} super el stock`);
        }

        prod.stockAmount -= arrADescontar[i].cantidad;
        await prod.save();
      }

      // resto los productos del stockamount

      // busco el user asociado al cart
      const user = await User.findOne({
        where: {
          id: order.userId,
        },
      });

      if (!user) return res.status(404).send('Usuario no encontraod');

      // formateo la data para el template email
      const data = {
        name: user.name,
        email: user.email,
        orden: id,
        productos: arrProducts,
        total: totalOrder,
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
      // eslint-disable-next-line no-unused-vars
      }, (err, responseStatus) => {
        if (err) {
          return res.status(400).send('Hubo un error');
        }
        return res.send('La orden fue correctamente modificada!');
      });
      // return res.json(order);
    } else if (status === 'deliveryInProgress') {
      if (order.status === 'cart'
          || order.status === 'finished'
          || order.status === 'canceled') {
        return res.status(404).send('Error. No puedes alterar el flujo del carro');
      }
      // order.status = status;
      order.endTimestamp = new Date();
      await order.save();

      const user = await User.findOne({
        where: {
          id: order.userId,
        },
      });

      const result = templateOrdenDespachada();
      // se envia el mail
      transporter.sendMail({
        from: 'Kamora <adaclothes@hotmail.com>',
        to: user.email,
        subject: 'Su orden fue despachada!',
        html: result,
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-unused-vars
      }, (err, responseStatus) => {
        if (err) {
          return res.status(400).send('Hubo un error');
        }
        return res.send('La orden fue correctamente modificada!');
      });
    } else if (status === 'finished') {
      if (order.status === 'cart'
          || order.status === 'canceled'
          || order.status === 'paidPendingDispatch') {
        return res.status(404).send('Error. No puedes alterar el flujo del carro');
      }
      order.status = status;
      // order.endTimestamp = new Date();
      await order.save();

      return res.send('La orden fue correctamente modificada!');
    } else if (status === 'canceled') {
      if (order.status === 'cart'
          || order.status === 'deliveryInProgress'
          || order.status === 'finished') {
        return res.status(404).send('Error. No puedes alterar el flujo del carro');
      }
      order.status = status;
      // order.endTimestamp = new Date();
      await order.save();

      return res.send('La orden fue correctamente modificada!');
    } else {
      return res.status(404).send('Error');
    }
  } catch (err) {
    // return res.status(500).send('Internal server error. Orden no fue modificada');
    return res.json({
      err,
    });
  }
  return 'me pedia eslint que retorne algo, no sabia que poner, cambiar!';
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
    // se buscar el carrito asociado al id que viene por parametro
    const order = await Order.findOne({
      where: {
        id,
      },
      include: Product,
    });
    // return res.status(200).send(':v');
    // si no lo encuentra manda error
    if (order === null) {
      return res.status(404).send(`La orden id ${id} no posee un carrito`);
    }
    // no se puede poner en el carro un estado que ya tebia
    if (order.status === status) {
      return res.status(404).send(`La orden ya tenia el estado ${status}`);
    }
    // flujo carro: cart > PaidPendingDispatch > deliveryInProgress > finished > canceled
    if (status === 'paidPendingDispatch') {
      // return res.status(200).send(':v');
      if (order.status === 'deliveryInProgress'
          || order.status === 'finished'
          || order.status === 'canceled') {
        return res.status(404).send('Error. No puedes alterar el flujo del carro');
      }
      // return res.status(200).send(':v');
      // falta restar del stock y validaciones
      if (order.products.length === 0) return res.status(400).send('La orden no tiene productos.');
      const totalOrder = order.products.reduce(
        (total, current) => total + current.orderline.subtotal, 0,
      );
      // formateo los productos para enviar el comprobante de venta
      const arrProducts = [];
      const arrADescontar = [];

      order.products.forEach((prod) => {
        arrProducts.push({
          nameProducto: prod.name,
          cantidad: prod.orderline.amount,
          precioUnitario: prod.price,
        });

        arrADescontar.push({
          id: prod.id,
          cantidad: prod.orderline.amount,
        });
      });

      // actualizo el carro
      // COMENTAR STATUS PARA TESTEAR ASI NO LO CAMBIA EN LA BASE DE DATOS
      order.status = status;
      order.total = totalOrder;
      order.endTimestamp = new Date();
      order.orderNumber = id;
      await order.save();

      // descuento del stock del producto la cantidad necesaria
      for (let i = 0; i < arrADescontar.length; i += 1) {
        const prod = await Product.findOne({
          where: {
            id: arrADescontar[i].id,
          },
        });
        // si la cantidad supera el stock manda error
        if (arrADescontar[i].cantidad > prod.stockAmount) {
          return res.status(404).send(`La cantidad del producto ${prod.name} super el stock`);
        }

        prod.stockAmount -= arrADescontar[i].cantidad;
        await prod.save();
      }

module.exports = {
  createOrFindAndUpdateCart,
  modifyOrder,
  editCartAmount,
  emptyCartOrProduct,
  getAllOrdersNotCart,
  getCartByUser,
  getOrderById,
  getAllOrdersByIdUser,
  testNodeMailer,
};
