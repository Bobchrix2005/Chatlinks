const Comment = require('../models/commentModel');
const User = require('../models/userModel');




const commentIncludeFormat = 
    [
        {
            model: User,
            as: 'commentUser',
            attributes: ['id', 'firstName', 'lastName', 'username', 'profilePhotoUrl'],
        },
    ]

const createCommentCtrl = async (req, res) => {
    try {
        const { notificationId,content, type } = req.body;
        
        const userId = req.authUserId;

        // Check if required fields are present
        if (!notificationId || !userId || !content) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        // Create the comment
        const newComment = await Comment.create({ notificationId, userId, type, content });

        return res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostCommentsCtrl = async(req, res) => {

    const {notificationId} = req.params; //not using authId coz can get any user posts

    try {
        // Fetch all posts
        const posts = await Comment.findAll({where:{notificationId}, include: commentIncludeFormat,  order: [['createdAt', 'DESC']]});

     
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const deleteCommentCtrl = async (req, res) => {

    const { notificationId } = req.params;
    const userId = req.authUserId;

    if (!notificationId) {
        return res.status(400).json({ message: 'Comment ID is required' });
    }

    try {
        // Find the comment by its ID
        const comment = await Comment.findByPk(notificationId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.userId !== userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this comment' });
        }

        // Delete the comment
        await comment.destroy();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const editCommentCtrl = async (req, res) => {
  
    const { commentId, content } = req.body;
    const userId = req.authUserId // Assuming req.user contains the authenticated user's details

    if (!commentId) {
        return res.status(400).json({ message: 'Comment ID is required' });
    }

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        // Find the comment by its ID
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user is the owner of the comment or an admin
        if (comment.userId !== userId ) {
            return res.status(403).json({ message: 'You do not have permission to edit this comment' });
        }

        // Update the comment's content
        comment.content = content;
        await comment.save();

        res.status(200).json({ message: 'Comment content updated successfully', comment });
    } catch (error) {
        console.error('Error updating comment content:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




module.exports = {
    createCommentCtrl, getPostCommentsCtrl, deleteCommentCtrl, editCommentCtrl
};
