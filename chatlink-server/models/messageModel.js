const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Chat = require('./chatModel');
const User = require('./userModel')

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    chatId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Chat,
            key: 'id'
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    mediaUrls: {
        type: DataTypes.JSON, 
        defaultValue: [], 
        get() {
            const value = this.getDataValue('mediaUrls');
            return value ? value : [];
        },
        set(value) {
            this.setDataValue('mediaUrls', value);
        }
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

Chat.hasMany(Message, { foreignKey: 'chatId', as: 'chatMessages' });
Message.belongsTo(Chat, { foreignKey: 'chatId', as: 'Chat' });

User.hasMany(Message, { foreignKey: 'senderId', as: 'senderMessages' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'messageSender' });

User.hasMany(Message, { foreignKey: 'receiverId', as: 'receiverMessages' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'messageReceiver' });

module.exports = Message;
