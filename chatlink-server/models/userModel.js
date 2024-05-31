const { DataTypes, UUIDV4  } = require('sequelize');
const sequelize = require('../config/dbConfig');

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
    username: {
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
    profilePhotoUrl: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    timelinePhotoUrl: {
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
        

        type: DataTypes.JSON, 
        defaultValue: [], 
        get() {
            const value = this.getDataValue('following');
            return Array.isArray(value) ? value : [];
        },
        set(value) {
            this.setDataValue('following', Array.isArray(value) ? value : []);
        }
      
    },

    followers: {
        
         type: DataTypes.JSON, 
        defaultValue: [], 
        get() {
            const value = this.getDataValue('followers');
            return Array.isArray(value) ? value : [];
        },
        set(value) {
            this.setDataValue('followers', Array.isArray(value) ? value : []);
        }
     
    },

  
},{
    timestamps: true,
});




module.exports = User;
