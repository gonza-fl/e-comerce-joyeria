/* eslint linebreak-style: ["error", "windows"] */
const {
  Cart,
  User,
  Orderline,
  Product,
} = require('../models/index');

const addItem = async (req, res) => {
  /*
  const cart = await Cart.create({
    total: req.body.total,
    orderNumber: 'generar',
  }); */
  // primero busco el usuario en la base de datos
  const user = await User.findOne({
    where: {
      id: req.body.id,
    },
    include: Cart,
  });
  // si no lo encuentro mando un error
  if (user == null) {
    return res.json({
      err: 'El usuario no existe',
    });
  }
  // busco si hay un carrito previamente creado del usuario
  let bandera = false;
  for (let i = 0; i < user.carts.length; i += 1) {
    if (user.carts[i].status === 'creada') {
      bandera = true;
      break;
    }
  }
  // encuentro el carrito previamente creado

  let cart;
  if (bandera) {
    cart = await Cart.findOne({
      where: {
        status: 'creada',
      },
    });
  }
  // SI NO TENE CARRITO PREVIAMENTE CREADO, SE CREA UNO Y SE LO DA AL FRONT

  cart = await Cart.create({

  });

  // encuentro los productos enviado desde el front
  const results = [];
  for (let i = 0; i < req.body.products.length; i += 1) {
    results.push(Product.findOne({
      where: {
        id: req.body.products[i].id,
      },
    }));
  }
  // esto lo tuve que hacer porque sino el eslint tira error
  const arrayProducts = await Promise.all(results);
  // corroboro que existan y tengan stock disponible, SI NO HAY MANDA ERROR
  for (let i = 0; i < arrayProducts.length; i += 1) {
    if (arrayProducts[i] == null) {
      return res.json({
        err: 'El producto '.concat(req.body.products[i].name).concat(' no fue encontrado'),
      });
    }
    if (arrayProducts[i].stockAmount < req.body.products[i].amount) {
      return res.json({
        err: 'La cantidad solicitada de '.concat(arrayProducts[i].name).concat(' supera el stock disponible'),
      });
    }
  }
  // SE CREA LA ORDER LINE CON SUS PRODUCTOS ASOCIADOS.
  // ARREGLAR CUANDO CREEN EL MODELO ORDERLINE
  const resultsOrderlines = [];
  for (let i = 0; i < arrayProducts.length; i += 1) {
    resultsOrderlines.push(Orderline.create({
      price: arrayProducts[i].price,
      quantity: req.body.products[i].quantity,
      name: arrayProducts[i].name,
      total: (arrayProducts[i].price * req.body.products[i].quantity),
    }));
  }

  const arrayOrderlines = await Promise.all(resultsOrderlines);
  // AGREGO A CADA ORDERLINE EL CARRITO ASOCIADO
  for (let i = 0; i < arrayOrderlines.length; i += 1) {
    arrayOrderlines[i].addCart(cart);
  }
  cart.addUser(user);
  return res.json({
    cart,
  });
};

module.exports = {
  addItem,
};
