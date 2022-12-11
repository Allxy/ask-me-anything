import * as React from 'react';
import { Await } from 'react-router-dom';
import { Question } from '../../models/Question';
import { useLoaderQuestionsData } from '../hooks/LoaderDataHooks';

const Profile: React.FC = () => {
  const { questionsPromise } = useLoaderQuestionsData();

  return <div>
    <Await
      resolve={questionsPromise}
      children={(questions) => questions.map((q: Question) => <div>{q.body}</div>)
      }
      errorElement={<div>Questions could not loaded</div>}
    />
  </div>;
};

export default Profile;
