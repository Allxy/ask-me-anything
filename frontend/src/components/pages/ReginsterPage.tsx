import { useEffect } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { IUser } from '../../models/User';
import AuthContainer from '../containers/AuthContainer';
import FormWithContent from '../hoc/FormWithContent';
import useForm from '../hooks/useForm';
import InputWithError from '../ui/InputWithError';

const initialValues = {
  email: '',
  login: '',
  name: '',
  password: '',
  confirm: ''
};

const validation = {
  login: {
    minLength: 5,
    maxLength: 16
  },
  name: {
    minLength: 2,
    maxLength: 16
  },
  email: {
  },
  confirm: {
    placeholder: 'Confirm password',
    type: 'password'
  }
};

const RegisterPage: React.FC = () => {
  const fetcher = useFetcher<IUser | null>();
  const { values, errors, onChange, isValid, setCustomError } = useForm(initialValues);

  useEffect(() => {
    if (values.confirm !== values.password && errors.confirm === undefined) {
      setCustomError('confirm', 'Not match');
    } else if (values.confirm === values.password && errors.confirm !== undefined) {
      setCustomError('confirm', undefined);
    }
  }, [values, errors, setCustomError]);

  return (
    <AuthContainer title="Sign Up">
      <FormWithContent
        className='auth__form'
        method="post"
        action="/sign-up"
        fetcher={fetcher}
        buttonText="Sign Up"
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
            {...validation[key as keyof typeof validation]}
          />
        )}
      </FormWithContent>
      <Link className='auth__link' to="/sign-in">You have no account? Sign Up!</Link>
    </AuthContainer>
  );
};

export default RegisterPage;
