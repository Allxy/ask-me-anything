import { Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import useOnScreen from '../../hooks/useOnScreen';
import useUser from '../../hooks/useUser';
import { IQuestion } from '../../models/Question';
import Answer from '../presentation/Answer';

interface AnswersContainerProps {
  answers?: IQuestion[]
  showOwner?: boolean
  userId?: string
  loader: string
}

const AnswersContainer: React.FC<AnswersContainerProps> = ({ answers: data = [], loader, showOwner = false }) => {
  const likeFetcher = useFetcher();
  const answersFetcher = useFetcher();
  const { user } = useUser();
  const [answers, setAnswers] = useState<IQuestion[]>(data);
  const [isOnScreen, markerRef] = useOnScreen<HTMLDivElement>('300px');
  const [page, setPage] = useState(1);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (likeFetcher.state === 'idle' && likeFetcher.data !== undefined) {
      const newAnswers = answers.map((answer: IQuestion) =>
        answer._id === likeFetcher.data._id ? likeFetcher.data : answer
      );
      setAnswers(newAnswers);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeFetcher]);

  useEffect(() => {
    if (isOnScreen && !isEnded) {
      answersFetcher.load(`${loader}?page=${page}`);
      setPage(page + 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnScreen]);

  useEffect(() => {
    if (answersFetcher.data !== undefined && answersFetcher.state === 'idle') {
      if (answersFetcher.data.length < 10) {
        setIsEnded(true);
      }
      setAnswers([...answers, ...answersFetcher.data]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answersFetcher]);

  function toggleLike (isLiked: boolean, q: IQuestion): void {
    likeFetcher.load(`/answer/${q._id}/${isLiked ? 'dislike' : 'like'}`);
    let likes = [...q.likes];
    if (user != null) {
      if (isLiked) {
        likes = likes.filter((el) => el._id === user._id);
      } else {
        likes = [...likes, user];
      }
    }
    const newAnswers = answers.map((answer: IQuestion) =>
      answer._id === q._id ? { ...answer, likes } : answer
    );
    setAnswers(newAnswers);
  }

  return (
    <>
      <Stack spacing='4'>
        {
          answers.map((q: IQuestion) =>
          <Answer
            key={q._id}
            question={q}
            isLiked={q.likes.some((u) => u?._id === user?._id)}
            showOwner={showOwner}
            onLike={(isLiked) => toggleLike(isLiked, q)}
          />)
        }
        { answers.length === 0 && <Text align='center'>There's nothing here</Text>}
        { answersFetcher.state === 'loading' && <Spinner alignSelf='center'></Spinner>}
        { isEnded && answers.length !== 0 && <Text py='4' align='center'>No more :)</Text> }
      </Stack>
      <div ref={markerRef}></div>
    </>
  );
};

export default AnswersContainer;
