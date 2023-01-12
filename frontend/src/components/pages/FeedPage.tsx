import { useEffect, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import useOnScreen from '../../hooks/useOnScreen';
import { Container, Heading, Stack } from '@chakra-ui/react';
import Answer from '../presentation/Answer';
import useUser from '../../hooks/useUser';

const FeedPage: React.FC = (props) => {
  const fetcher = useFetcher();
  const data = useLoaderData() as IQuestion[];
  const { user } = useUser();
  const [answers, setAnswers] = useState<IQuestion[]>(data);
  const [isOnScreen, markerRef] = useOnScreen<HTMLDivElement>('300px');
  const [page, setPage] = useState(2);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (isOnScreen && !isEnded) {
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

  return (
    <Container maxW='container.md'>
      <Stack as='section' spacing='4'>
        <Heading as='h2' >Feed</Heading>
        {
          answers.length > 0
            ? answers.map((q: IQuestion) =>
            <Answer
              key={q._id}
              question={q}
              isLiked={q.likes.some((u) => u._id === user?._id)}
              onLike={() => {}}
            />)
            : <p>There's nothing here</p>
        }
      </Stack>
      { isEnded && <div>No more :)</div>}
      <div ref={markerRef}></div>
    </Container>
  );
};

export default FeedPage;
