const express = require('express');
const {loginCtrl, registerCtrl,
    changePasswordCtrl,
    sendPasswordChangeLinkCtrl} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login', loginCtrl);
authRouter.post('/register', registerCtrl);
authRouter.post('/change-password', changePasswordCtrl);
authRouter.post('/send-password-link', sendPasswordChangeLinkCtrl);
// changePassword
// confirmPassword

module.exports = authRouter;