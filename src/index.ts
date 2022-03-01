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
    socket.emit(
      'podIP',
      // eslint-disable-next-line max-len
      `my ip: ${process.env.POD_IP}, your ip: ${socket.handshake.address} - ${
        socket.handshake.headers['x-real-ip']
      } - ${socket.handshake.headers['x-forwarded-for']} - ${JSON.stringify(socket.handshake.headers, null, 2)}`,
    );
  });
});
