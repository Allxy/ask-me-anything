import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import FormWithContent from '../hoc/FormWithContent';
import { useForm } from '../hooks/useForm';
import Button from '../ui/Button';
import InputWithError from '../ui/InputWithError';
import './Login.css';

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
    <div className='login'>
      <h1>Sign In</h1>

      <FormWithContent
        className="login__form"
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
    </div>
  );
};

export default Login;
