import { InputHTMLAttributes } from 'react';
import Input from './Input';
import './Input.css';

interface InputWithErrorProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string | undefined
}

const InputWithError: React.FC<InputWithErrorProps> = ({ error, ...restProps }) => {
  return <>
    <Input valid={Boolean(error)} {...restProps}></Input>
    <span className='input-error'>{error}</span>
  </>;
};

export default InputWithError;
