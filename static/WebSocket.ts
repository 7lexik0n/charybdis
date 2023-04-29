export const openConnection = () => {
  return new WebSocket(`ws://localhost:8000`);
};

let webSocket = openConnection();

webSocket.onopen = () => {
  console.log('[ws:client] Соединение установлено');
};

webSocket.onmessage = (e) => {
  console.log(`[ws:server] ${e.data}`);
};

webSocket.onclose = () => {
  webSocket = openConnection();
};

export default webSocket;
