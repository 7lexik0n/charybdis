import { IWsAnswer } from '../shared/wsTypes';

export const openConnection = () => {
  return new WebSocket(`ws://localhost:8000`);
};

let webSocket = openConnection();

webSocket.onopen = () => {
  console.log('[ws:client] Соединение установлено');
};

webSocket.onmessage = (e: MessageEvent<string>) => {
  const data = JSON.parse(e.data) as IWsAnswer;
  console.log(`[ws:server] ${data.message}`);

  if (data.payload) {
    console.log(`[ws:server] ${JSON.stringify(data.payload)}`);
  }
};

webSocket.onclose = () => {
  webSocket = openConnection();
};

export default webSocket;
