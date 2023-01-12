import { Link as RouterLink } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Avatar, Box, Button, Container, Flex, HStack, IconButton, Image, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import logo from '../images/logo.png';
import logoDark from '../images/logo_dark.png';
import { EmailIcon, ChevronDownIcon, ChevronUpIcon, MoonIcon, SunIcon, SearchIcon } from '@chakra-ui/icons';

function Header (): JSX.Element {
  const { user } = useUser();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box
      as='header'
      h='14'
      bgColor={'white'}
      boxShadow={'sm'}
      pos='fixed'
      top='0'
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
        <Flex
          justifyContent='space-between'
          alignItems='center'
          h='100%'
        >
          <Link as={RouterLink} to='/'>
            <Image w={16} src={useColorModeValue(logoDark, logo)}></Image>
          </Link>
          <HStack
            alignItems='center'
            spacing='4'
          >
            <IconButton aria-label='search' icon={<SearchIcon />} as={RouterLink} to='search' />
            <IconButton aria-label='income' icon={<EmailIcon />} as={RouterLink} to='income' />
            <Menu placement='bottom-end'>
              {({ isOpen }) => (
                <>
                <MenuButton fontSize='lg'>
                  <Avatar size='sm' name={user?.name}/>
                  {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to={`user/${user?.login ?? '404'}`}>
                    Profile
                  </MenuItem>
                  <MenuItem as={Flex} onClick={toggleColorMode} justifyContent='space-between' closeOnSelect={false}>
                    <Text>Theme</Text>
                    {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as={RouterLink} to='/sign-out'>
                    Sign Out
                  </MenuItem>
                </MenuList>
                </>
              )}
            </Menu>
          </HStack>
        </Flex>
      </Container>
    </Box >
  );
}

export default Header;
