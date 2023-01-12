import { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ERole } from '../../models/User';
import useUser from '../../hooks/useUser';
import Header from '../Header';
import { Box, useMediaQuery } from '@chakra-ui/react';
import Toolbar from '../Toolbar';

interface ProtectedLayoutProps {
  roles: ERole[]
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ roles }) => {
  const { user } = useUser();
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
        mt={isDesktop ? '14' : '0'}
        pb={isDesktop ? '0' : '20'}
        pt='4'
      >
        <Outlet />
      </Box>
    </>
  );
};

export default memo(ProtectedLayout);
