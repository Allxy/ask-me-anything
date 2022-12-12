import React from 'react';
import { createBrowserRouter, createRoutesFromElements, defer, Route, RouterProvider } from 'react-router-dom';
import AMAApi from '../AMAApi';
import { ERole, IUser } from '../models/User';
import { UserLayout, AuthLayout, ProtectedLayout } from './layouts';
import { ErrorPage, LoginPage, RegisterPage, FeedPage, ProfilePage } from './pages';
import SignOut from './pages/SignOutPage';

async function signIn ({ request }: { request: Request }): Promise<IUser | null> {
  try {
    const data = await AMAApi.getDataFromFromRequest(request);
    const responce = await AMAApi.signIn(data);
    AMAApi.setToken(responce.data.token);
    const user = await AMAApi.getUserMe();
    return user;
  } catch (error) {
    return null;
  }
}

async function signUp ({ request }: { request: Request }): Promise<boolean> {
  try {
    const data = await AMAApi.getDataFromFromRequest(request);
    await AMAApi.signUp(data);
    return true;
  } catch (error) {
    return false;
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<UserLayout />}
      loader={() => defer({ userPromise: AMAApi.getUserMe() })}
      errorElement={<ErrorPage />}
    >
      <Route
        element={<AuthLayout />}
      >
        <Route
          path='/sign-in'
          element={<LoginPage />}
          action={signIn}
        />
        <Route
          path='/sign-up'
          element={<RegisterPage />}
          action={signUp}
        />
      </Route>

      <Route element={<ProtectedLayout role={ERole.USER} />}>
        <Route path='/' element={<FeedPage />}></Route>
        <Route
          path='/profile'
          element={<ProfilePage />}
          loader={() => {
            return defer({
              meQuestPromise: AMAApi.getQuestionsForMe(),
              myQuestPromise: AMAApi.getMyQuestions()
            });
          }}
        />
      </Route>

      <Route
          path='sign-out'
          element={<SignOut />}
          loader={() => {
            AMAApi.removeToken();
            return null;
          }}
      />
    </Route>
  ));

const AppRouter: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRouter;
