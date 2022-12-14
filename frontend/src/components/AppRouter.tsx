import React, { memo } from 'react';
import { ActionFunctionArgs, createBrowserRouter, createRoutesFromElements, defer, Route, RouterProvider } from 'react-router-dom';
import AMAApi from '../AMAApi';
import { AsyncData } from '../models/AsyncData';
import { IQuestion } from '../models/Question';
import { ERole, IUser } from '../models/User';
import { AuthLayout, ProtectedLayout, UserLayout } from './layouts';
import { ErrorPage, FeedPage, LoginPage, ProfilePage, RegisterPage } from './pages';
import IncomePage from './pages/IncomePage';
import SignOut from './pages/SignOutPage';

async function signIn ({ request }: ActionFunctionArgs): Promise<AsyncData<IUser>> {
  return await AMAApi.AxiosToAsyncData(async () => {
    const data = await AMAApi.getDataFromFromRequest(request);
    const responce = await AMAApi.signIn(data);
    AMAApi.setToken(responce.data.token);
    return await AMAApi.getUserMe();
  });
}

async function signUp ({ request }: ActionFunctionArgs): Promise<AsyncData<IUser>> {
  return await AMAApi.AxiosToAsyncData(async () => {
    const data = await AMAApi.getDataFromFromRequest(request);
    return await AMAApi.signUp(data);
  });
}

async function askUser ({ request, params }: ActionFunctionArgs): Promise<AsyncData<IQuestion>> {
  return await AMAApi.AxiosToAsyncData(async () => {
    const data = await AMAApi.getDataFromFromRequest(request);
    data.anonim === 'on' ? data.anonim = true : data.anonim = false;
    data.owner = params.userID;
    return await AMAApi.postQuestion(data);
  });
}

async function sendAnswer ({ request, params }: ActionFunctionArgs): Promise<AsyncData<IQuestion>> {
  return await AMAApi.AxiosToAsyncData(async () => {
    const data = await AMAApi.getDataFromFromRequest(request);
    data.question = params.questionId;
    return await AMAApi.postAnswer(data);
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
          path='sign-in'
          element={<LoginPage />}
          action={signIn}
        />
        <Route
          path='sign-up'
          element={<RegisterPage />}
          action={signUp}
        />
      </Route>

      <Route element={<ProtectedLayout role={ERole.USER} />}>
        <Route
          path='search'
          loader={async ({ request }) => await AMAApi.AxiosToAsyncData(async () => await AMAApi.getUsers(new URL(request.url).searchParams))}
        />
        <Route path='' element={<FeedPage />}></Route>
        <Route
          path='user/:userID'
          element={<ProfilePage />}
          loader={({ params, context }) => defer({
            userPromise: AMAApi.getUser(params.userID ?? '').then(res => res.data),
            answersPromise: AMAApi.getUserAnswers(params.userID ?? '').then(res => res.data)
          })}
        >
          <Route
            path='ask'
            action={askUser}
          />
        </Route>
        <Route
          path='income'
          element={<IncomePage />}
          loader={() => defer({
            questionsPromise: AMAApi.getQuestions().then(res => res.data)
          })}
        >
          <Route
            path=':questionId'
            action={sendAnswer}
          />
        </Route>
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

export default memo(AppRouter);
