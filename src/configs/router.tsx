import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MyErrorBoundary from '~/components/ErrorBoundary';
import MainLayout from '~/components/Layouts/Main';
import { PATHS } from '~/constants';
import NotFound404 from '~/features/404';

const Login = lazy(() => import('~/features/Login'));
const Dashboard = lazy(() => import('~/features/Dashboard'));
const AdministrativeManagement = lazy(() => import('~/features/AdministrativeManagement'));
const UserManagement = lazy(() => import('~/features/UserManagement'));
const TransactionManagement = lazy(() => import('~/features/TransactionManagement'));
const ReportManagement = lazy(() => import('~/features/ReportManagement'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <MyErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: PATHS.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: PATHS.ADMINISTRATIVE_MANAGEMENT,
        element: <AdministrativeManagement />,
      },
      {
        path: PATHS.USER_MANAGEMENT,
        element: <UserManagement />,
      },
      {
        path: PATHS.TRANSACTION_MANAGEMENT,
        element: <TransactionManagement />,
      },
      {
        path: PATHS.REPORT_MANAGEMENT,
        element: <ReportManagement />,
      },
    ],
  },
  {
    path: PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound404 />,
  },
]);

export default router;
