import { memo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Header from '../Header';

function AuthLayout (): JSX.Element {
  const { user } = useUser();

  if (user !== null) {
    return <Navigate to="/" />;
  }

  return (<>
  <Header />
  <Outlet />
  </>);
}

export default memo(AuthLayout);
