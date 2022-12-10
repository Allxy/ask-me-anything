import { useFetcher } from 'react-router-dom';

function Register (): JSX.Element {
  const fetcher = useFetcher();

  return (
    <div>
      <fetcher.Form method="post" action="/sign-up">
        <input type="email" name="email" />
        <input type="login" name="login" />
        <input type="password" name="password" />
        <input type="name" name="name" />
        <button type="submit">Войти</button>
      </fetcher.Form>
    </div>
  );
}

export default Register;
