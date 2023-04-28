import { createRoot } from 'react-dom/client';
import React from 'react';

const App = () => {
  return (
    <div>React Charybdis update</div>
  );
};

const rootEl = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootEl);

export const renderApp = () => root.render(<App />);
