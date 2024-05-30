const User = require('../models/userModel.js');
const {generateUniqueUsername} = require('../utils/functions.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op } = require('sequelize');
const sendEmail = require('../utils/email/sendEmail.js')

dotenv.config();
 
const JWT_SECRET = process.env.JWT_SECRET;


const registerCtrl = async (req, res) => {
    const { firstName, lastName, email, password} = req.body; 
    console.log('registerCtrl')

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
 
    try {
      
        // Check if user with the same email already exists 
        const existingUser = await User.findOne({ where: { email} });
        if (existingUser) {
            // console.log(existingUser)
            return res.status(400).json({ error: 'User with the same email already exists' });
        }

        // Generate a unique username
        const username = await generateUniqueUsername(firstName, lastName);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({id: newUser.id}, JWT_SECRET, {expiresIn: '2y'});

        // Return success response
        res.status(201).json({ 
            message: 'User Registered Successfully',
            data: {
                firstName,
                lastName,
                username,
                email,
                token
                }
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
                [Op.or]: [{ email: identifier }, { username: identifier }]
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
         const token = jwt.sign({ id: user.id}, JWT_SECRET, { expiresIn: '2y' });

         console.log(token)
 
         // Return token
         res.status(200).json({ token });
     } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'An error occurred while logging in' });
     }

}

const changePasswordCtrl = async (req, res) => {

    const { token } = req.params;

    // Basic validation
    if (!token) {
        return res.status(400).json({ error: 'Invalid Link' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Extract user ID and new password from the token payload
        const { id, hashedNewPassword } = decoded;
         // Find user by ID
         const user = await User.findOne({ where: { id } });

         if (!user) {
             return res.status(404).json({ error: 'User not found' });
         }
 
         user.password = hashedNewPassword;
         await user.save();
 
         // Return success response
         res.status(200).json({ message: 'Password successfully changed' });
     } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid Link' });
        }
        res.status(500).json({ error: 'An error occurred while changing the password' });
    }
}


const sendPasswordChangeLinkCtrl = async (req, res) => {
    const { email, newPassword } = req.body;

    // Basic validation
    if (!email || !newPassword) {
        return res.status(400).json({ error: 'Please provide an email and new password' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Generate JWT token
        const token = jwt.sign({ id: user.id, hashedNewPassword }, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Create password change link
        const passwordChangeLink = `${process.env.FRONTEND_URL}/change-password?token=${token}`;

        // Email subject and text
        const subject = 'Password Change Request';
        const text = `You requested to change your password. Click the link below to set a new password:\n\n${passwordChangeLink}\n\nThis link will expire in 1 hour.`;

        // Send password change email
        await sendEmail(email, subject, text);

        // Return success response
        res.status(200).json({ message: `Password change link sent to ${email}` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the password change link' });
    }
}



module.exports = {
    registerCtrl,
    loginCtrl,
    changePasswordCtrl,
    sendPasswordChangeLinkCtrl
};
