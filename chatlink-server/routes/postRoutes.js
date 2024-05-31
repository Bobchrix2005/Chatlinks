const express = require('express');
const auth = require('../middleware/authMiddleware')
const {getAllPostsCtrl, getUserPostsCtrl,getPostByIdCtrl,
      toggleLikePostCtrl,deletePostCtrl, createPostCtrl, editPostCtrl} = require('../controllers/postController');

const postRouter = express.Router();
const upload = require('../config/multerConfig');


postRouter.get('/all-posts', getAllPostsCtrl);
postRouter.get('/user-posts/:userId', getUserPostsCtrl);
postRouter.get('/:postId', getPostByIdCtrl);
postRouter.post ('/toggle-like', auth, toggleLikePostCtrl)
postRouter.delete('/delete/:postId',auth, deletePostCtrl);
postRouter.post ('/create-post',auth, upload.array('files', 10), createPostCtrl)
postRouter.post ('/edit-post', auth, editPostCtrl)


module.exports = postRouter;