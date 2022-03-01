"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const socket_io_1 = require("socket.io");
dotenv.config({ path: __dirname + '/.env' });
const io = new socket_io_1.Server(3005, {
    cors: { origin: '*' },
});
io.on('connection', (socket) => {
    socket.emit('noArg');
    socket.on('hello', (data) => {
        console.log('data from hello', data);
        socket.emit('podIP', `my ip: ${process.env.POD_IP}, your ip: ${socket.handshake.address} - ${socket.handshake.headers['x-real-ip']} - ${socket.handshake.headers['x-forwarded-for']} - ${JSON.stringify(socket.handshake.headers, null, 2)}`);
    });
});
