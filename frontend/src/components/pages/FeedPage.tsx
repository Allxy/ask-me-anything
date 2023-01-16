import { Box, Container, Heading } from '@chakra-ui/react';
import AnswersContainer from '../containers/AnswersContainer';

const FeedPage: React.FC = (props) => {
  return (
    <Container maxW='container.md'>
      <Box as='section'>
        <Heading as='h1' size='xl' ml='4' mb='2'>Feed</Heading>
        <AnswersContainer showOwner/>
      </Box>
    </Container>
  );
};

export default FeedPage;
