import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home/Home';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './error/ErrorPage';
import { AuthProvider } from '../context/AuthContext';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import { ROUTES } from '../constants/routes';
import { Loader } from '../components';
import { Layout } from './Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createHashRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider
          router={router}
          fallbackElement={<Loader />}
        />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
