'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER

      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
          type:Sequelize.INTEGER,
          references: {model :'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
      },
      collaborator_id: {
          type:Sequelize.INTEGER,
          references: {model :'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
        
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },


    })

  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('appointments')
  }
};
