const express = require('express');
const {loginCtrl, registerCtrl} = require('../controllers/authController');
const {updateUserInfoCtrl, uploadUserPhotoCtrl,
     toggleFollowUserCtrl, getUserProfileCtrl, getFollowsCtrl} = require('../controllers/userController')
const upload = require('../config/multerConfig')
const auth = require('../middleware/authMiddleware')

const userRouter = express.Router();

userRouter.post('/login', loginCtrl);
userRouter.post('/register', registerCtrl);
userRouter.post('/upload-photo', auth, upload.single('photo'), uploadUserPhotoCtrl);
userRouter.get('/:userId', getUserProfileCtrl);
userRouter.post ('/edit-profile', auth, updateUserInfoCtrl);
userRouter.get('/:userId/:type', getFollowsCtrl);
userRouter.post ('/follow', auth, toggleFollowUserCtrl);

// changePassword
// confirmPassword

module.exports = userRouter;