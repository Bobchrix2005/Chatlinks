const User = require('../models/User.js');
const {generateUniqueUsername} = require('../utils/functions.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op } = require('sequelize');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


const registerCtrl = async (req, res) => {
    const { firstName, lastName, email, password} = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same email already exists' });
        }

        // Generate a unique username
        const userName = await generateUniqueUsername(firstName, lastName);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({id: newUser.id}, JWT_SECRET, {expiresIn: null});

        // Return success response
        res.status(201).json({ 
            message: 'User Registered Successfully',
            data: {
                firstName,
                lastName,
                userName,
                email,
                token
                }
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
};
const loginCtrl = async(req, res) => {
    const { identifier, password } = req.body;

    // Basic validation
    if (!identifier || !password) {
        return res.status(400).json({ error: 'Please provide email/username and password' });
    }
    
    try {
        // Find user by email or username
        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: identifier }, { userName: identifier }]
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

         // Check password
         const isPasswordValid = await bcrypt.compare(password, user.password);
         if (!isPasswordValid) {
             return res.status(401).json({ error: 'Invalid password' });
         }
 
         // Generate JWT token
         const token = jwt.sign({ id: user.id}, JWT_SECRET, { expiresIn: null });
 
         // Return token
         res.status(200).json({ token });
     } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'An error occurred while logging in' });
     }

}

//changePassword
//changeUserName

module.exports = {
    registerCtrl,
    loginCtrl,
};
