import { Sequelize, DataTypes } from 'sequelize';
import db from '../libs/database';
import CartItem from './cartItem'
const sequelize = db();

const Cart = sequelize.define('cart', {
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

Cart.hasMany(CartItem)

export const addCart = async (obj, args) => {
  const { 
    input: {
      id,
      userId,
      productId,
      productName,
      price,
      quantity
    } 
  } = args || {}

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
        price,
        quantity,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    })
    // if item has existing then update
    if(!itemCreated){
      await CartItem.update({ 
        productName, price, quantity, updatedAt: Sequelize.fn('NOW')
      }, {
        where: {
          id: cartItem.id,
          productId
        }
      })
    }
  }
  return {
    id,
    userId,
    productId,
    productName,
    price,
    quantity
  }
}

export const updateItem = async (obj, args) => {
  const { 
    input: {
      userId,
      cartItemId,
      productId,
      productName,
      price,
      quantity
    } 
  } = args || {}

  await CartItem.update({ 
    productName, price, quantity, updatedAt: Sequelize.fn('NOW')
  }, {
    where: {
      id: cartItemId,
      productId
    }
  })

  return {
    userId,
    cartItemId,
    productId,
    productName,
    price,
    quantity
  }
}

export const removeItem = async (obj, args) => {
  const { cartItemId, productId } = args
  console.log({cartItemId, productId})
  await CartItem.destroy({
    where:{
      id: cartItemId,
      productId
    }
  })
  return {
    status: "200",
    description: "OK"
  }
}

export default Cart;
