import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import FormWithContent from '../hoc/FormWithContent';
import './Login.css';

const Login: React.FC = () => {
  const fetcher = useFetcher();
  const { setUser } = useUser();

  useEffect(() => {
    if (fetcher.data !== undefined && fetcher.data !== null) {
      setUser(fetcher.data);
    }
  }, [fetcher, setUser]);

  return (
    <FormWithContent className="login__form" action='/sign-in' form={fetcher.Form}>
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button type="submit">Войти</button>
    </FormWithContent>
  );
};

export default Login;
