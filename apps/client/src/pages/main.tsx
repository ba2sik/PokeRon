import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home/Home';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { AuthProvider } from '../context/AuthContext';
import { Register } from './auth/Register';
import { Login } from './auth/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
