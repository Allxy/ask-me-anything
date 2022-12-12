import { IQuestion } from '../../models/Question';
import QuestionsContainer from '../containers/QuestionsContainer';
import { useLoaderTypedData } from '../hooks/useLoaderTypedData';
import Avatar from '../ui/Avatar';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { meQuestPromise, myQuestPromise } = useLoaderTypedData<Promise<IQuestion[]>>();

  return <div className='profile'>
    <div className='profile__info'>
      <Avatar className='profile__avatar' src={'https://cdn.forbes.ru/forbes-static/608x342/new/2022/11/4-636273af4beec.webp'} />
    </div>
    <QuestionsContainer title="Questions for you" className='profile__section' promise={meQuestPromise} />
    <QuestionsContainer title="Your questions" className='profile__section' promise={myQuestPromise} />
  </div>;
};

export default ProfilePage;
