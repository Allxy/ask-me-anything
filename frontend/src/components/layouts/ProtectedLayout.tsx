import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const ProtectedLayout: React.FC = (props) => {
  const { user } = useUser();

  if (user === null) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
