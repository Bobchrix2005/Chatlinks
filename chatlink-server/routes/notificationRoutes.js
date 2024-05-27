const express = require('express');
const auth = require('../middleware/authMiddleware')
const {getUserNotificationsCtrl, createNotificationCtrl, readNotificationsCtrl} = require('../controllers/notificationController');

const notificationRouter = express.Router();


notificationRouter.get('/user-notifications',auth, getUserNotificationsCtrl);
notificationRouter.post ('/create-notification',auth, createNotificationCtrl);
notificationRouter.post ('/read-notifications',auth, readNotificationsCtrl);



module.exports = notificationRouter;