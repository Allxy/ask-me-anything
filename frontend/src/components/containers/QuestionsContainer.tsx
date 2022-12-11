import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import Question from '../presentation/Question';
import Loader from '../ui/Loader';
import classNames from 'classnames';
import './QuestionsContainer.css';

interface QuestionsContainerProps {
  promise: Promise<IQuestion[]>
  className: string
  title?: string
}

const QuestionsContainer: React.FC<QuestionsContainerProps> = ({ promise, className, title }) => {
  return (
    <section className={classNames('questions', className)}>
      { Boolean(title) && <h2>{title}</h2>}
      <Suspense fallback={<Loader />}>
        <Await
          resolve={promise}
          children={
            (questions) =>
              questions.length > 0
                ? questions.map((q: IQuestion) => <Question key={q._id} question={q} />)
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
