/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

const {
  Cart,
  User,
  Product,
} = require('../models/index');

const addItem = async (req, res) => {
  const {
    id,
    products,
  } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
      include: Cart,
    });
    if (!user) return res.json(' no existe!');
    const cart = await Cart.findOne({
      where: {
        status: 'carrito',
        userId: user.id,
      },
      include: Product,
    });
    if (!cart) {
      const cartNew = await Cart.create({
        status: 'carrito',
      });
      await user.addCart(cartNew);
      for (let i = 0; i < products.length; i++) {
        const prod = await Product.findOne({
          where: {
            id: products[i].id,
          },
        });
        if (!prod) {
          return res.status(404).json({
            err: `No se encontro el producto ${prod}`,
          });
        }
        if (prod.stockAmount < parseInt(products.amount)) {
          return res.status(404).json({
            err: 'El producto supera el stock',
          });
        }
        await cartNew.addProduct(prod, {
          through: {
            amount: parseInt(products[i].amount),
            price: parseInt(products[i].amount) * prod.price,
          },
        });
      }

      const cartNewFound = await Cart.findOne({
        where: {
          id: cartNew.id,
        },
        include: Product,
      });
      return res.json(cartNewFound);
    }
    // ACÁ TERMINA!
    for (let i = 0; i < cart.products.length; i++) {
      const productIndex = products.findIndex((product) => parseInt(product.id) === cart.products[i].id);
      if (productIndex !== -1) {
        // lo encontro , hay q aumentar la cantidad
        if (cart.products[i].stockAmount < cart.products[i].orderline.amount + parseInt(products[productIndex].amount)) {
          return res.status(404).json({
            err: 'El producto supera el stock',
          });
        }

        await cart.addProduct(cart.products[i], {
          through: {
            amount: cart.products[i].orderline.amount + parseInt(products[productIndex].amount),
          },
        });
        const updatedCart = await Cart.findOne({
          where: {
            id: cart.id,
          },
          include: Product,
        });
        await cart.addProduct(cart.products[i], {
          through: {
            price: updatedCart.products[i].orderline.amount * updatedCart.products[i].price,
          },
        });
        products.splice(productIndex, 1);
      }
    }
    for (let i = 0; i < products.length; i++) {
      const prod = await Product.findOne({
        where: {
          id: products[i].id,
        },
      });
      if (!prod) {
        return res.status(404).json({
          err: `No se encontro el producto ${prod}`,
        });
      }
      if (prod.stockAmount < parseInt(products.amount)) {
        return res.status(404).json({
          err: 'El producto supera el stock',
        });
      }
      await cart.addProduct(prod, {
        through: {
          amount: parseInt(products[i].amount),
          price: parseInt(products[i].amount) * prod.price,
        },
      });
    }
    return res.json(cart);
    // aca van todos los casos donde no se encontraron en el carrito
    // aca tendrias  q hacer un for de products
  } catch (err) {
    return res.status(500).json({
      err: 'hay un error',
    });
  }
};

module.exports = {
  addItem,
};
