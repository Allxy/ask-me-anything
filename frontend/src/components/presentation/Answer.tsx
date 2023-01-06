import { Avatar, Box, Heading, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IQuestion } from '../../models/Question';

interface QuestionProps {
  question: IQuestion
  onClick?: MouseEventHandler
}

const Answer: React.FC<QuestionProps> = ({ question, onClick }) => {
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
      {question.updatedAt !== undefined &&
        <Text fontSize='xs' color='gray'>
          {new Date(question.updatedAt).toLocaleString()}
        </Text>}
      {question.answer !== undefined && <div>{question.answer}</div>}
    </Box>
  );
};

export default Answer;
