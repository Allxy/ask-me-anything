import { Center, Heading, Text } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as any;

  return (
    <Center
      flexDirection='column'
      h='100vh'
      bg='gray.300'
      _dark={{ bg: 'gray.800' }}
      p={8}
    >
      <Heading>Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text as='i'>
        {error?.status} {error.name} {error.message ?? error.statusText}
      </Text>
    </Center>
  );
};

export default ErrorPage;
