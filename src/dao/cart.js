import { Sequelize, DataTypes } from 'sequelize';

import db from '../libs/database';

import CartItem from './cartItem'
import Product from './product'

const sequelize = db();

const Cart = sequelize.define('carts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: DataTypes.INTEGER,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// Cart.hasMany(CartItem, { foreignKey: 'cartId' })

export const addCart = async (obj, args) => {
  const { 
    input: {
      id,
      userId,
      productId,
      quantity
    } 
  } = args || {}

  let productName = ''
  let productPrice = 0

  const product = await Product.findByPk(productId);

  if(product) {

    productPrice = product.price;
    productName = product.name;

    // check existing Cart, if empty then create new
    const [cart, created] = await Cart.findOrCreate({
      where: { userId },
      defaults: {
        id,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    });

    if(cart){

      // check existing item in Cart, if empty then add new item
      const [cartItem, itemCreated] = await CartItem.findOrCreate({
        where: { cartId: cart.id, productId },
        defaults: {
          productName,
          price: productPrice,
          quantity,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        }
      })

      // if item has existing then update
      if(!itemCreated){
        await CartItem.update({ 
          productName, price: productPrice, quantity, updatedAt: Sequelize.fn('NOW')
        }, {
          where: {
            id: cartItem.id,
            productId
          }
        })
      }

    }
  }

  return {
    id,
    userId,
    productId,
    productName,
    price: productPrice,
    quantity
  }
}

export const updateItem = async (obj, args) => {
  const { 
    input: {
      cartItemId,
      quantity
    } 
  } = args || {}

  await CartItem.update({ 
    quantity, updatedAt: Sequelize.fn('NOW')
  }, {
    where: {
      id: cartItemId
    }
  })

  return {
    status: "200",
    description: "OK"
  }
}

export const removeItem = async (obj, args) => {
  const { cartItemId } = args

  await CartItem.destroy({
    where:{
      id: cartItemId
    }
  })
  return {
    status: "200",
    description: "OK"
  }
}

export default Cart;
