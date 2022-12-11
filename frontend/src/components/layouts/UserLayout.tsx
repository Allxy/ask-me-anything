import { memo, Suspense } from 'react';
import { Await, Outlet } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/UserContext';
import Header from '../Header';
import { useLoaderUserData } from '../hooks/LoaderDataHooks';
import Loader from '../ui/Loader';

const UserLayout: React.FC = () => {
  const { userPromise } = useLoaderUserData();

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={userPromise}
        children={(user) => {
          return (
          <UserContextProvider value={user}>
            <Header />
            <Outlet />
          </UserContextProvider>
          );
        }}
      />
    </Suspense>
  );
};

export default memo(UserLayout);
