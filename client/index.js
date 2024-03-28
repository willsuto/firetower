import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
// import styles from './styles/styles.scss';


const root = createRoot(document.getElementById('contents'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  