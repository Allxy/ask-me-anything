import { Suspense } from 'react';
import { useFetcher, Await } from 'react-router-dom';
import { AsyncData } from '../../models/AsyncData';
import { IQuestion } from '../../models/Question';
import { IUser } from '../../models/User';
import QuestionsContainer from '../containers/QuestionsContainer';
import { useLoaderTypedData } from '../hooks/useLoaderTypedData';
import useUser from '../hooks/useUser';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const { userPromise } = useLoaderTypedData<Promise<AsyncData<IUser>>>();
  const { answersPromise } = useLoaderTypedData<Promise<AsyncData<IQuestion[]>>>();
  const fetcher = useFetcher();

  return (
    <Suspense>
      <Await
        resolve={userPromise}
        children={(data) => (
          <div className='profile'>
            <div className='profile__info info'>
              <Avatar className='info__avatar' src={'https://cdn.forbes.ru/forbes-static/608x342/new/2022/11/4-636273af4beec.webp'} />
              <div className="info__about">
                <p className="info__login">@{data.login}</p>
                <p className="info__name">{data.name}</p>
              </div>
            </div>

            <div className='profile__ask ask'>
              <fetcher.Form action='ask' method='post'>
                <h2>Ask {data.login === user?.login ? 'yourself' : data.login}</h2>
                <div className='ask__text-area-bg'>
                  <textarea name='text' className='ask__text-area' />
                </div>
                <div className='ask__control'>
                  <label>
                    <input name='anonim' type="checkbox"></input>
                    <span>Anon</span>
                  </label>
                  <Button className='ask__send'>Send</Button>
                </div>
              </fetcher.Form>
            </div>

            <Await
              resolve={answersPromise}
              children={(data) => <QuestionsContainer title="Answers" className='profile__section' questions={data} />
              }
            />
          </div>
        )}
      />
    </Suspense>

  );
};

// <QuestionsContainer title="Questions for you" className='profile__section' promise={meQuestPromise} />
//

export default ProfilePage;
