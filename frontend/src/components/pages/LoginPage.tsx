import { CheckIcon, CloseIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, InputRightElement, Tooltip } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/storeHooks';
import useForm from '../../hooks/useForm';
import { fetchSignin } from '../../store/slices/userSlice';
import AuthContainer from '../containers/AuthContainer';

const initialValues = {
  email: '',
  password: ''
};

const LoginPage: React.FC = () => {
  const { values, errors, isValid, onChange } = useForm(initialValues);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (): Promise<void> => {
    return dispatch(fetchSignin(values))
      .then(()=>navigate("/"));
  };

  return (
    <AuthContainer
      title='Sign In'
      buttonText='Sign In'
      isValid={isValid}
      link='/sign-up'
      linkTitle='You have no account? Sign Up!'
      onSubmit={handleSubmit}
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
