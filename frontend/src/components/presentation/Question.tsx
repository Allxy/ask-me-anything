import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import './Question.css';

interface QuestionProps {
  question: IQuestion
  onClick?: MouseEventHandler
}

const Question: React.FC<QuestionProps> = ({ question, onClick }) => {
  return (
    <article onClick={onClick} className='question'>
      <header className='question__header'>
        <h2 className='question__title'>{question.text}</h2>
        { question.author !== undefined && <Link to={`/user/${question.author?.login}`} className='question__author'>by {question.author?.login}</Link>}
      </header>
      {question.updatedAt !== undefined && <div className='question__date'>{new Date(question.updatedAt).toLocaleString()}</div>}
      {question.answer !== undefined && <div className='question__answer'>{question.answer}</div>}
    </article>
  );
};

export default Question;
