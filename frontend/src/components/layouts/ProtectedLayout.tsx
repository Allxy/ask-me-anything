import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Header';
import useUser from '../hooks/useUser';

interface ProtectedLayoutProps {
  role: string
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ role }) => {
  const { user } = useUser();

  if (user === null) {
    return <Navigate to="/sign-in" />;
  }

  if (user?.role !== role) {
    throw new Error('You have no rights!');
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default React.memo(ProtectedLayout);
