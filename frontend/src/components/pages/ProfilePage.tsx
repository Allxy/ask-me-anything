import { Avatar, Box, Button, Container, Flex, FormControl, Heading, HStack, Stack, Switch, Text, Textarea, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useLoaderTypedData } from '../../hooks/useLoaderTypedData';
import useUser from '../../hooks/useUser';
import { IQuestion } from '../../models/Question';
import Answer from '../presentation/Answer';

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const { currentUser, answers } = useLoaderTypedData();
  const [answersState, setAnswersState] = useState<IQuestion[]>(answers);
  const askFetcher = useFetcher();
  const likeFetcher = useFetcher();
  const { values, onChange, resetForm, errors, isValid } = useForm({ text: '' });

  useEffect(() => {
    if (askFetcher.state === 'idle' && askFetcher.data?.message === undefined) {
      resetForm();
    }
  }, [askFetcher, resetForm]);

  useEffect(() => {
    if (likeFetcher.state === 'idle' && likeFetcher.data !== undefined) {
      console.log(answers, likeFetcher.data);

      const newAnswers = answers.map((answer: IQuestion) => answer._id === likeFetcher.data._id ? likeFetcher.data : answer);
      setAnswersState(newAnswers);
    }
  }, [likeFetcher]);

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

      <Stack spacing='4'>
        <Heading as='h2' size='md' ml='4'>Answers</Heading>
        {
          answersState.length > 0
            ? answersState.map((q: IQuestion) =>
            <Answer
              key={q._id}
              question={q}
              isLiked={q.likes.some((u) => u._id === user?._id)}
              onLike={(isLiked) => {
                likeFetcher.load(`/answer/${q._id}/${isLiked ? 'dislike' : 'like'}`);
              }}
            />)
            : <p>There's nothing here</p>
        }
      </Stack>
    </Stack>
    </Container>
  );
};

export default ProfilePage;
