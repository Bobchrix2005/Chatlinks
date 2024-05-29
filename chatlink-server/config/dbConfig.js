const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chatlink-test', 'root', 'password', { //will be set to env later
    host: 'localhost',
    //port: 3306, 
    dialect: 'mysql', 
    logging: false, 
});

module.exports = sequelize;
