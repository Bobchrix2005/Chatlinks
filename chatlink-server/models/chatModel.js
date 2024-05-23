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
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        references: {
            model: User,
            key: 'id'
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
