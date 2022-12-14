import { MouseEvent, Suspense, useState } from 'react';
import { Await, useFetcher } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import QuestionsContainer from '../containers/QuestionsContainer';
import { useLoaderTypedData } from '../hooks/useLoaderTypedData';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import './IncomePage.css';

const IncomePage: React.FC = () => {
  const { questionsPromise } = useLoaderTypedData<Promise<IQuestion[]>>();
  const [isOpened, setIsOpened] = useState(false);
  const [currentQuestionm, setCurrentQuestion] = useState('');
  const fetcher = useFetcher();

  function handleQuestionClick (questionId: string): void {
    setIsOpened(true);
    setCurrentQuestion(questionId);
  }

  return (
    <Suspense>
      <Await
        resolve={questionsPromise}
        children={(data) =>
          <div className='income'>
            <QuestionsContainer onClick={handleQuestionClick} title='Income questions' questions={data} />
          </div>
        }
      />
      <Modal onClose={() => setIsOpened(false)} isOpened={isOpened}>
        <fetcher.Form action={`/income/${currentQuestionm}`} method='post'>
          <h2>Answer</h2>
          <div className='ask__text-area-bg'>
            <textarea name='answer' className='ask__text-area' />
          </div>
          <div className='ask__control'>
            <Button className='ask__send'>Send</Button>
          </div>
        </fetcher.Form>
      </Modal>
    </Suspense>
  );
};

export default IncomePage;
