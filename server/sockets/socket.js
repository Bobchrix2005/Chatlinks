const { Server } = require('socket.io');

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.on('sendMessage', (message) => {
            io.emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return io;
};

module.exports = initializeSocket;
