const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel');
const Post = require('./postModel');

const Notification = sequelize.define('Notification', {
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
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});
User.hasMany(Post, { foreignKey: 'senderId', as: 'senderNotifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'notificationSender' });

User.hasMany(Post, { foreignKey: 'notificationId', as: 'receiverNotifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'notificationReceiver' });

module.exports = Notification;
