const employees = require('../data/employee.json');

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Employees', employees.map(employee => ({
    firstName: employee.first_name,
    lastName: employee.last_name,
    email: employee.email,
    phone: employee.phone,
    gender: employee.gender,
    createdAt: new Date(),
    updatedAt: new Date(),
  })), {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Employees', null, {});
}
