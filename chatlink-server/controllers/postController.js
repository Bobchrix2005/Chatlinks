

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
        const posts = await Post.findAll({include: postIncludeFormat});

     
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
        const posts = await Post.findAll({where:{userId}, include: postIncludeFormat});

     
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getAllPostsCtrl, getUserPostsCtrl };
