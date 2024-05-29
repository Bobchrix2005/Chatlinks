const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel')

const Chat = sequelize.define('Chat', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    otherMembers: {
        type: DataTypes.JSON, 
        defaultValue: [], 
        get() {
            const value = this.getDataValue('otherMembers');
            return value ? value : [];
        },
        set(value) {
            this.setDataValue('otherMembers', value);
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
});



module.exports = Chat;
