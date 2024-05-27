const express = require('express');
const auth = require('../middleware/authMiddleware')
const {getAllPostsCtrl, getUserPostsCtrl,getPostByIdCtrl,
     deletePostCtrl, createPostCtrl, editPostCtrl} = require('../controllers/postController');

const postRouter = express.Router();


postRouter.get('/all-posts', getAllPostsCtrl);
postRouter.get('/user-posts/:userId', getUserPostsCtrl);
postRouter.get('/:postId', getPostByIdCtrl);
postRouter.delete('/delete/:postId',auth, deletePostCtrl);
postRouter.post ('/create-post/',auth,createPostCtrl)
postRouter.post ('/edit-post/', auth, editPostCtrl)


module.exports = postRouter;