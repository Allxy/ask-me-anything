import { useLoaderData } from 'react-router-dom';
import { Question } from '../../models/Question';
import User from '../../models/User';

export function useLoaderUserData (): { userPromise: Promise<User | null> } {
  const data = useLoaderData() as { userPromise: Promise<User | null> };
  return data;
}

export function useLoaderQuestionsData (): { questionsPromise: Promise<Question[]> } {
  const data = useLoaderData() as { questionsPromise: Promise<Question[]> };
  return data;
}
