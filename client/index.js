import React from 'react';
import * as ReactDOM from "react-dom/client";
import App from './App.jsx';
import styles from './styles/styles.css';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('contents')).render(
  <Provider store= {store}>
    <React.StrictMode>
        <App />
    </ React.StrictMode>
  </ Provider>
);

  