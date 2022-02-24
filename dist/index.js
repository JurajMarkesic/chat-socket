"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(3005);
io.on('connection', (socket) => {
    socket.emit('noArg');
    socket.on('hello', (data) => {
        console.log('data', data);
    });
});
