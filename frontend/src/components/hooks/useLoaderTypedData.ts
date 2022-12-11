import { useLoaderData } from 'react-router-dom';

export function useLoaderTypedData<T> (): { [P in string]: T } {
  const data = useLoaderData() as { [P in string]: T };
  return data;
}
