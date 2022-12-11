import classNames from 'classnames';
import { FormMethod, FormProps } from 'react-router-dom';
import './FormWithContent.css';

interface AuthProps {
  form: React.FC<FormProps>
  action: string
  method?: FormMethod
  children: React.ReactNode
  className?: string
}

const FormWithContent: React.FC<AuthProps> = (
  {
    form: Form,
    children,
    className,
    ...restProps
  }) => {
  return (
    <Form className={classNames(className, 'form')} {...restProps}>
      {children}
    </Form>
  );
};

export default FormWithContent;
