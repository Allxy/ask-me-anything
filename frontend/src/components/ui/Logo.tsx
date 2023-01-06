import { Image, Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import logoDark from '../../images/logo_dark.png';

interface LogoProps {
  link?: string
  size: number
}

const Logo: React.FC<LogoProps> = ({ link, size }) => {
  return (
    <Link as={RouterLink} to={link ?? '/'}>
      <Image w={size} src={useColorModeValue(logoDark, logo)}></Image>
    </Link>
  );
};

export default Logo;
