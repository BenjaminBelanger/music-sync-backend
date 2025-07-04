const express = require('express');
const app = express();
const server = require('http').createServer(app);
var cors = require('cors')

app.use(cors())

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('track', (data) => {
        console.log(`Received new track: ${JSON.stringify(data)}`);
        socket.broadcast.emit('track', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 8085;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
