import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ERole } from '../../models/User';
import Header from '../Header';
import useUser from '../hooks/useUser';

interface ProtectedLayoutProps {
  roles: ERole[]
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ roles }) => {
  const { user } = useUser();

  if (user === null) {
    return <Navigate to="/sign-in" />;
  }

  if (!(roles.includes(user?.role))) {
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
