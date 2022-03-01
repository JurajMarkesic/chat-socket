import * as dotenv from 'dotenv';
import { Server } from 'socket.io';
dotenv.config({ path: __dirname + '/.env' });
import http from 'http';
const server = http.createServer(function (req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello, World! This is ${process.env.POD_IP}`);
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed\n');
  }
});
server.listen(3006);

setTimeout(() => {
  http
    .get('http://172.17.0.10:3006', (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(data);
      });
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
}, 100000);

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
      `mmmy ip: ${process.env.POD_IP}, your ip: ${socket.handshake.address} - ${
        socket.handshake.headers['x-real-ip']
      } - ${socket.handshake.headers['x-forwarded-for']} - ${JSON.stringify(socket.handshake.headers, null, 2)}`,
    );
  });
});
