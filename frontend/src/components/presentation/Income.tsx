import { Avatar, Box, HStack, LinkOverlay, Menu, MenuButton, MenuItem, MenuList, Text, LinkBox } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import { MenuIcon } from '../ui/icons/MenuIcon';

interface IncomeProps {
  question: IQuestion
  onClick: (question: IQuestion) => void
}

const Income: React.FC<IncomeProps> = ({ question, onClick }) => {
  return (
    <HStack
      as={LinkBox}
      px='2'
      rounded='md'
      gap='2'
      transition='0.3s'
      _hover={{ bgColor: 'facebook.50' }}
      _dark={{
        _hover: {
          bgColor: 'gray.700'
        }
      }}
    >
      <Avatar
        as={RouterLink}
        to={`/user/${question?.author?.login ?? ''}`}
        name={question?.author?.name} size='md'
      />
      <Box flex='1'>
        {(question.author != null) &&
          <Text
            as={RouterLink}
            to={`/user/${question?.author?.login ?? ''}`}
            fontWeight='bold'
          >
            {question.author?.name}
          </Text>
        }
        <Text fontSize='md' wordBreak='break-word' noOfLines={3}>{question.text}</Text>
        <LinkOverlay onClick={() => onClick(question)}>
          <Text fontSize='xs' color='GrayText'>{new Date(question.createdAt).toLocaleString()}</Text>
        </LinkOverlay>
      </Box>

      <Menu>
        <MenuButton zIndex={1} aria-label='menu'>
          <MenuIcon></MenuIcon>
        </MenuButton>
        <MenuList>
          <MenuItem isDisabled>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default Income;
