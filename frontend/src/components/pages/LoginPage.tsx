import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { IUser } from '../../models/User';
import AuthContainer from '../containers/AuthContainer';
import useForm from '../hooks/useForm';
import useUser from '../hooks/useUser';
import InputWithError from '../ui/InputWithError';

const initialValues = {
  email: '',
  password: ''
};

const LoginPage: React.FC = () => {
  const fetcher = useFetcher<IUser>();
  const { setUser } = useUser();
  const { values, errors, isValid, onChange } = useForm(initialValues);

  useEffect(() => {
    if ((fetcher.data?.login) !== undefined) {
      setUser(fetcher.data ?? null);
    }
  }, [fetcher, setUser]);

  return (
    <AuthContainer
      title="Sign In"
      fetcher={fetcher}
      className="login__auth"
      action='/sign-in'
      buttonText="Sign In"
      isValid={isValid}
      link="/sign-up"
      linkTitle="You have no account? Sign Up!"
    >
        {Object.keys(values).map((key) =>
          <InputWithError
            key={key}
            type={key}
            name={key}
            required
            placeholder={key.substring(0, 1).toUpperCase() + key.substring(1)}
            value={values[key as keyof typeof values]}
            error={errors[key as keyof typeof errors]}
            onChange={onChange}
          />
        )}
    </AuthContainer>
  );
};

export default LoginPage;
