const express = require('express');
const http = require('http');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const initializeSocket = require('./sockets/socket');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

// Middleware to add io to req
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await sequelize.sync();
});
