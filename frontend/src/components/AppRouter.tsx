import React from 'react';
import { createBrowserRouter, createRoutesFromElements, defer, Route, RouterProvider } from 'react-router-dom';
import AMAApi from '../AMAApi';
import { AsyncData } from '../models/AsyncData';
import { ERole, IUser } from '../models/User';
import { AuthLayout, ProtectedLayout, UserLayout } from './layouts';
import { ErrorPage, FeedPage, LoginPage, ProfilePage, RegisterPage } from './pages';
import SignOut from './pages/SignOutPage';

async function signIn ({ request }: { request: Request }): Promise<AsyncData<IUser>> {
  return await AMAApi.AxiosToAsyncData(async () => {
    const data = await AMAApi.getDataFromFromRequest(request);
    const responce = await AMAApi.signIn(data);
    AMAApi.setToken(responce.data.token);
    return await AMAApi.getUserMe();
  });
}

async function signUp ({ request }: { request: Request }): Promise<AsyncData<IUser>> {
  return await AMAApi.AxiosToAsyncData(async () => {
    const data = await AMAApi.getDataFromFromRequest(request);
    return await AMAApi.signUp(data);
  });
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<UserLayout />}
      loader={() => {
        if (AMAApi.getToken() === undefined) {
          return { userPromise: null };
        }
        return defer({ userPromise: AMAApi.AxiosToAsyncData(async () => await AMAApi.getUserMe()) });
      }}
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
        <Route
          path='/search'
          loader={async ({ request }) => await AMAApi.AxiosToAsyncData(async () => await AMAApi.getUsers(new URL(request.url).searchParams))}
        />
        <Route path='/' element={<FeedPage />}></Route>
        <Route
          path='/profile'
          element={<ProfilePage />}
          loader={() => {
            return defer({
              meQuestPromise: AMAApi.AxiosToAsyncData(async () => await AMAApi.getQuestionsForMe()),
              myQuestPromise: AMAApi.AxiosToAsyncData(async () => await AMAApi.getMyQuestions())
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
