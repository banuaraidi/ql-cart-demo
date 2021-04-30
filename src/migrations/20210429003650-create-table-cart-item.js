'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      try {
        await queryInterface.createTable(
          'carts', 
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            userId: Sequelize.INTEGER,
            createdAt: Sequelize.DATE(6),
            updatedAt: Sequelize.DATE(6),
          },
          { transaction: t }
        );

        await queryInterface.createTable(
          'cartItems', 
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            cartId: Sequelize.INTEGER,
            productId: Sequelize.INTEGER,
            productName: Sequelize.STRING,
            price: Sequelize.FLOAT(18, 6),
            quantity: Sequelize.INTEGER,
            createdAt: Sequelize.DATE(6),
            updatedAt: Sequelize.DATE(6),
          },
          { transaction: t }
        );
        return Promise.resolve();
      }
      catch(error){
        return Promise.reject(e);
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      try {
        await queryInterface.dropTable('cartItems', { transaction: t });
        await queryInterface.dropTable('cart', { transaction: t });
      }
      catch(error){
        return Promise.reject(e);
      }
    })
  }
};
