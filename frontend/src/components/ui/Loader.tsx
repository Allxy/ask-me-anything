import * as React from 'react';
import './Loader.css';
import Spinner from './Spinner';

interface LoaderProps {
  a?: string
}

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div className='loader'>
      <Spinner />
    </div>
  );
};

export default Loader;
