import React, { memo } from 'react';
import { createBrowserRouter, createRoutesFromElements, defer, Route, RouterProvider } from 'react-router-dom';
import { sendAnswer, sendQuestion, signIn, signUp } from '../actions';
import { answersLoader, dislikeLoader, likeLoader, questionsLoader, searchLoader, signOutLoader, tokenLoader, userLoader } from '../loaders';
import { allRoles } from '../models/User';
import { AuthLayout, ProtectedLayout, UserLayout } from './layouts';
import { ErrorPage, FeedPage, LoginPage, ProfilePage, RegisterPage, SignOutPage } from './pages';
import IncomePage from './pages/IncomePage';
import SearchPage from './pages/SearhPage';

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
        <Route path='answer/:answerId'>
          <Route path='like' loader={likeLoader}></Route>
          <Route path='dislike' loader={dislikeLoader}></Route>
        </Route>
        <Route path='search' element={<SearchPage />} loader={searchLoader} />
        <Route path='/' element={<FeedPage />} >
          <Route path='answers' loader={answersLoader} />
        </Route>
        <Route
          path='user/:userID'
          element={<ProfilePage />}
          loader={userLoader}
        >
          <Route path='answers' loader={answersLoader} />
          <Route path='ask' action={sendQuestion} />
        </Route>

        <Route
          path='income'
          element={<IncomePage />}
          loader={questionsLoader}
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
