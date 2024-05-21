const express = require('express');
const {loginCtrl, registerCtrl} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login', loginCtrl);
authRouter.get('/register', registerCtrl);
// changePassword
// confirmPassword

module.exports = authRouter;