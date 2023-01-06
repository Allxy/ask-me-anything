import { Center, Spinner } from '@chakra-ui/react';
import { memo, Suspense } from 'react';
import { Await, Outlet } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/UserContext';
import { useLoaderTypedData } from '../../hooks/useLoaderTypedData';

const UserLayout: React.FC = () => {
  const { userPromise } = useLoaderTypedData();

  return (
    <Suspense fallback={<Center minH='100vh'><Spinner /></Center>}>
      <Await
        resolve={userPromise}
        children={(user) => {
          return (
          <UserContextProvider value={ user }>
            <Outlet />
          </UserContextProvider>
          );
        }}
      />
    </Suspense>
  );
};

export default memo(UserLayout);
