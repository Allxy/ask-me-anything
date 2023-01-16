import { SearchIcon } from '@chakra-ui/icons';
import { Container, Heading, Input, InputGroup, InputLeftAddon, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import AMAApi from '../../AMAApi';
import useDebounce from '../../hooks/useDebounce';
import { IUser } from '../../models/User';

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, isPending] = useDebounce(searchValue, 300);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({login: debouncedValue});
  }, [debouncedValue, setSearchParams]);

  useEffect(()=> {
    AMAApi.getUsers(searchParams).then((data)=> {
      setUsers(data);
    });
  }, [searchParams]);

  return (
  <Container maxW='container.md'>
    <Heading mb='4' as='h1' fontSize='4xl'>Users search</Heading>
    <InputGroup>
      <InputLeftAddon>
      <SearchIcon></SearchIcon>
      </InputLeftAddon>
      <Input variant='filled' bgColor={'white'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}>
      </Input>
    </InputGroup>
    <Stack px='8' py='4' mt='4' rounded='lg' bgColor='white' _dark={{ bgColor: 'gray.800' }}>
      {users.map((user) => <Text fontWeight='bold' key={user._id} to={`/user/${user.login}`} as={RouterLink}>{user.login}</Text>)}
      {users.length === 0 && !isPending && <Text align='center'>No results</Text>}
      {isPending && <Spinner alignSelf='center' />}
    </Stack>
  </Container>
  );
};

export default SearchPage;
