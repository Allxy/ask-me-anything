import React, { memo } from 'react';
import { createBrowserRouter, createRoutesFromElements, defer, Route, RouterProvider } from 'react-router-dom';
import { signIn, signUp, sendQuestion, sendAnswer } from '../actions';
import { answersLoader, questionsLoader, searchLoader, signOutLoader, tokenLoader, userLoader } from '../loaders';
import { allRoles } from '../models/User';
import { AuthLayout, ProtectedLayout, UserLayout } from './layouts';
import { ErrorPage, FeedPage, LoginPage, ProfilePage, RegisterPage, SignOutPage } from './pages';
import IncomePage from './pages/IncomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<UserLayout />}
      loader={(args) => defer({ userPromise: tokenLoader(args) })}
      errorElement={<ErrorPage />}
    >
      <Route element={<AuthLayout />} >
        <Route path='sign-in' action={signIn} element={<LoginPage />} />
        <Route path='sign-up' action={signUp} element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedLayout roles={allRoles} />} >
        <Route path='search' loader={searchLoader} />
        <Route path='' element={<FeedPage />} />
        <Route
          path='user/:userID'
          element={<ProfilePage />}
          loader={async (args) => ({
            currentUser: await userLoader(args),
            answers: await answersLoader(args)
          })
          }
        >
          <Route path='ask' action={sendQuestion} />
        </Route>

        <Route
          path='income'
          element={<IncomePage />}
          loader={(args) => defer({ questionsPromise: questionsLoader(args) })}
        >
          <Route
            path=':questionId'
            action={sendAnswer}
          />
        </Route>
        <Route
          path='sign-out'
          element={<SignOutPage />}
          loader={signOutLoader}
        />
      </Route>
    </Route>
  ));

const AppRouter: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default memo(AppRouter);
