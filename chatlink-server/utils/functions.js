const { User } = require('../models/userModel');
const { Op } = require('sequelize');

// Function to generate a random alphanumeric string
const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Function to generate a unique username
const generateUniqueUsername = async (firstName, lastName) => {
    const baseUsername = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    let uniqueUsername = baseUsername;

    while (true) {
        // Add a random alphanumeric string to the username
        const randomString = generateRandomString(6); // Adjust the length as needed
        uniqueUsername = `${baseUsername}_${randomString}`;

        // Check if the generated username already exists
        const existingUser = await User.findOne({ where: { userName: uniqueUsername } });
        if (!existingUser) {
            return uniqueUsername; // Return if the username is unique
        }
    }
}

module.exports = {
    generateRandomString,
    generateUniqueUsername
};
