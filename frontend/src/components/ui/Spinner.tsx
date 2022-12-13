import classNames from 'classnames';
import * as React from 'react';
import './Spinner.css';

const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames('spinner', className)}>
      <div></div><div></div><div></div><div></div>
    </div>
  );
};

export default Spinner;
