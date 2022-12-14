import { MouseEventHandler } from 'react';
import { IQuestion } from '../../models/Question';
import './Question.css';

interface QuestionProps {
  question: IQuestion
  onClick?: MouseEventHandler
}

const Question: React.FC<QuestionProps> = ({ question, onClick }) => {
  return (
    <div onClick={onClick} className='question'>
      <h2>{question.text}</h2>
      <div>{question.answer}</div>
      <div>{question.author?.login}</div>
    </div>
  );
};

export default Question;
