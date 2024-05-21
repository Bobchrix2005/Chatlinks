const { DataTypes, UUIDV4  } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4, 
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false, 
    },
    userName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(100), 
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    photoUrl: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    countryCode: {
        type: DataTypes.STRING(5),
        allowNull: true,
    },
    countryName: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    workPlace: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    following: {
        type: DataTypes.JSONB, // or JSON
        defaultValue: [], // empty array no following
    },
    followers: {
        type: DataTypes.JSONB, // or JSON
        defaultValue: [], // empty array no followers
    },
  
});


module.exports = User;
