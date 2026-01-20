import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from "./routes/Home";
import Login from "./routes/Login";

import Dashboard from "./view/dashboard/dashboard";
import Agendamento from "./view/agendamento/agendamento";
import Feedback from "./view/feedback/feedback";
import Cadastro from "./routes/Cadastro";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/cadastro',
    element: <Cadastro />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  ,
  {
    path: '/feedback',
    element: <Feedback />
  },
  ,
  {
    path: '/agendamento',
    element: <Agendamento />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
