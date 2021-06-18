/* eslint-disable no-await-in-loop */

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
  // eslint-disable-next-line prefer-const
  let [cart, created] = await Cart.findOrCreate({
    where: {
      status: 'carrito',
    },
    include: OrderLine,
  });

  if (created) {
    user.addCart(cart);
    user.save();
  }

  const results = [];
  for (let i = 0; i < req.body.products.length; i += 1) {
    // ESTO!
    if (req.body.products[i].amount === '' || req.body.products[i].id === '') {
      return res.status(400).json({
        err: 'Algunos campos no se enviaron correctamente',
      });
    }
    if (parseInt(req.body.products[i].amount, 10) < 0) {
      return res.status(400).json({
        err: 'La cantidad no puede ser negativa!',
      });
    }
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

  if (created || cart.orderlines === undefined || cart.orderlines == null) {
    // FLUJO: SI EL CART ES CREADO (O SI EXISTIA) Y NO TENIA ORDERLINES ASOCIADOS

    for (let i = 0; i < arrayProducts.length; i += 1) {
      const pro = await Product.findOne({
        where: {
          id: arrayProducts[i].id,
        },
      });

      if (pro == null) {
        return res.json({
          err: 'El producto no fue encontrado',
        });
      }
      // cart.addProduct(pro); funciona pero no agrega total o cantidad
      OrderLine.create({
        productId: pro.id,
        cartId: cart.id,
        price: parseFloat(pro.price, 10) * parseInt(req.body.products[i].amount, 10),
        amount: parseInt(req.body.products[i].amount, 10),
      });
    }

    // HAGO LAS NUEVAS ASOCIACIONES Y GUARDO EN BASE DE DATOS
    await cart.save();
    await user.addCart(cart);

    // BUSCO EL CART CON SUS ORDERLINES ACTUALIZADAS
    // si el cart queda como let, created tira error en eslint
    cart = await Cart.findOne({
      where: {
        status: 'carrito',
      },
      include: Product,
    });
    // ENVIO EL CARRO Y SUS ORDERLINES CON SUS PRODUCTOS AL FRONT
    return res.json({
      cart,
    });
  }
  // FLUJO: SI EL CART EXISTIA Y TENIA ORDERLINES ASOCIADOS
  // CORROBORO SI EXISTIA PREVIAMENTE EL PRODUCTO EN EL CARRO Y SI ES ASI LO SUMO AL ORDERLINE
  const idsguardados = [];

  for (let i = 0; i < cart.orderlines.length; i += 1) {
    for (let j = 0; j < arrayProducts.length; j += 1) {
      if (cart.orderlines[i].productId === arrayProducts[j].id) {
        idsguardados.push(arrayProducts[j].id);

        const obj = await OrderLine.findOne({
          where: {
            cartId: cart.id,
            productId: arrayProducts[j].id,
          },
        });

        // eslint-disable-next-line max-len
        if (parseInt(obj.amount, 10) + parseInt(req.body.products[j].amount, 10) > parseInt(arrayProducts[j].stockAmount, 10)) {
          return res.json({
            err: 'La cantidad no puede superar el stock',
          });
        }
        obj.amount = parseInt(obj.amount, 10) + parseInt(req.body.products[j].amount, 10);
        obj.price = parseInt(arrayProducts[j].price, 10) * obj.amount;
        await obj.save();
        // return '';
      }
    }
  }

  // SE CREA LA ORDER LINE CON SU RESPECTIVO PRODUCTO SI NO SE ENCONTRABA ASOCIADO.
  // ARREGLAR CUANDO CREEN EL MODELO ORDERLINE

  for (let i = 0; i < arrayProducts.length; i += 1) {
    if (!idsguardados.includes(arrayProducts[i].id)) {
      await OrderLine.create({
        productId: arrayProducts[i].id,
        cartId: cart.id,
        price: parseFloat(arrayProducts[i].price, 10) * parseInt(req.body.products[i].amount, 10),
        amount: parseInt(req.body.products[i].amount, 10),
      });
    }
  }

  // HAGO LAS NUEVAS ASOCIACIONES Y GUARDO EN BASE DE DATOS
  await cart.save();
  await user.addCart(cart);

  // BUSCO EL CART CON SUS ORDERLINES ACTUALIZADAS
  cart = await Cart.findOne({
    where: {
      status: 'carrito',
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
