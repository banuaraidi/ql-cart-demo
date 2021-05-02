import { DataTypes } from 'sequelize';

import db from '../libs/database';

const sequelize = db();

const Promo = sequelize.define('promos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: DataTypes.INTEGER,
  startAt: DataTypes.DATE,
  expiryAt: DataTypes.DATE,
  minQuantity: DataTypes.INTEGER,
  freeProductId: DataTypes.INTEGER,
  discount: DataTypes.INTEGER,
  freeQuantity: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});

export default Promo;