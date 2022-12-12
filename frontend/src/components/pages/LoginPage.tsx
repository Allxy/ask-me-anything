import { useEffect } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import AuthContainer from '../containers/AuthContainer';
import FormWithContent from '../hoc/FormWithContent';
import useForm from '../hooks/useForm';
import useUser from '../hooks/useUser';
import InputWithError from '../ui/InputWithError';

const initialValues = {
  email: '',
  password: ''
};

const LoginPage: React.FC = () => {
  const fetcher = useFetcher();
  const { setUser } = useUser();
  const { values, errors, isValid, onChange } = useForm(initialValues);

  useEffect(() => {
    if (fetcher?.data !== undefined && fetcher.data !== null) {
      setUser(fetcher.data);
    }
  }, [fetcher, setUser]);

  return (
    <AuthContainer title="Sign In">
      <FormWithContent
        className="auth__form"
        method='post'
        action='/sign-in'
        form={fetcher.Form}
        buttonText="Sign In"
        isValid={isValid}
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
      </FormWithContent>
      <Link className='auth__link' to='/sign-up'>You have no account? Sign Up!</Link>
    </AuthContainer>
  );
};

export default LoginPage;
