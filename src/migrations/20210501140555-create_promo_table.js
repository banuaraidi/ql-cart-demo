'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      try {
        await queryInterface.createTable(
          'promos', 
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            productId: {
              type: Sequelize.INTEGER,
              references: {
                model: 'products',
                key: 'id'
              }
            },
            startAt: Sequelize.DATE(6),
            expiryAt: Sequelize.DATE(6),
            minQuantity: Sequelize.INTEGER,
            freeProductId: {
              type: Sequelize.INTEGER,
              allowNull: true,
              references: {
                model: 'products',
                key: 'id'
              }
            },
            discount: {
              type: Sequelize.INTEGER,
              allowNull: true
            },
            freeQuantity: {
              type: Sequelize.INTEGER,
              allowNull: true
            },
            createdAt: Sequelize.DATE(6),
            updatedAt: Sequelize.DATE(6),
          },
          { transaction: t }
        )
        .then(() => queryInterface.addIndex('promos', ['startAt']))
        .then(() => queryInterface.addIndex('promos', ['expiryAt']));

        await queryInterface.bulkInsert('promos', [
          {
            productId: 1,
            startAt: new Date(),
            expiryAt: new Date(new Date().setDate(new Date().getDate() + 7)),
            minQuantity: 1,
            freeProductId: 4,
            discount: 0,
            freeQuantity: 0,
            createdAt: Sequelize.fn('NOW'),
            updatedAt: Sequelize.fn('NOW'),
          },
          {
            productId: 3,
            startAt: new Date(),
            expiryAt: new Date(new Date().setDate(new Date().getDate() + 7)),
            minQuantity: 3,
            freeProductId: null,
            discount: 0,
            freeQuantity: 1,
            createdAt: Sequelize.fn('NOW'),
            updatedAt: Sequelize.fn('NOW'),
          },
          {
            productId: 5,
            startAt: new Date(),
            expiryAt: new Date(new Date().setDate(new Date().getDate() + 7)),
            minQuantity: 3,
            freeProductId: null,
            discount: 10,
            freeQuantity: 0,
            createdAt: Sequelize.fn('NOW'),
            updatedAt: Sequelize.fn('NOW'),
          },
        ]);

        return Promise.resolve();
      }
      catch(error){
        console.log(error)
        return Promise.reject(error);
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('promos');
  }
};
