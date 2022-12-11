import * as React from 'react';
import { IQuestion } from '../../models/Question';
import './Question.css';

interface QuestionProps {
  question: IQuestion
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className='question'>
      <h2>{question.title}</h2>
      <p>{question.body}</p>
    </div>
  );
};

export default Question;
