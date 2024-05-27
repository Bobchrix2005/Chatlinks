

const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const sequelize = require('../config/dbConfig');


//format for fetching post
const postIncludeFormat = 
    [
        {
            model: User,
            as: 'postUser',
            attributes: ['id', 'firstName', 'lastName', 'username', 'profilePhotoUrl'],
        },
        {
            model: Comment,
            as: 'postComments',
            attributes: ['id'],
            // Group by postId and count comments for each post
            group: ['Comment.postId'],
            // Include count of comments
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('postComments.id')), 'commentsCount'],
            ],
        },
    ]


const getAllPostsCtrl = async(req, res) => {
    try {
        // Fetch all posts
        const posts = await Post.findAll({include: postIncludeFormat,  order: [['createdAt', 'DESC']]});

     
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getUserPostsCtrl = async(req, res) => {

    const {userId} = req.params;

    try {
        // Fetch all posts
        const posts = await Post.findAll({where:{userId}, include: postIncludeFormat,  order: [['createdAt', 'DESC']]});

     
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getPostByIdCtrl = async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    try {
        // Fetch the post by its primary key and include related models
        const post = await Post.findByPk(postId, {
            include: postIncludeFormat
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createPostCtrl = async(req, res) => {

    try {
        // Extract data from the request body
        const userId = req.authUserId;
        const {content, mediaUrls } = req.body;

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create the post
        const newPost = await Post.create({
            userId,
            content,
            mediaUrls
        });

        return res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}


const deletePostCtrl = async (req, res) => {
    const { postId } = req.params;
    const userId = req.authUserId;

    if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    try {
        // Find the post by its ID
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.userId !== userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this post' });
        }

       

        // Delete the post
        await post.destroy();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const editPostCtrl = async (req, res) => {
  
    const { postId, content } = req.body;
    const userId = req.authUserId // Assuming req.user contains the authenticated user's details

    if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        // Find the post by its ID
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is the owner of the post or an admin
        if (post.userId !== userId ) {
            return res.status(403).json({ message: 'You do not have permission to edit this post' });
        }

        // Update the post's content
        post.content = content;
        await post.save();

        res.status(200).json({ message: 'Post content updated successfully', post });
    } catch (error) {
        console.error('Error updating post content:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = { getAllPostsCtrl, getUserPostsCtrl, getPostByIdCtrl, deletePostCtrl, createPostCtrl, editPostCtrl};
