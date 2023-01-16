import { memo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/storeHooks';
import { userSelector } from '../../store/slices/userSlice';

const AuthLayout: React.FC = () => {
  const user = useAppSelector(userSelector);

  if (user !== null) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default memo(AuthLayout);
