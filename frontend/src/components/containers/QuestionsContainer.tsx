import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import Question from '../presentation/Question';
import Loader from '../ui/Loader';
import classNames from 'classnames';
import './QuestionsContainer.css';
import { AsyncData } from '../../models/AsyncData';

interface QuestionsContainerProps {
  promise: Promise<AsyncData<IQuestion[]>>
  className: string
  title?: string
}

const QuestionsContainer: React.FC<QuestionsContainerProps> = ({ promise, className, title }) => {
  return (
    <section className={classNames('questions', className)}>
      { Boolean(title) && <h2>{title}</h2>}
      <Suspense fallback={<Loader className="questions__loader" />}>
        <Await
          resolve={promise}
          children={
            (data) =>
              data.payload.length > 0
                ? data.payload.map((q: IQuestion) => <Question key={q._id} question={q} />)
                : <p>No questions</p>
          }
          // TODO: Сделать нормальную ошибку
          errorElement={<div>Questions could not loaded</div>}
        />
      </Suspense>
    </section>
  );
};

export default QuestionsContainer;
