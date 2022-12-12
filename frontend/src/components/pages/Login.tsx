import { useEffect } from 'react';
import { useFetcher, Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import FormWithContent from '../hoc/FormWithContent';
import { useForm } from '../hooks/useForm';
import Button from '../ui/Button';
import InputWithError from '../ui/InputWithError';
import AuthWrapper from '../presentation/AuthWrapper';

const initialValues = {
  email: '',
  password: ''
};

const Login: React.FC = () => {
  const fetcher = useFetcher();
  const { setUser } = useUser();
  const { values, errors, onChange } = useForm(initialValues);

  useEffect(() => {
    if (fetcher?.data !== undefined && fetcher.data !== null) {
      setUser(fetcher.data);
    }
  }, [fetcher, setUser]);

  return (
    <AuthWrapper title="Sign In">
      <FormWithContent
        className="auth__form"
        method='post'
        action='/sign-in'
        form={fetcher.Form}
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
        <Button type="submit">Sign In</Button>
      </FormWithContent>
      <Link className='auth__link' to='/sign-up'>You have no account? Sign Up!</Link>
    </AuthWrapper>
  );
};

export default Login;
