import { memo, Suspense } from 'react';
import { Await, Outlet } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/UserContext';
import { IUser } from '../../models/User';
import Header from '../Header';
import { useLoaderTypedData } from '../hooks/useLoaderTypedData';
import Loader from '../ui/Loader';

const UserLayout: React.FC = () => {
  const { userPromise } = useLoaderTypedData<Promise<IUser | null>>();

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
