const express = require('express');
const { createChat, getChatsByUser } = require('../controllers/chatController');
const router = express.Router();

router.post('/', createChat);
router.get('/:userId', getChatsByUser);


module.exports = router;
