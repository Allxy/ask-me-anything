import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

interface LogoProps {
  className?: string
  link: string
}

const Logo: React.FC<LogoProps> = ({ className, link }) => {
  return (
    <Link to={link} className={classNames(className, 'logo')}>
      Ask Me Anything
    </Link>
  );
};

export default Logo;
