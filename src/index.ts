import * as dotenv from 'dotenv';
import { Server } from 'socket.io';
dotenv.config({ path: __dirname + '/.env' });

interface ServerToClientEvents {
  noArg: () => void;
  podIP: (podIP: string) => void;
}

interface ClientToServerEvents {
  hello: (data: SocketData) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(3005, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  socket.emit('noArg');

  socket.on('hello', (data: SocketData): void => {
    console.log('data from hello', data);
    socket.emit('podIP', `my ip: ${process.env.POD_IP}`);
  });
});
