import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

function MainLayout (): JSX.Element {
  return (<>
  <Header />
  <Outlet />
  </>);
}

export default memo(MainLayout);
