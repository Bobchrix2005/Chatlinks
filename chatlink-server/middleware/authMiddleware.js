const jwt = require('jsonwebtoken');

const dotenv = require ('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length <500;

        let decodedData;

        if (token && isCustomAuth){
            decodedData = jwt.verify(token, JWT_SECRET);
            req.authUserId = decodedData?.id;
            
        }else{
            return res.status(200).json({ message: 'Session Token Expired' });
        }
        next();
    } catch (error){
        console.log(error);
    }
}

module.exports = auth