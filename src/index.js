import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from  "./routes/Home";
import Login from  "./routes/Login";
import Cadastro from  "./routes/Cadastro";

const router = createBrowserRouter([
  {
   path: '/',
   element: <Home/> 
  },
  {
   path: 'login',
   element: <Login/> 
  },
  {
   path: 'register',
   element: <Cadastro/> 
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
