import { Spinner, Stack, Text } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import AMAApi from '../../AMAApi';
import { useAppSelector } from '../../hooks/storeHooks';
import useOnScreen from '../../hooks/useOnScreen';
import { IQuestion } from '../../models/Question';
import { userSelector } from '../../store/slices/userSlice';
import Answer from '../presentation/Answer';

interface AnswersContainerProps {
  showOwner?: boolean
  currentUser?: string
}

const AnswersContainer: React.FC<AnswersContainerProps> = ({ currentUser, showOwner = false }) => {
  const user = useAppSelector(userSelector);
  const [answers, setAnswers] = useState<IQuestion[]>([]);
  const [isOnScreen, markerRef] = useOnScreen<HTMLDivElement>('300px');
  const [page, setPage] = useState(1);
  const [isEnded, setIsEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOnScreen && !isEnded) {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append("page", page.toString());
      AMAApi.getAnswers(currentUser, params).then((data)=> {
        if(data.length < 10) {
          setIsEnded(true);
        }
        setPage(page + 1);
        setAnswers([...answers, ...data]);
      }).finally(()=> setIsLoading(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnScreen]);

  const toggleLike = (isLiked: boolean, id: string) => {
    if(isLiked) {
      setAnswers(answers.map((ans)=> {
        if(ans._id === id) {
          return {...ans, likes: ans.likes.filter((u)=> u._id !== user?._id)};
        }
        return ans;
      }));
      AMAApi.deleteAnswerDislike(id).catch((data)=> {
        setAnswers((prev)=>prev.map((ans)=> {
          if(ans._id === id && user !== null) {
            return {...ans, likes: [...ans.likes, user]};
          }
          return ans;
        }));
      });
    } else {
      setAnswers(answers.map((ans)=> {
        if(ans._id === id && user !== null) {
          return {...ans, likes: [...ans.likes, user]};
        }
        return ans;
      }));
      AMAApi.putAnswerLike(id).then((data)=> {
        setAnswers(answers.map((ans)=>{
          if(ans._id === id) {
            return data;
          }
          return ans;
        }));
      }).catch(()=> {
        setAnswers(answers.map((ans)=> {
          if(ans._id === id) {
            return {...ans, likes: ans.likes.filter((u)=> u._id !== user?._id)};
          }
          return ans;
        }));
      });;
    }
  };

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
            onLike={toggleLike}
          />)
        }
        { !isLoading && answers.length === 0 && <Text align='center'>There's nothing here</Text>}
        { isLoading && <Spinner alignSelf='center'></Spinner>}
        { isEnded && answers.length !== 0 && <Text py='4' align='center'>No more :)</Text> }
      </Stack>
      <div ref={markerRef}></div>
    </>
  );
};

export default memo(AnswersContainer);
