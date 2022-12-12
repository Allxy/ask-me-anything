import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...restProps }) => {
  return <button className={classNames(className, 'button')} {...restProps} />;
};

export default Button;
