import { Center, Spinner } from '@chakra-ui/react';
import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { fetchIncome } from '../../store/slices/incomeSlice';
import { fetchUser } from '../../store/slices/userSlice';

const UserLayout: React.FC = () => {
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchIncome());
  }, [dispatch]);

  if (loading) {
    return <Center h='100vh'>
        <Spinner alignSelf='center' />
      </Center>;
  }

  return <Outlet />;
};

export default memo(UserLayout);
