/* eslint-disable no-await-in-loop */
/* eslint-disable radix */

const {
  Order,
  User,
  Product,
  OrderLine,
} = require('../models/index');

const createOrFindAndUpdateCart = async (req, res) => {
  // REVISAR SI EL FRONT MANDA AMOUNTS HECHAS INTEGER Y NO STRING
  // SI ESO SUCEDE QUITAR LOS PARSEINT
  const {
    id,
    products,
  } = req.body;
  try {
    // Validación: existe ese usuario?
    const user = await User.findOne({
      where: {
        id,
      },
      include: Order,
    });
    if (!user) return res.status(404).json(' no existe!');
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
        const prod = await Product.findOne({
          where: {
            id: products[i].id,
          },
        });
        if (!prod) return res.status(404).json(`No se encontro el producto de id ${products[i].id}`);
        if (prod.stockAmount < parseInt(products.amount)) {
          return res.status(404).json('El producto supera el stock');
        }
        await cartNew.addProduct(prod, {
          through: {
            amount: parseInt(products[i].amount),
            subtotal: parseInt(products[i].amount) * prod.price,
          },
        });
      }

      const cartNewFound = await Order.findOne({
        where: {
          id: cartNew.id,
        },
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
        if (cart.products[i].stockAmount
          < cart.products[i].orderline.amount + parseInt(products[productIndex].amount)) {
          return res.status(404).json(`El producto ${cart.products[i].name} supera el stock`);
        }
        // Actualizar su cantidad
        await cart.addProduct(cart.products[i], {
          through: {
            amount: cart.products[i].orderline.amount + parseInt(products[productIndex].amount),
          },
        });
        // tomar la cantidad actualizada y actualizar el subtotal
        const updatedCart = await Order.findOne({
          where: {
            id: cart.id,
          },
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
      const prod = await Product.findOne({
        where: {
          id: products[i].id,
        },
      });
      if (!prod) return res.status(404).json(`No se encontro el producto ${prod}`);
      if (prod.stockAmount < parseInt(products.amount)) {
        return res.status(404).json('El producto supera el stock');
      }
      await cart.addProduct(prod, {
        through: {
          amount: parseInt(products[i].amount),
          subtotal: parseInt(products[i].amount) * prod.price,
        },
      });
    }
    const finalCart = await Order.findOne({
      where: {
        id: cart.id,
      },
      include: Product,
    });
    return res.json(finalCart);
  } catch (err) {
    return res.status(500).json('hay un error');
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
      return res.status(400).json({
        err: 'No se puede implemetar ese status!',
      });
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
      if (!order) {
        return res.status(404).json({
          err: `La orden id ${id} no posee un carrito`,
        });
      }
      if (order.products.length === 0) {
        return res.status(400).json({
          err: 'La orden no tiene productos.',
        });
      }
      const totalOrder = order.products.reduce(
        (total, current) => total + current.orderline.subtotal, 0,
      );
      order.status = status;
      order.total = totalOrder;
      order.endTimestamp = new Date();
      await order.save();
      return res.json(order);
    }
    if (status === 'delivered') {
      if (!order) {
        return res.status(404).json({
          err: `La orden id ${id} no tiene una orden pendiente!`,
        });
      }
      order.status = status;
      order.endTimestamp = new Date();
      await order.save();
      return res.json(order);
    }
    return res.sendStatus(404);
  } catch (err) {
    return res.status(500).json(err);
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
    if (action !== 'sum' && action !== 'substract' && action !== 'set') return res.status(400).json('No existe esa acción');
    const cart = await Order.findOne({
      where: {
        userId: idUser,
        status: 'cart',
      },
      include: Product,
    });
    if (!cart) return res.status(404).json('no existe el user id');
    const productSearch = cart.products.find((prod) => prod.id === product.id);
    if (!productSearch) return res.status(404).json('ese producto no existe en la base de datos');
    if ((action === 'sum' && productSearch.stockAmount < productSearch.orderline.amount + 1)
      || (action === 'substract' && productSearch.orderline.amount - 1 < 0)
      || (action === 'set' && (productSearch.stockAmount < product.amount || product.amount < 0))) {
      return res.sendStatus(400);
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
    return res.status(400).json({
      err,
    });
  }
};

const vaciarCarro = async (req, res) => {
  // primero busco el usuario en la base de datos
  if (req.body.id == null || req.body.id === undefined) {
    return res.json({
      err: 'No hay id',
    });
  }

  const user = await User.findOne({
    where: {
      id: req.body.id,
    },
  });

  // si no lo encuentro mando un error
  if (user == null) {
    return res.json({
      err: 'El usuario no existe',
    });
  }
  // busco el carrito activo del user
  const order = await Order.findOne({
    where: {
      status: 'cart',
      userId: user.id,
    },
  });
  // si no existe carrito activo mando error
  if (order == null) {
    return res.json({
      err: 'No tiene carritos activos',
    });
  }
  // busco todas las orderlines asociadas al carro
  const ordersArray = await OrderLine.findAll({
    where: {
      orderId: order.id,
    },
  });
  // si existen las borro, si no hay carrito activo pero no hay orderlines no hago nada
  if (ordersArray.length > 0) {
    for (let i = 0; i < ordersArray.length; i += 1) {
      await ordersArray[i].destroy();
    }
  }

  return res.json({
    success: 'carrito vaciado',
  });
};

module.exports = {
  createOrFindAndUpdateCart,
  modifyOrder,
  editCartAmount,
  vaciarCarro,
};
