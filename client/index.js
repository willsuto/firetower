import React from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactDOM from "react-dom/client";
import{
  BrowserRouter,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import { Provider } from 'react-redux';
import App from './App.jsx';
import styles from './styles/styles.scss';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <a href={'/app'}>login</a>,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: "/app",
//     element: <App />
//   }
// ]);

ReactDOM.createRoot(document.getElementById('contents')).render(
  <React.StrictMode>
    <BrowserRouter>
      
    </BrowserRouter>
  </React.StrictMode>
);




// const root = createRoot(document.getElementById('contents'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
  