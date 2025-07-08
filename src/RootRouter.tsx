import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HoldersPage from './pages/HoldersPage';
import TransactionsPage from './pages/TransactionsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/holders',
    element: <HoldersPage />,
  },
  {
    path: '/transactions',
    element: <TransactionsPage />,
  },
]);

const RootRouter: React.FC = () => <RouterProvider router={router} />;

export default RootRouter;
