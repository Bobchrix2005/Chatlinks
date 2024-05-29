const express = require('express');
const sequelize = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require("cors");

const server = express();
const PORT = process.env.PORT || 3000;

//const FRONTEND_URL =  "http://localhost:3000" 
//server.use(cors({origin: FRONTEND_URL}));
server.use(cors());
server.use(express.json({limit: '100mb'}));
server.use('/auth', authRoutes);
server.use('/user', userRoutes);
server.use('/post', postRoutes);
server.use('/notification', notificationRoutes);
server.use('/comment', commentRoutes);

sequelize.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
