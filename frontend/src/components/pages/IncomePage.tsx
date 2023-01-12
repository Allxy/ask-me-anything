import { Button, Container, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import Income from '../presentation/Income';

const IncomePage: React.FC = () => {
  const questions = useLoaderData() as IQuestion[];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.answer !== undefined) {
      onClose();
    }
  }, [fetcher, onClose]);

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
              <Income question={q} onClick={handleQuestionClick} />))
          }
        </Stack>
      </Container>

      <Modal onClose={onClose} isOpen={isOpen} isCentered >
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>Answer</ModalHeader>
          <ModalCloseButton />
          <ModalBody as='p'>{currentQuestion?.text}</ModalBody>
          <ModalFooter
            as={fetcher.Form}
            action={`/income/${currentQuestion?._id ?? ''}`}
            method='post'
          >
            <Stack width='100%'>
              <Textarea name='answer' />
              <Button type='submit'>Send</Button>
            </Stack>
          </ModalFooter>
          <Text color='red.400'>{fetcher.data?.message}</Text>
        </ModalContent>
      </Modal>
    </>);
};

export default IncomePage;
