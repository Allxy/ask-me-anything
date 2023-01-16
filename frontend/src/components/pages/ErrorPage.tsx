import { Center, Heading, Text } from '@chakra-ui/react';

interface ErrorPageProps {
  message: string
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
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
        {message}
      </Text>
    </Center>
  );
};

export default ErrorPage;
