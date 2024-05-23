const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    mediaUrls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        references: {
            model: User,
            key: 'id'
        }
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
});

User.hasMany(Post, { foreignKey: 'userId', as: 'userPosts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'postUser' });

module.exports = Post;
