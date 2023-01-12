import { Avatar, Box, Button, Divider, Heading, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { Link as RouterLink, useFetcher } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import { LikeActiveIcon } from '../ui/icons/LikeActiveIcon';
import { LikeIcon } from '../ui/icons/LikeIcon';

interface QuestionProps {
  question: IQuestion
  isLiked: boolean
  onLike: (isLiked: boolean) => void
  onClick?: MouseEventHandler
}

const Answer: React.FC<QuestionProps> = ({ question, onClick, onLike, isLiked }) => {
  const fetcher = useFetcher();

  return (
    <Box
      as='article'
      onClick={onClick}
      bgColor={useColorModeValue('white', 'gray.900')}
      borderColor={useColorModeValue('gray.200', 'whiteAlpha.100')}
      borderWidth={0.5}
      borderStyle='solid'
      borderRadius='md'
      p={{ base: '2', md: '4' }}
    >
      <Box as='header'>
        <Heading as='h3' size='md' display='inline'>{question.text}</Heading>
        { question.author !== undefined &&
          <HStack
            ml='2'
            display='inline'
            as={RouterLink}
            to={`/user/${question.author?.login}`}
          >
            <span>by</span>
            <Avatar size='xs' name={question.author.name} />
            <span>{question.author?.login}</span>
          </HStack>
        }
      </Box>
      <HStack alignItems='center' my='4'>
        <Avatar
          as={RouterLink}
          size='md'
          name={question.owner?.name}
          to={`/user/${question.owner?.login ?? ''}`}
        />
        <Box>
          <Text as={RouterLink} fontWeight='bold' to={`/user/${question.owner?.login ?? ''}`}>
            {question.owner?.name}
          </Text>
          <Text fontSize='sm' color='gray'>{new Date(question.updatedAt).toLocaleString()}</Text>
        </Box>
      </HStack>
      <Text>{question.answer}</Text>
      <Divider my='2'></Divider>
      <HStack>
        <Button rightIcon={isLiked ? <LikeActiveIcon /> : <LikeIcon />} onClick={() => onLike(isLiked)}>
          {question.likes.length}
        </Button>
      </HStack>
    </Box>
  );
};

export default Answer;
