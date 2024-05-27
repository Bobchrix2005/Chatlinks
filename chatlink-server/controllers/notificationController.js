const User = require('../models/userModel.js');
const Notification = require ('../models/notificationModel.js')
const {generateUniqueUsername} = require('../utils/functions.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op } = require('sequelize');

const notificationIncludeFormat =  [
    
        { 
            model: User,
            as: 'notificationSender',
            attributes: ['id', 'firstName', 'lastName', 'username', 'profilePhotoUrl'],
        }
    ]

const getUserNotificationsCtrl = async(req, res) => {

    try {
        // Fetch all posts
        const receiverId = req.authUserId;
        const posts = await Notification.findAll({where:{receiverId}, include: notificationIncludeFormat,  order: [['createdAt', 'DESC']]});   
        res.status(200).json(posts);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}
const createNotificationCtrl = async (req, res) => {
    try {
        const senderId = req.authUserId
        const {type, receiverId, message} = req.body;
        const notification = await Notification.create({ senderId, receiverId, type, message });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const readNotificationsCtrl = async (req, res) => {
    try {
        const { notificationIds } = req.body;
        const userId = req.authUserId

        if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
            return res.status(400).json({ error: 'Invalid notification IDs provided' });
        }

        // Assuming you have a Notification model imported
        const notifications = await Notification.findAll({
            where: {
                id: notificationIds
            }
        });

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ error: 'Notifications not found' });
        }

        // Mark all notifications as read
        await Notification.update({ read: true }, {
            where: {
                id: notificationIds,
                receiverId: userId
            }
        });

        res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getUserNotificationsCtrl, createNotificationCtrl, markNotificationsAsReadCtrl
}