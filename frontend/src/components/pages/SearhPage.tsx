import { SearchIcon } from '@chakra-ui/icons';
import { Container, Heading, Input, InputGroup, InputLeftAddon, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLoaderData, useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { IUser } from '../../models/User';

const SearchPage: React.FC = () => {
  const data = useLoaderData() as IUser[];
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, isPending] = useDebounce(searchValue, 300);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/search?login=${debouncedValue}`);
  }, [debouncedValue, navigate]);

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
      {data.map((user) => <Text fontWeight='bold' key={user._id} to={`/user/${user.login}`} as={RouterLink}>{user.login}</Text>)}
      {data.length === 0 && !isPending && <Text align='center'>No results</Text>}
      {isPending && <Spinner alignSelf='center' />}
    </Stack>
  </Container>
  );
};

export default SearchPage;
