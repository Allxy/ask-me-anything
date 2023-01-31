import { Avatar, Box, Button, Center, Container, Flex, Heading, HStack, Spinner, Stack, Switch, Text, Textarea, Tooltip, useToast } from '@chakra-ui/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AMAApi from '../../AMAApi';
import { useAppSelector } from '../../hooks/storeHooks';
import useForm from '../../hooks/useForm';
import { IUser } from '../../models/User';
import { userSelector } from '../../store/slices/userSlice';
import AnswersContainer from '../containers/AnswersContainer';

const ProfilePage: React.FC = () => {
  const user = useAppSelector(userSelector);
  const params = useParams();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null); 
  const { values, onChange, resetForm, errors, isValid } = useForm({ text: '' });
  const [isAnon, setIsAnon] =  useState(false);
  const toast = useToast();

  useEffect(() => {
    AMAApi.getUser(params.userID ?? "").then((user)=>{
      setCurrentUser(user);
    });
  }, [params]);

  const handleSubmit : FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    AMAApi.postQuestion({...values, anonim: isAnon, owner: params.userID})
    .then(()=> {
      toast({
        title: 'Success.',
          description: "Question have been sended.",
          status: 'success',
          duration: 1000,
          isClosable: true,
      });
      resetForm();
    });
  };

  if(currentUser === null) {
    return <Center>
        <Spinner />
      </Center>;
  }

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
        <Stack as={'form'} onSubmit={handleSubmit}>
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
            <Switch name='anonim' type='checkbox' onChange={(e)=>setIsAnon(e.target.checked)}>
              Ask anonymously
            </Switch>
            <Button ml='auto' type='submit' disabled={!isValid}>Send</Button>
          </Flex>
        </Stack>
      </Box>
      <Box as='section'>
        <Heading as='h2' size='md' ml='4' mb='2'>Answers</Heading>
        <AnswersContainer key={currentUser.login} currentUser={currentUser.login} />
      </Box>
    </Stack>
    </Container>
  );
};

export default ProfilePage;
