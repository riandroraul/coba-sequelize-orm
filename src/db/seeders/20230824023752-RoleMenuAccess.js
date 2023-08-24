'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('RoleMenuAccesses', [
            {
                roleId: 1, // Replace with the actual roleId
                submenuId: 1, // Replace with the actual submenuId
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                roleId: 2, // Replace with the actual roleId
                submenuId: 2, // Replace with the actual submenuId
                active: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                roleId: 1, // Replace with the actual roleId
                submenuId: 3, // Replace with the actual submenuId
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('RoleMenuAccesses', null, {});
    },
};
