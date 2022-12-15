import { memo, Suspense } from 'react';
import { Await, Outlet } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/UserContext';
import { useLoaderTypedData } from '../hooks/useLoaderTypedData';
import Loader from '../ui/Loader';

const UserLayout: React.FC = () => {
  const { userPromise } = useLoaderTypedData();

  return (
    <Suspense fallback={<Loader />}>
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
