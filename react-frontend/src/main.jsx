import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const originalFetch = window.fetch.bind(window);

if (API_BASE_URL) {
  window.fetch = (input, init) => {
    if (typeof input === 'string') {
      const rewritten = input.replace(/^https?:\/\/localhost:(3000|5000)/, API_BASE_URL);
      return originalFetch(rewritten, init);
    }
    if (input instanceof Request) {
      const rewritten = input.url.replace(/^https?:\/\/localhost:(3000|5000)/, API_BASE_URL);
      if (rewritten !== input.url) {
        const nextRequest = new Request(rewritten, input);
        return originalFetch(nextRequest, init);
      }
    }
    return originalFetch(input, init);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
