import { CheckIcon, CloseIcon, EmailIcon, InfoIcon, LockIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, InputRightElement, Tooltip, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AMAApi from '../../AMAApi';
import useForm from '../../hooks/useForm';
import AuthContainer from '../containers/AuthContainer';

const initialValues = {
  email: '',
  login: '',
  name: '',
  password: '',
  confirm: ''
};

const RegisterPage: React.FC = () => {
  const { values, errors, onChange, isValid } = useForm(initialValues);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (): Promise<void> => {
    return await AMAApi.signUp(values)
      .then(() => {
        navigate('/sign-in');
        toast({
          title: 'Success.',
            description: "Account have been registered.",
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
      }).catch((error)=> {
        toast({
          title: 'Error.',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
      });
  };

  return (
    <AuthContainer
      title='Sign Up'
      buttonText='Sign Up'
      isValid={isValid && values.confirm === values.password}
      link='/sign-in'
      linkTitle='Already have account? Sign In!'
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
            isInvalid={Boolean(errors.email)}
            onChange={onChange}
          />
          <InputRightElement>
            {errors.email === '' && <CheckIcon color='green.500'></CheckIcon>}
            {errors.email !== undefined && errors.email.length > 0 && <CloseIcon color='red.500'></CloseIcon>}
          </InputRightElement>
        </InputGroup>
      </Tooltip>

      <Tooltip label={errors.login}>
        <InputGroup>
          <InputLeftElement children={<InfoIcon />} />
          <Input
            type='login'
            name='login'
            required
            placeholder='Login'
            value={values.login}
            isInvalid={Boolean(errors.login)}
            onChange={onChange}
            minLength={5}
            maxLength={16}
          />
          <InputRightElement>
            {errors.login === '' && <CheckIcon color='green.500'></CheckIcon>}
            {errors.login !== undefined && errors.login.length > 0 && <CloseIcon color='red.500'></CloseIcon>}
          </InputRightElement>
        </InputGroup>
      </Tooltip>

      <Tooltip label={errors.name}>
        <InputGroup>
          <InputLeftElement children={<InfoIcon />} />
          <Input
            type='name'
            name='name'
            required
            placeholder='Name'
            value={values.name}
            isInvalid={Boolean(errors.name)}
            onChange={onChange}
            minLength={2}
            maxLength={16}
          />
          <InputRightElement>
            {errors.name === '' && <CheckIcon color='green.500'></CheckIcon>}
            {errors.name !== undefined && errors.name.length > 0 && <CloseIcon color='red.500'></CloseIcon>}
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
            isInvalid={Boolean(errors.password)}
            onChange={onChange}
          />
          <InputRightElement>
            {errors.password === '' && <CheckIcon color='green.500'></CheckIcon>}
            {errors.password !== undefined && errors.password.length > 0 && <CloseIcon color='red.500'></CloseIcon>}
          </InputRightElement>
        </InputGroup>
      </Tooltip>

      <InputGroup>
        <InputLeftElement children={<LockIcon />} />
        <Input
          type='password'
          name='confirm'
          required
          placeholder='Confirm password'
          value={values.confirm}
          isInvalid={Boolean(errors.confirm)}
          onChange={onChange}
        />
        <InputRightElement>
          {errors.confirm === '' && values.confirm === values.password && <CheckIcon color='green.500'></CheckIcon>}
          {values.confirm !== values.password && <CloseIcon color='red.500'></CloseIcon>}
        </InputRightElement>
      </InputGroup>
    </AuthContainer>
  );
};

export default RegisterPage;
