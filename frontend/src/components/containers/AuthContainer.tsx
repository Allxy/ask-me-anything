import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { FormEventHandler, ReactNode, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../ui/Logo';

interface AuthContainerProps {
  children: ReactNode;
  title: string;
  buttonText: string;
  isValid: boolean;
  link: string;
  linkTitle: string;
  onSubmit: () => Promise<void>;
}

const AuthContainer: React.FC<AuthContainerProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsLoading(true);
    props.onSubmit().finally(() => setIsLoading(false));
  };

  return (
    <Container
      maxW='lg'
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <VStack mb='8'>
        <Box as={Logo} size={32} link='/sign-in' />
      </VStack>
      <VStack
        borderRadius='md'
        p={8}
        boxShadow='lg'
        bg='gray.100'
        _dark={{ bg: 'gray.700' }}
      >
        <Heading mb='2'>{props.title}</Heading>
        <Stack
          spacing={3}
          maxW='96'
          width='100%'
          as={'form'}
          onSubmit={handleSubmit}
        >
          {props.children}
          <Button
            colorScheme='facebook'
            disabled={false}
            type='submit'
            isLoading={isLoading}
          >
            {props.buttonText}
          </Button>
        </Stack>
        <Link as={RouterLink} to={props.link}>
          {props.linkTitle}
        </Link>
      </VStack>
    </Container>
  );
};

export default AuthContainer;
