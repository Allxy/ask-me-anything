import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import { IQuestion } from '../../models/Question';
import Question from '../presentation/Question';
import './QuestionsContainer.css';

interface QuestionsContainerProps {
  questions: IQuestion[]
  className?: string
  title?: string
  onClick?: (id: string) => void
}

const QuestionsContainer: React.FC<QuestionsContainerProps> = ({ questions, className, title, onClick }) => {
  return (
    <section className={classNames('questions', className)}>
      { Boolean(title) && <h2>{title}</h2>}
      {
        questions.length > 0
          ? questions.map((q: IQuestion) => <Question onClick={() => onClick?.(q._id)} key={q._id} question={q} />).reverse()
          : <p>There's nothing here</p>
      }
    </section>
  );
};

export default QuestionsContainer;
