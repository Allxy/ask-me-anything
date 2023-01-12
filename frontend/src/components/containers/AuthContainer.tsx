import { Box, Button, Container, Heading, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as RouterLink, FetcherWithComponents } from 'react-router-dom';
import Logo from '../ui/Logo';

interface AuthContainerProps {
  children: ReactNode
  title: string
  className?: string
  fetcher: FetcherWithComponents<any>
  buttonText: string
  isValid: boolean
  action: string
  link: string
  linkTitle: string
}

const AuthContainer: React.FC<AuthContainerProps> = ({ fetcher, ...props }) => {
  return (
    <Container
      maxW='lg'
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <VStack mb='8' >
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
          as={fetcher.Form}
          maxW='96' width='100%'
          noValidate action={props.action}
          method='post'
        >
          {props.children}
          <Text
            align='center'
            color='red.500'
            minH={8}
            visibility={fetcher.data?.message !== undefined ? 'visible' : 'hidden'}
          >
            {fetcher.data?.message}
          </Text>
          <Button
            colorScheme='facebook'
            disabled={!props.isValid || fetcher.state !== 'idle'}
            type='submit'
            isLoading={fetcher.state !== 'idle'}
          >
            {props.buttonText}
          </Button>
        </Stack>
        <Link as={RouterLink} to={props.link}>{props.linkTitle}</Link>
      </VStack>
    </Container>
  );
};

export default AuthContainer;
