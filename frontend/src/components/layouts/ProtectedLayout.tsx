import { Box, useMediaQuery } from '@chakra-ui/react';
import { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/storeHooks';
import { ERole } from '../../models/User';
import { userSelector } from '../../store/slices/userSlice';
import Header from '../Header';
import Toolbar from '../Toolbar';

interface ProtectedLayoutProps {
  roles: ERole[]
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ roles }) => {
  const user = useAppSelector(userSelector);
  const [isDesktop] = useMediaQuery('only screen and (min-device-width: 768px)');

  if (user === null) {
    return <Navigate to='/sign-in' />;
  }

  if (!(roles.includes(user?.role))) {
    throw new Error('You have no rights!');
  }

  return (
    <>
      {isDesktop ? <Header /> : <Toolbar />}
      <Box
        pt={isDesktop ? '20' : '4'}
        pb={isDesktop ? '0' : '20'}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default memo(ProtectedLayout);
