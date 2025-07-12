import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeTheme } from './theme';
import './index.css';

// Initialize theme before rendering
initializeTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 