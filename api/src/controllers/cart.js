/* eslint linebreak-style: ["error", "windows"] */
const {
  Cart,
  User,
  OrderLine,
  Product,
} = require('../models/index');

const addItem = async (req, res) => {
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
  // busco si hay un carrito previamente creado del usuario sino crea uno nuevo
  let cart = await Cart.findOrCreate({
    where: {
      status: 'carrito',
      include: OrderLine,
    },
  });

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
  // CORROBORO SI EXISTIA PREVIAMENTE EL PRODUCTO EN EL CARRO Y SI ES ASI LO SUMO AL ORDERLINE
  const idsguardados = [];
  for (let i = 0; i < cart.orderLines.length; i += 1) {
    for (let j = 0; j < arrayProducts.length; j += 1) {
      if (cart.orderLines[i].productId === arrayProducts[j].id) {
        idsguardados.push(arrayProducts[j].id);

        OrderLine.findOne({
          where: {
            id: cart.orderLines[i].id,
          },
        }).then(async (obj) => {
          if (obj.quantity + req.body.products[i].amount > arrayProducts[i].stockAmount) {
            return res.json({
              err: 'La cantidad no puede superar el stock',
            });
          }
          obj.quantity += req.body.products[i].amount;
          await obj.save();
          return '';
        });
      }
    }
  }
  // SE CREA LA ORDER LINE CON SU RESPECTIVO PRODUCTO SI NO SE ENCONTRABA ASOCIADO.
  // ARREGLAR CUANDO CREEN EL MODELO ORDERLINE
  const resultsOrderLines = [];
  for (let i = 0; i < arrayProducts.length; i += 1) {
    if (!idsguardados.includes(arrayProducts[i].id)) {
      resultsOrderLines.push(OrderLine.create({
        price: arrayProducts[i].price,
        quantity: req.body.products[i].quantity,
        name: arrayProducts[i].name,
        total: (arrayProducts[i].price * req.body.products[i].quantity),
      }));
    }
  }

  const arrayOrderLines = await Promise.all(resultsOrderLines);
  // AGREGO A CADA ORDERLINE EL CARRITO ASOCIADO
  for (let i = 0; i < arrayOrderLines.length; i += 1) {
    arrayOrderLines[i].addCart(cart);
  }
  // HAGO LAS NUEVAS ASOCIACIONES Y GUARDO EN BASE DE DATOS

  cart.addUser(user);

  await cart.save();
  // BUSCO EL CART CON SUS ORDERLINES ACTUALIZADAS
  cart = await Cart.findOne({
    where: {
      status: 'creada',
    },
    include: Product,
  });
  // ENVIO EL CARRO Y SUS ORDERLINES CON SUS PRODUCTOS AL FRONT
  return res.json({
    cart,
  });
};

module.exports = {
  addItem,
};
