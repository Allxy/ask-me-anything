import classNames from 'classnames';
import { FetcherWithComponents, FormMethod } from 'react-router-dom';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import './FormWithContent.css';

interface AuthProps {
  fetcher: FetcherWithComponents<any>
  action: string
  method?: FormMethod
  children: React.ReactNode
  className?: string
  buttonText: string
  isValid: boolean
}

const FormWithContent: React.FC<AuthProps> = (
  {
    fetcher,
    children,
    className,
    buttonText,
    isValid,
    ...restProps
  }) => {
  return (
    <fetcher.Form noValidate className={classNames(className, 'form')} {...restProps}>
      {children}
      <p className='form__error'>{Boolean(fetcher.data?.error) && fetcher.data?.error.message} </p>
      <Button disabled={!isValid || fetcher.state !== 'idle'} type="submit">
        {fetcher.state === 'idle' ? buttonText : <Spinner className="form__spinner" />}
      </Button>
    </fetcher.Form>
  );
};

export default FormWithContent;
