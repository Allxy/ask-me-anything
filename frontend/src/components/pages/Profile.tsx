import { IQuestion } from '../../models/Question';
import QuestionsContainer from '../containers/QuestionsContainer';
import { useLoaderTypedData } from '../hooks/useLoaderTypedData';
import './Profile.css';

const Profile: React.FC = () => {
  const { meQuestPromise, myQuestPromise } = useLoaderTypedData<Promise<IQuestion[]>>();

  return <div className='profile'>
    <QuestionsContainer title="Questions for you" className='profile__section' promise={meQuestPromise} />
    <QuestionsContainer title="Your questions" className='profile__section' promise={myQuestPromise} />
  </div>;
};

export default Profile;
