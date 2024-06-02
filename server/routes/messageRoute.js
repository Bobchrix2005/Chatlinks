const express = require('express');
const { sendMessage, getMessagesByChat } = require('../controllers/messageController');
const router = express.Router();

router.post('/', sendMessage);
router.get('/:chatId', getMessagesByChat);

module.exports = router;
