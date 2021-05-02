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
            cartId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: 'carts',
                key: 'id'
              }
            },
            productId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: 'products',
                key: 'id'
              }
            },
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
        console.log(error);
        return Promise.reject(error);
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      try {
        await queryInterface.dropTable('cartItems', { transaction: t });
        await queryInterface.dropTable('carts', { transaction: t });
      }
      catch(error){
        return Promise.reject(error);
      }
    })
  }
};
