import { Sequelize, DataTypes } from 'sequelize';
import db from '../libs/database';
const sequelize = db();

const Product = sequelize.define('products', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: false,
    defaultValue: Sequelize.literal('uuid_generate_v4()')
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
