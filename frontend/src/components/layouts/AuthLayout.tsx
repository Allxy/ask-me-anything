import { memo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

function AuthLayout (): JSX.Element {
  const { user } = useUser();

  if (user !== null) {
    return <Navigate to='/' />;
  }

  return (<>
  <Outlet />
  </>);
}

export default memo(AuthLayout);
