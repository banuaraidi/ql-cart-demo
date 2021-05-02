import { Sequelize, DataTypes } from 'sequelize';

import db from '../libs/database';

const sequelize = db();

const CartItem = sequelize.define('cartItems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cartId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  productName: DataTypes.STRING,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

export default CartItem;
