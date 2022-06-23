'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        field: 'first_name',
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      lastName: {
        field: 'last_name',
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.TEXT
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      isMale: {
        field: 'is_male',
        type: Sequelize.BOOLEAN
      },
      birthday: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};