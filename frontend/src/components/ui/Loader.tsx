import classNames from 'classnames';
import * as React from 'react';
import './Loader.css';
import Spinner from './Spinner';

interface LoaderProps {
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={classNames('loader', className)}>
      <Spinner />
    </div>
  );
};

export default Loader;
