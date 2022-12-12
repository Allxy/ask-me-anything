import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as { message: string, statusText: string };

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message !== undefined ? error.message : error.statusText}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
