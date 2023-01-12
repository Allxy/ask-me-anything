import { Avatar, Box, Button, Container, Flex, FormControl, Heading, HStack, Stack, Switch, Text, Textarea, Tooltip } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useUser from '../../hooks/useUser';
import { IUser } from '../../models/User';
import AnswersContainer from '../containers/AnswersContainer';

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const currentUser = useLoaderData() as IUser;
  const askFetcher = useFetcher();
  const { values, onChange, resetForm, errors, isValid } = useForm({ text: '' });

  useEffect(() => {
    if (askFetcher.state === 'idle' && askFetcher.data?.message === undefined) {
      resetForm();
    }
  }, [askFetcher, resetForm]);

  return (
    <Container maxW='container.md'>
    <Stack spacing='4'>
      <HStack spacing='4'>
        <Avatar name={currentUser.name} size='xl' />
        <Stack>
          <Text fontSize='xs'>@{currentUser.login}</Text>
          <Heading as='h1' size='xs'>{currentUser.name}</Heading>
        </Stack>
      </HStack>

      <Box
        p={4}
        bg='gray.100'
        _dark={{ bg: 'gray.700' }}
        rounded='lg'
        shadow='lg'
      >
        <Heading as='h2' size='md' mb='4'>
          Ask {currentUser.login === user?.login ? 'yourself' : currentUser.login} about something interesting
        </Heading>
        <FormControl as={askFetcher.Form} action='ask' method='post'>
          <Tooltip label={errors.text}>
            <Textarea
              value={values.text}
              onChange={onChange}
              name='text'
              required
              minLength={5}
              isInvalid={Boolean(errors.text)}
              mb='4'
              bgColor='Background'
            />
          </Tooltip>
          <Flex alignItems='center'>
            <Switch name='anonim' type='checkbox' value='on'>
              Ask anonymously
            </Switch>
            <Button ml='auto' type='submit' disabled={!isValid}>Send</Button>
          </Flex>
        </FormControl>
      </Box>
      <Box as='section'>
        <Heading as='h2' size='md' ml='4' mb='2'>Answers</Heading>
        <AnswersContainer loader={`/user/${currentUser.login}/answers`} />
      </Box>
    </Stack>
    </Container>
  );
};

export default ProfilePage;
