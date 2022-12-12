import classNames from 'classnames';
import { ReactNode } from 'react';
import Logo from '../ui/Logo';
import './AuthContainer.css';

interface AuthContainerProps {
  children: ReactNode
  title: string
  className?: string
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, title, className }) => {
  return (
    <div className={classNames('auth', className)}>
      <Logo link="/sign-in" />
      <p className='auth__title'>{title}</p>
      {children}
    </div>
  );
};

export default AuthContainer;
