import { AxiosResponse } from 'axios';
import { memo, Suspense } from 'react';
import { Await, Outlet, useLoaderData } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/UserContext';
import User from '../../models/User';
import Header from '../Header';

const UserLayout: React.FC = () => {
  const { userPromise } = useLoaderData() as { userPromise: Promise<AxiosResponse<User, any>> };

  return (
    <Suspense fallback={<div>LOADING</div>}>
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
