import * as React from 'react';
import './Spinner.css';

const Spinner: React.FC = (props) => {
  return (
    <div className='spinner'>
      <div></div><div></div><div></div><div></div>
    </div>
  );
};

export default Spinner;
