import { AtSignIcon, EmailIcon, SearchIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Container, Flex } from '@chakra-ui/react';
import { BottomNavigation, BottomNavigationIcon, BottomNavigationItem, BottomNavigationLabel } from 'chakra-ui-bottom-navigation';
import { useLocation, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

function Toolbar (): JSX.Element {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      as='header'
      h='14'
      bgColor={'white'}
      boxShadow={'sm'}
      pos='fixed'
      bottom='0'
      left='0'
      right='0'
      zIndex='sticky'
      _dark={{
        bgColor: 'gray.900',
        boxShadow: 'dark-sm'
      }}
    >
      <Container
        maxW='container.md'
        h='100%'
      >
        <BottomNavigation
          as={Flex}
          justifyContent='space-around'
          value={location.pathname}
          onChange={navigate}
        >
          <BottomNavigationItem value='/income'>
            <BottomNavigationIcon as={EmailIcon} />
            <BottomNavigationLabel>Income</BottomNavigationLabel>
          </BottomNavigationItem>

          <BottomNavigationItem value='/search'>
            <BottomNavigationIcon as={SearchIcon} />
            <BottomNavigationLabel>Search</BottomNavigationLabel>
          </BottomNavigationItem>

          <BottomNavigationItem value='/'>
            <BottomNavigationIcon as={TimeIcon} />
            <BottomNavigationLabel>Feed</BottomNavigationLabel>
          </BottomNavigationItem>

          <BottomNavigationItem value={`/user/${user?.login ?? ''}`}>
            <BottomNavigationIcon as={AtSignIcon} />
            <BottomNavigationLabel>Profile</BottomNavigationLabel>
          </BottomNavigationItem>
        </BottomNavigation>
      </Container>
    </Box >
  );
}

export default Toolbar;
