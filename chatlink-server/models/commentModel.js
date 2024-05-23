const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Post = require('./postModel');
const User = require('./userModel');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        }
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

Post.hasMany(Comment, { foreignKey: 'postId', as: 'postComments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'commentedPost' });

module.exports = Comment;
