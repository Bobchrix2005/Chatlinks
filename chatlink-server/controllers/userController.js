const  User  = require('../models/userModel.js');
const { Op } = require('sequelize');
const uploadFilesToS3 = require('../utils/aws.js'); // Adjust path as needed



const editProfileCtrl = async (req, res) => {

    const firstName = req.body?.firstName;
    const lastName = req.body?.lastName;
    const username = req.body?.username;
    const workPlace =  req.body?.workPlace;
    const address = req.body?.address;
    const countryName =  req.body?.countryName;
    const countryCode = req.body?.countryCode;
    const userId = req.authUserId;
    


    try {
  
        const user = await User.findByPk(userId)
      

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check for changes and update the database
        let hasChanges = false;

        if (firstName && firstName !== user.firstName) {
            user.firstName = firstName;
            hasChanges = true;
        }

        if (lastName && lastName !== user.lastName) {
            user.lastName = lastName;
            hasChanges = true;
        }


        if (username && username !== user.username) {
            const existingUser = await User.findOne({where:{username}})
            if(existingUser){
                return res.status(200).json({ message: 'Username Taken' });  
            }else{
                user.username = username;
                hasChanges = true;  
            }
         
        }

        if (workPlace && workPlace !== user.workPlace) {
            user.workPlace = workPlace;
            hasChanges = true;
        }

        if (address && address !== user.address) {
            user.address = address;
            hasChanges = true;
        }

        if (countryName && countryName !== user.countryName) {
            user.countryCode = countryCode;
            user.countryName = countryName;
            hasChanges = true;
        }

        if (hasChanges) {
            await user.save();
            return res.status(200).json({ message: 'User information updated successfully' });
        } else {
            return res.status(200).json({ message: 'No changes detected' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating user information' });
    }
}

const uploadUserPhotoCtrl = async (req, res) => {
    const { userId } = req.authUserId;
    const {type} = req.body;
    const files = req.files || (req.file ? [req.file] : []);

 
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
       
        if (files?.length>0) {
            return res.status(400).json({ error: 'No file uploaded' });
        } 

 
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
 
        // Upload file to S3 
        const fileUrlArr = await uploadFilesToS3(req.file, 'your-s3-bucket-name', 'your-folder-path');
        const fileUrl = fileUrlArr[0]; //returns array thats why i did it this way

        // Update user's photoUrl in database
        if(type === 'profile picture'){
            user.profilePhotoUrl = fileUrl;
        }else if (type === 'timeline picture'){
            user. timelinePhotoUrl = fileUrl;
        }
        
        await user.save();

        res.status(200).json({ message: 'Photo uploaded successfully', photoUrl: fileUrl });
    } catch (error) {
        console.error('Error uploading user photo:', error);
        res.status(500).json({ error: 'An error occurred while uploading the photo' });
    }
};

const toggleFollowUserCtrl = async (req, res) => {
    const {targetUserId } = req.body;
    const userId = req.authUserId;

   
    if (!targetUserId) {
        return res.status(400).json({ error: 'User ID and target user ID are required' });
    }

    try {
        // Find the user and the target user
        const user = await User.findByPk(userId); //Add limit to info gotten
        const targetUser = await User.findByPk(targetUserId);
       

        if (!targetUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user is following the target user
        const isFollowing = user.following.includes(targetUserId);
      

        if (isFollowing) {
            // If user is already following, unfollow
            user.following = user.following.filter(id => id !== targetUserId);
            await user.save();

            // Remove user from followers list for target user
            targetUser.followers = targetUser.followers.filter(id => id !== userId);
            await targetUser.save();

            res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            // If user is not following, follow
          
            user.following = [...user.following, targetUserId];
            await user.save();

            // Add user to followers list for target user
            targetUser.followers = [...targetUser.followers, userId];
            await targetUser.save();

            res.status(200).json({ message: 'User followed successfully' });
        }
    } catch (error) {
        console.error('Error toggling follow status:', error);
        res.status(500).json({ error: 'An error occurred while toggling follow status' });
    }
};

const getUserProfileCtrl = async (req, res) => {
    const  {userId}  = req.params;

    console.log(userId)

    try { 
        // Find the user by ID
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] } // Exclude password field from the query
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user profile
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'An error occurred while fetching user profile' });
    }
};



const getFollowsCtrl = async (req, res) => {
    const {userId, type } = req.params;

    console.log(type)


    try {
        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get followers or following based on type
        let follows;
        if (type === 'followers') {
            follows = await User.findAll({
                where: {
                    id: {
                        [Op.in]: user.followers // Find users whose IDs are in the followers array
                    }
                },
                attributes: ['id', 'firstName', 'lastName', 'username', 'profilePhotoUrl']
            });
        } else if (type === 'following') {
            follows = await User.findAll({
                where: {
                    id: {
                        [Op.in]: user.following // Find users whose IDs are in the following array
                    }
                },
                attributes: ['id', 'firstName', 'lastName', 'username', 'profilePhotoUrl']
            });
        }

        // Return followers or following
        res.status(200).json(follows);
    } catch (error) {
        console.error('Error fetching:', error);
        res.status(500).json({ error: 'An error occurred while fetching' });
    }
};




module.exports = {
    editProfileCtrl,
    uploadUserPhotoCtrl,
    toggleFollowUserCtrl,
    getUserProfileCtrl,
    getFollowsCtrl
};
