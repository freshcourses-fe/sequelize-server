'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Admin',
          last_name: 'Tiranovich',
          email: 'banthemall@banhammer.com',
          password: 'admin',
          is_male: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'users',
      { email: 'banthemall@banhammer.com' },
      {}
    );
  },
};
