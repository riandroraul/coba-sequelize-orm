"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        RoleName: "Super Admin",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        RoleName: "Admin",
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        RoleName: "User",
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
