import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import Websocket from 'ws';
import { IExtWebSocket } from './types';

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use(express.static(`${__dirname}/static`));

app.get('/', (req: Request, res: Response) => {
  res.sendFile('static/index.html', {
    root: `${__dirname}`,
  });
});

const server = http.createServer(app);
const wss = new Websocket.Server({ server });

wss.on('connection', (ws: Websocket) => {
  const extWs = ws as IExtWebSocket;
  extWs.isAlive = true;

  ws.on('pong', () => {
    extWs.isAlive = true;
  });

  ws.on('message', (message: string) => {
    ws.send(`Hello, you ask -> ${message}`);
    ws.send(`Charybdis is there!`);
  });

  ws.send(`Hi there, I am a Charybdis WebSocket server`);
});

const connectionInterval = setInterval(() => {
  wss.clients.forEach((ws: Websocket) => {
    const extWs = ws as IExtWebSocket;
    if (!extWs.isAlive) return ws.terminate();

    extWs.isAlive = false;
    ws.ping(null, undefined);
  });
}, 10000);

wss.on('close', () => {
  clearInterval(connectionInterval);
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
