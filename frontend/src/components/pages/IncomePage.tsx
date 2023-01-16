import { Button, Container, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Text, Textarea, useColorModeValue } from '@chakra-ui/react';
import { FormEventHandler, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { IQuestion } from '../../models/Question';
import { fetchAnswer, selectQuestion } from '../../store/slices/incomeSlice';
import Income from '../presentation/Income';

const IncomePage: React.FC = () => {
  const {data: income, loading, isAnswerSending, selectedQuestion} = useAppSelector(state=> state.income);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  function handleQuestionClick (question: IQuestion | null): void {
    dispatch(selectQuestion(question));
  }

  const handleSubmit : FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if(!isAnswerSending) { 
      dispatch(fetchAnswer({answer: answerRef.current?.value ?? "", question: selectedQuestion?._id ?? ""}));
    }
  };

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
            income.map((q: IQuestion) => (
              <Income key={q._id} question={q} onClick={handleQuestionClick} />))
          }
          {loading && <Spinner alignSelf='center' />}
          {!loading && income.length === 0 &&  <Text align='center'>You have no income questions.</Text>}
        </Stack>
      </Container>

      <Modal onClose={()=>handleQuestionClick(null)} isOpen={!!selectedQuestion} isCentered useInert={false}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>Answer</ModalHeader>
          <ModalCloseButton />
          <ModalBody as='p'>{selectedQuestion?.text}</ModalBody>
          <ModalFooter
            as='form'
            noValidate
            onSubmit={handleSubmit}
          >
            <Stack width='100%'>
              <Textarea name='answer' isRequired minLength={5} ref={answerRef} />
              <Button type='submit' isLoading={loading} disabled={loading}>Send</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>);
};

export default IncomePage;
