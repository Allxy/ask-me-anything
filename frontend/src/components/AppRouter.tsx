import React from 'react';
import { createBrowserRouter, createRoutesFromElements, defer, Route, RouterProvider } from 'react-router-dom';
import AMAApi from '../AMAApi';
import User from '../models/User';
import { UserLayout, AuthLayout, ProtectedLayout } from './layouts';
import { ErrorPage, Login, Register } from './pages';

async function signIn ({ request }: { request: Request }): Promise<User | null> {
  const formData = await request.formData();
  try {
    const data = AMAApi.getDataFromForm(formData);
    const responce = await AMAApi.signIn(data);
    AMAApi.setToken(responce.data.token);
    const user = await AMAApi.getUserMe();
    return user.data;
  } catch (error) {
    return null;
  }
}

async function signUp ({ request }: { request: Request }): Promise<boolean> {
  const formData = await request.formData();
  try {
    const data = AMAApi.getDataFromForm(formData);
    await AMAApi.signUp(data);
    return true;
  } catch (error) {
    return false;
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<UserLayout />}
      loader={() => defer({ userPromise: AMAApi.getUserMe() })}
      errorElement={<ErrorPage />}
    >
      <Route
        element={<AuthLayout />}
      >
        <Route
          path='sign-in'
          element={<Login />}
          action={signIn}
        />
        <Route
          path='sign-up'
          element={<Register />}
          action={signUp}
        />
      </Route>
      <Route element={<ProtectedLayout />}></Route>
    </Route>
  ));

const AppRouter: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRouter;
