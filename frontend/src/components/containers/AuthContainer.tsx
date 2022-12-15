import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link, FetcherWithComponents } from 'react-router-dom';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import Spinner from '../ui/Spinner';
import './AuthContainer.css';

interface AuthContainerProps {
  children: ReactNode
  title: string
  className?: string
  fetcher: FetcherWithComponents<any>
  buttonText: string
  isValid: boolean
  action: string
  link: string
  linkTitle: string
}

const AuthContainer: React.FC<AuthContainerProps> = ({ fetcher, ...props }) => {
  return (
    <div className={classNames('auth', props.className)}>
      <Logo link="/sign-in" />

      <p className='auth__title'>{props.title}</p>
      <fetcher.Form noValidate className='auth__form' action={props.action} method="post" >
        {props.children}
        <p className='auth__error'>{Boolean(fetcher.data?.message) && fetcher.data?.message} </p>
        <Button disabled={!props.isValid || fetcher.state !== 'idle'} type="submit">
          {fetcher.state === 'idle' ? props.buttonText : <Spinner className="auth__spinner" />}
        </Button>
        <Link className='auth__link' to={props.link}>{props.linkTitle}</Link>
      </fetcher.Form>
    </div>
  );
};

export default AuthContainer;
