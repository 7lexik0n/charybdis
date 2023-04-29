import { createRoot } from 'react-dom/client';
import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import styles from './../App.module.css';
import webSocket from './WebSocket';

const sendMessage = () => {
  if (webSocket.OPEN) {
    console.log(`[ws:client] Отправляем данные на сервер`);
    webSocket.send(JSON.stringify({
      type: 'test',
    }));
  }
};

const App = () => {
  return (
    <Container maxWidth="xl">
      <div className={styles.app}>
        <Typography component="h1" variant="h4" mb={5}>Charybdis</Typography>
        <div>
          <Button variant="contained" onClick={sendMessage}>Click me</Button>
        </div>
      </div>
    </Container>
  );
};

const rootEl = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootEl);

export const renderApp = () => root.render(<App />);
