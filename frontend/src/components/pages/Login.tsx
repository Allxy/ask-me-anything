import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

function Login (): JSX.Element {
  const fetcher = useFetcher();
  const { setUser } = useUser();

  useEffect(() => {
    if (fetcher.data !== undefined && fetcher.data !== null) {
      setUser(fetcher.data);
    }
  }, [fetcher, setUser]);

  return (
    <div>
      <fetcher.Form method="post" action="/sign-in">
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button type="submit">Войти</button>
      </fetcher.Form>
    </div>
  );
}

export default Login;
