import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const SignOut: React.FC = () => {
  const { setUser } = useUser();

  useEffect(() => {
    setUser(null);
  }, [setUser]);

  return <Navigate to="/sign-in" />;
};

export default SignOut;
