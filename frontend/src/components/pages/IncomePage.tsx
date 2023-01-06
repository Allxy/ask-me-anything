import { useEffect, useState } from 'react';
import { useFetcher, useLoaderData, Link as RouterLink } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import { Avatar, Box, Button, Container, Flex, Heading, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Modal, ModalContent, ModalOverlay, Stack, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { MenuIcon } from '../ui/icons/MenuIcon';

const IncomePage: React.FC = () => {
  const questions = useLoaderData() as IQuestion[];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.answer !== undefined) {
      onOpen();
    }
  }, [fetcher, onOpen]);

  function handleQuestionClick (questionId: IQuestion): void {
    onOpen();
    setCurrentQuestion(questionId);
    delete fetcher.data;
  }

  return (
    <>
      <Container maxW='container.md'>
        <Stack
          as='section'
          spacing='4'
          padding='4'
          rounded='lg'
          bgColor={useColorModeValue('white', 'gray.900')}
        >
          <Heading as='h1' size='md'>Income questions</Heading>
          {
            questions.map((q: IQuestion) => (
              <HStack key={q._id} gap='2'>
                <Avatar as={RouterLink} to={`/user/${q?.author?.login ?? ''}`} name={q?.author?.name} size='md' />
                <Box flex='1'>
                  {(q.author != null) && <Text as={RouterLink} to={`/user/${q?.author?.login ?? ''}`} fontWeight='bold'>{q.author?.name}</Text>}
                  <Text fontSize='md' onClick={() => handleQuestionClick(q)}>{q.text}</Text>
                  <Text fontSize='xs' color='GrayText'>{new Date(q.createdAt).toLocaleString()}</Text>
                </Box>
                <Menu>
                  <MenuButton aria-label='menu'>
                    <MenuIcon></MenuIcon>
                  </MenuButton>
                  <MenuList>
                    <MenuItem isDisabled>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>))
          }
        </Stack>
      </Container>
      <Modal onClose={onClose} isOpen={isOpen} isCentered >
        <ModalOverlay></ModalOverlay>
        <ModalContent padding='4'>
          <Box as={fetcher.Form} action={`/income/${currentQuestion?._id ?? ''}`} method='post' >
            <Stack>
              <Heading as='h2' size='md'>Answer</Heading>
              <Text>{currentQuestion?.text}</Text>
              <Textarea name='answer' />
              <Button type='submit'>Send</Button>
            </Stack>
          </Box>
          <div>{fetcher.data?.message}</div>
        </ModalContent>
      </Modal>
    </>);
};

export default IncomePage;
