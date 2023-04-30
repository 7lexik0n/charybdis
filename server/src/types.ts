import Websocket from 'ws';

export interface IExtWebSocket extends Websocket {
  isAlive: boolean;
}
