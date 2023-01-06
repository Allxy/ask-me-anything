import { Avatar, Box, Button, Checkbox, Container, Flex, FormControl, FormErrorMessage, Heading, HStack, Stack, Switch, Text, Textarea, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useLoaderTypedData } from '../../hooks/useLoaderTypedData';
import useUser from '../../hooks/useUser';
import { IQuestion } from '../../models/Question';
import Answer from '../presentation/Answer';

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const { currentUser } = useLoaderTypedData();
  const { answers } = useLoaderTypedData();
  const fetcher = useFetcher();
  const { values, onChange, resetForm, errors, isValid } = useForm({ text: '' });

  useEffect(() => {
    if (fetcher.data?.text !== undefined && fetcher.state === 'idle') {
      resetForm();
    }
  }, [fetcher]);

  return (
    <Container maxW='container.md'>
    <Stack spacing='4'>
      <HStack spacing='4'>
        <Avatar name={user?.name} size='xl' />
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
        <FormControl as={fetcher.Form} action='ask' method='post'>
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

      <Stack spacing='4'>
        <Heading as='h2' size='md' ml='4'>Answers</Heading>
        {
          answers.length > 0
            ? answers.map((q: IQuestion) => <Answer key={q._id} question={q} />)
            : <p>There's nothing here</p>
        }
      </Stack>
    </Stack>
    </Container>
  );
};

export default ProfilePage;
