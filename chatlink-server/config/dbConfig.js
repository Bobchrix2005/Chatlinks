const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // 'postgres', 'sqlite', 'mssql'
});

module.exports = sequelize;
