const express = require('express');

const {editProfileCtrl, uploadUserPhotoCtrl,
     toggleFollowUserCtrl, getUserProfileCtrl, getFollowsCtrl} = require('../controllers/userController')
const upload = require('../config/multerConfig')
const auth = require('../middleware/authMiddleware')

const userRouter = express.Router();


userRouter.post('/upload-photo', auth, upload.single('photo'), uploadUserPhotoCtrl);
userRouter.get('/:userId', getUserProfileCtrl);
userRouter.post ('/edit-profile', auth, editProfileCtrl);
userRouter.get('/:userId/:type', getFollowsCtrl);
userRouter.post ('/toggle-follow', auth, toggleFollowUserCtrl);

// changePassword
// confirmPassword

module.exports = userRouter;