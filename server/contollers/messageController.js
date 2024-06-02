const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

// Function to send a message
const sendMessage = async (req, res) => {
    const { senderId, receiverId, chatId, content, mediaUrls } = req.body;

    try {
        const newMessage = await Message.create({
            senderId,
            receiverId,
            chatId,
            content,
            mediaUrls,
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Function to fetch messages in a chat
const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await Message.findAll({
            where: { chatId },
            include: [
                { model: User, as: 'messageSender', attributes: ['username'] },
                { model: User, as: 'messageReceiver', attributes: ['username'] },
            ],
            order: [['createdAt', 'ASC']],
        });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = {
    sendMessage,
    getMessages,
};
