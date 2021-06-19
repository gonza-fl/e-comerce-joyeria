/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

const {
  Order,
  User,
  Product,
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
      await user.addCart(cartNew);
      // Validación: ver si los productos a incorporar sí existen en la DB y si superan stock
      for (let i = 0; i < products.length; i++) {
        const prod = await Product.findOne({
          where: {
            id: products[i].id,
          },
        });
        if (!prod) return res.status(404).json(`No se encontro el producto ${prod}`);
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
    for (let i = 0; i < cart.products.length; i++) {
      const productIndex = products.findIndex((product) => parseInt(product.id) === cart.products[i].id);
      // Validación: se quiere incorporar un producto ya presente en el carrito?
      if (productIndex !== -1) {
        // Validación: Revisar si las cantidades de ese producto supera el stock
        if (cart.products[i].stockAmount < cart.products[i].orderline.amount + parseInt(products[productIndex].amount)) {
          return res.status(404).json(`El producto ${cart.products[i]} supera el stock`);
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
    for (let i = 0; i < products.length; i++) {
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
    return res.json(cart);
  } catch (err) {
    return res.status(500).json('hay un error');
  }
};

module.exports = {
  createOrFindAndUpdateCart,
};
