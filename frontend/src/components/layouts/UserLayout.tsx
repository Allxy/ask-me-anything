import { AxiosResponse } from 'axios';
import { Suspense, useCallback } from 'react';
import { Await, Outlet, useLoaderData } from 'react-router-dom';
import AMAApi from '../../AMAApi';
import { UserContextProvider, useUser } from '../../contexts/UserContext';
import User from '../../models/User';

const UserLayout: React.FC = () => {
  const { userPromise } = useLoaderData() as { userPromise: Promise<AxiosResponse<User, any>> };
  const { setUser } = useUser();

  const fetchUser = useCallback(async () => {
    return await userPromise.then((user) => {
      setUser(user.data);
      return user.data;
    }).catch((err) => {
      console.log(err);

      if (err.code !== 'ERR_NETWORK') {
        AMAApi.removeToken();
      }
      setUser(null);
      return null;
    });
  }, []);

  return (
    <Suspense fallback={<div>LOADING</div>}>
      <Await
        resolve={fetchUser}
        children={(user) => (
          <UserContextProvider value={user}>
            <Outlet />
          </UserContextProvider>
        )}
      />
    </Suspense>
  );
};

export default UserLayout;
