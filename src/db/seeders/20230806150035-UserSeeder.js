"use strict";

import manage_password from "../../utils/manage_password";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        email: "johnoe@example.com",
        roleId: 2,
        password: await manage_password.hashingPassword("admin123"),
        accessToken: "adasd",
        verified: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        email: "janedoe@example.com",
        roleId: 1,
        password: await manage_password.hashingPassword("admin123"),
        accessToken: "adasd",
        verified: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
