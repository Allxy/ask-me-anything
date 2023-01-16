import React, { memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { allRoles } from '../models/User';
import { AuthLayout, ProtectedLayout, UserLayout } from './layouts';
import FeedPage from './pages/FeedPage';
import IncomePage from './pages/IncomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearhPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />} >
          <Route element={<AuthLayout />} >
            <Route path='sign-in' element={<LoginPage />} />
            <Route path='sign-up' element={<RegisterPage />} />
          </Route>

          <Route path='/' element={<ProtectedLayout roles={allRoles} />} >
            <Route
              path='income'
              element={<IncomePage />} 
            />
            <Route
              path='user/:userID'
              element={<ProfilePage />}
            />
            <Route 
              path='search' 
              element={<SearchPage />}
            />
            <Route 
              path='/' 
              element={<FeedPage />} 
            />
            {
            //   <Route path='answer/:answerId'> </Route>
            // 
            //   <Route path='answers' />
            // </Route>
            // 
            //   <Route path='answers'/>
            //   <Route path='ask'/>
            // </Route>
            //   <Route
            //     path=':questionId'
            //   />
            // </Route>
            }
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default memo(AppRouter);
