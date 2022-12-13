import { memo, Suspense } from 'react';
import { Await, Outlet } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/UserContext';
import { AsyncData } from '../../models/AsyncData';
import { IUser } from '../../models/User';
import { useLoaderTypedData } from '../hooks/useLoaderTypedData';
import Loader from '../ui/Loader';

const UserLayout: React.FC = () => {
  const { userPromise } = useLoaderTypedData<AsyncData<IUser>>();

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={userPromise}
        children={(data) => {
          return (
          <UserContextProvider value={data?.payload ?? null}>
            <Outlet />
          </UserContextProvider>
          );
        }}
      />
    </Suspense>
  );
};

export default memo(UserLayout);
