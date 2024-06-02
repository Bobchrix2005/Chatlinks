const Chat = require('../models/chatModel');
const User = require('../models/userModel');

// Function to create a chat
const createChat = async (req, res) => {
    const { creatorId, otherMembers, name } = req.body;

    try {
        const newChat = await Chat.create({
            creatorId,
            otherMembers,
            name,
        });

        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create chat' });
    }
};

// Function to fetch all chats for a user
const getUserChats = async (req, res) => {
    const { userId } = req.params;

    try {
        const chats = await Chat.findAll({
            where: {
                $or: [
                    { creatorId: userId },
                    { otherMembers: { $contains: [userId] } },
                ],
            },
            include: [
                { model: User, as: 'creator', attributes: ['username'] },
            ],
        });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats' });
    }
};

module.exports = {
    createChat,
    getUserChats,
};
