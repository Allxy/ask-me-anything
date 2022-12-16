import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import QuestionsContainer from '../containers/QuestionsContainer';
import useOnScreen from '../hooks/useOnScreen';
import './FeedPage.css';

const FeedPage: React.FC = (props) => {
  const fetcher = useFetcher();
  const [answers, setAnswers] = useState<IQuestion[]>([]);
  const [isOnScreen, markerRef] = useOnScreen<HTMLDivElement>('300px');
  const [page, setPage] = useState(1);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (isOnScreen) {
      fetcher.load(`/?page=${page}`);
      setPage(page + 1);
    }
  }, [isOnScreen]);

  useEffect(() => {
    if (fetcher.data !== undefined && fetcher.state === 'idle') {
      if (fetcher.data.length < 10) {
        setIsEnded(true);
      }
      setAnswers([...answers, ...fetcher.data]);
    }
  }, [fetcher]);

  return <div className='feed'>
    <QuestionsContainer questions={answers} title="Feed" />
    { isEnded && <div className='feed_nomore'>No more :)</div>}
    <div ref={markerRef}></div>
  </div>;
};

export default FeedPage;
