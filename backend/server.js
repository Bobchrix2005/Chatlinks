const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors");

const server = express();
const PORT = process.env.PORT || 3000;

//const FRONTEND_URL =  "http://localhost:3000" 
//server.use(cors({origin: FRONTEND_URL}));
server.use(cors());
server.use(express.json({limit: '100mb'}));
server.use('/auth', authRoutes);

sequelize.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
