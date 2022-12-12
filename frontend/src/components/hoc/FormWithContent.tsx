import classNames from 'classnames';
import { FormMethod, FormProps, useFetchers } from 'react-router-dom';
import Button from '../ui/Button';
import './FormWithContent.css';

interface AuthProps {
  form: React.FC<FormProps>
  action: string
  method?: FormMethod
  children: React.ReactNode
  className?: string
  buttonText: string
  isValid: boolean
}

const FormWithContent: React.FC<AuthProps> = (
  {
    form: Form,
    children,
    className,
    buttonText,
    isValid,
    ...restProps
  }) => {
  const fetchers = useFetchers();

  return (
    <Form noValidate className={classNames(className, 'form')} {...restProps}>
      {children}
      <Button disabled={!isValid || fetchers.length > 0} type="submit">{buttonText}</Button>
    </Form>
  );
};

export default FormWithContent;
