"use strict";
import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        email: "johnoe@example.com",
        roleId: 2,
        password: bcrypt.hashSync("admin123", 10),
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
        password: bcrypt.hashSync("admin123", 10),
        accessToken: "adasd",
        verified: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
