import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  valid?: boolean
}

const Input: React.FC<InputProps> = ({ className, valid, ...restProps }) => {
  return <>
    <input className={classNames('input', (valid === true) && 'input_error', className)} {...restProps} />
  </>;
};

export default Input;
