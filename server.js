// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (e.g., your HTML, CSS, and client-side JS)
app.use(express.static(__dirname + '/public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for chat messages
    socket.on('chat message', (message) => {
        console.log('Received message:', message);
        // Broadcast the message to all connected clients
        io.emit('chat message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
