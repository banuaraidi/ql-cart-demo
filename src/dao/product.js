import { Sequelize, DataTypes } from 'sequelize';

import db from '../libs/database';
const sequelize = db();

import CartItem from './cartItem';

const Product = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
  },
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

Product.hasMany(CartItem, { foreignKey: 'productId' })

export const listProduct = async () => {
  const products = await Product.findAll();
  return {
    totalPage: 1,
    totalCount: 10,
    items: products
  };
};

export const getProduct = async (obj, args) => {
  const { id } = args || {};
  const product = await Product.findByPk(id);
  return product;
};

export default Product;
