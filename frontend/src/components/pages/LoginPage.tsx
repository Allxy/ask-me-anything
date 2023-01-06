import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { IUser } from '../../models/User';
import AuthContainer from '../containers/AuthContainer';
import useForm from '../../hooks/useForm';
import useUser from '../../hooks/useUser';
import { Input, InputGroup, InputLeftElement, InputRightElement, Tooltip } from '@chakra-ui/react';
import { EmailIcon, LockIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const initialValues = {
  email: '',
  password: ''
};

const LoginPage: React.FC = () => {
  const fetcher = useFetcher<IUser | null>();
  const { setUser } = useUser();
  const { values, errors, isValid, onChange } = useForm(initialValues);

  useEffect(() => {
    if (fetcher.state === 'idle') {
      if (fetcher.data?.login !== undefined) {
        setUser(fetcher.data);
      }
    }
  }, [fetcher, setUser]);

  return (
    <AuthContainer
      title='Sign In'
      fetcher={fetcher}
      action='/sign-in'
      buttonText='Sign In'
      isValid={isValid}
      link='/sign-up'
      linkTitle='You have no account? Sign Up!'
    >
      <Tooltip label={errors.email}>
        <InputGroup>
          <InputLeftElement children={<EmailIcon />} />
          <Input
            type='email'
            name='email'
            required
            placeholder='Email'
            value={values.email}
            onChange={onChange}
          />
          <InputRightElement>
            {errors.email === '' && <CheckIcon color='green.500'></CheckIcon>}
            {errors.email !== undefined && errors.email.length > 0 && <CloseIcon color='red.500'></CloseIcon>}
          </InputRightElement>
        </InputGroup>
      </Tooltip>

      <Tooltip label={errors.password}>
        <InputGroup>
          <InputLeftElement children={<LockIcon />} />
          <Input
            type='password'
            name='password'
            required
            placeholder='Password'
            value={values.password}
            onChange={onChange}
            isInvalid={Boolean(errors.password)}
          />
          <InputRightElement>
            {errors.password === '' && <CheckIcon color='green.500'></CheckIcon>}
            {errors.password !== undefined && errors.password.length > 0 &&
                <CloseIcon color='red.500' ></CloseIcon>
              }
          </InputRightElement>
        </InputGroup>
      </Tooltip>
    </AuthContainer>
  );
};

export default LoginPage;
