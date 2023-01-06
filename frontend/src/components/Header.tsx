import { useEffect, useState } from 'react';
import { Link as RouterLink, useFetcher } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import useUser from '../hooks/useUser';
import { Avatar, Box, Button, Container, Flex, HStack, Image, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import logo from '../images/logo.png';
import logoDark from '../images/logo_dark.png';
import { EmailIcon, ChevronDownIcon, ChevronUpIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

function Header (): JSX.Element {
  const { data, state, load } = useFetcher();
  const { user } = useUser();
  const [search, setSearch] = useState('');
  const [debouncedSearch, isPending] = useDebounce(search, 500);
  const { toggleColorMode, colorMode } = useColorMode();

  useEffect(() => {
    if (search !== '') {
      load('/search?limit=10&page=1&login=' + debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <Box
      as='header'
      h='14'
      bgColor={useColorModeValue('white', 'gray.900')}
      boxShadow={useColorModeValue('sm', 'dark-sm')}
      pos='fixed'
      top='0'
      left='0'
      right='0'
      zIndex='sticky'
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
            <Button as={RouterLink} to='income'><EmailIcon /></Button>
            <Menu placement='bottom-end'>
              {({ isOpen }) => (
                <>
                <MenuButton color='white' fontSize='lg'>
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
