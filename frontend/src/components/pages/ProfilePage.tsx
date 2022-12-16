import { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import QuestionsContainer from '../containers/QuestionsContainer';
import { useLoaderTypedData } from '../hooks/useLoaderTypedData';
import useUser from '../hooks/useUser';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const { currentUser } = useLoaderTypedData();
  const { answers } = useLoaderTypedData();
  const fetcher = useFetcher();
  const [error, setError] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    setError(fetcher.data?.message);
    if (fetcher.data?.text !== undefined && fetcher.state === 'idle') {
      setText('');
    }
  }, [fetcher]);

  return (
    <div className='profile'>
      <div className='profile__info info'>
        <Avatar className='info__avatar' src={'https://cdn.forbes.ru/forbes-static/608x342/new/2022/11/4-636273af4beec.webp'} />
        <div className="info__about">
          <p className="info__login">@{currentUser.login}</p>
          <p className="info__name">{currentUser.name}</p>
        </div>
      </div>

      <div className='profile__ask ask'>
        <fetcher.Form action='ask' method='post'>
          <h2>Ask {currentUser.login === user?.login ? 'yourself' : currentUser.login} about something interesting</h2>
          <div className='ask__text-area-bg'>
            <textarea value={text} onChange={(e) => setText(e.target.value)} name='text' className='ask__text-area' />
          </div>
          <div className='ask__control'>
            <label>
              <input name='anonim' type="checkbox"></input>
              <span>Anon</span>
            </label>
            <div className='ask__error'>
              {error}
            </div>
            <Button className='ask__send'>Send</Button>
          </div>
        </fetcher.Form>
      </div>

      <QuestionsContainer title="Answers" className='profile__section' questions={answers} />
    </div>
  );
};

export default ProfilePage;
