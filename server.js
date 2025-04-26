const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    maxHttpBufferSize: 1e6, // 1MB max message size
    transports: ['websocket'] // Use WebSocket only for better performance
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let userCount = 0;
const MAX_USERS = 100;

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    if (userCount >= MAX_USERS) {
        socket.emit('system message', 'Chat room is full. Please try again later.');
        socket.disconnect(true);
        console.log('Disconnected client due to max users:', socket.id);
        return;
    }

    userCount++;
    io.emit('user count', userCount);
    console.log('User count incremented:', userCount);

    socket.on('user joined', (username) => {
        console.log('User joined:', username);
        io.emit('system message', `${username} joined the chat`);
    });

    socket.on('chat message', (data) => {
        console.log('Received message:', data);
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        userCount--;
        io.emit('user count', userCount);
        console.log('Client disconnected:', socket.id, 'New user count:', userCount);
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error.message);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});