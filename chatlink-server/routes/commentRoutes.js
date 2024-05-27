const express = require('express');
const auth = require('../middleware/authMiddleware')
const { createCommentCtrl, getPostCommentsCtrl, deleteCommentCtrl, editCommentCtrl} = require('../controllers/notificationController');

const commentRouter = express.Router();



commentRouter.post ('/create-comment',auth, createCommentCtrl);
commentRouter.get('/get-post-comments/:postId', getPostCommentsCtrl);
commentRouter.delete('/delete-comment/:commentId',auth, deleteCommentCtrl);
commentRouter.post('/edit-comment',auth, editCommentCtrl);



module.exports = commentRouter;