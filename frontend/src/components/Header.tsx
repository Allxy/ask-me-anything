import { ChevronDownIcon, ChevronUpIcon, EmailIcon, MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import { Avatar, Box, Circle, Container, Flex, HStack, IconButton, Image, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import logo from '../images/logo.png';
import logoDark from '../images/logo_dark.png';
import { fetchIncome, incomeSelector } from '../store/slices/incomeSlice';
import { signOut, userSelector } from '../store/slices/userSlice';

function Header (): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const income = useAppSelector(incomeSelector);
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();

  const handleSignOut = (): void => {
    dispatch(signOut());
    navigate("/sign-in");
  };

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
            <IconButton 
              aria-label='income' 
              icon={<>
                <EmailIcon />
                <Circle 
                  bottom='1' 
                  right='1' 
                  size='4' 
                  fontSize='xs' 
                  bgColor='red' 
                  position='absolute' 
                  children={income.length} 
                />
              </>}  
              as={RouterLink} 
              to='income' 
              onClick={()=>dispatch(fetchIncome())}
            />
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
                  <MenuItem onClick={handleSignOut}>
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
